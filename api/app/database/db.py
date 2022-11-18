import sqlite3
import json
import hashlib

database = 'bidbot.db'

def getDBConnection():
    return sqlite3.connect(database)

def closeDBConnection(conn):
    conn.commit()
    conn.close()

def add_bids(bids):
    #print(json(bids),"add_bids")
    conn = getDBConnection()
    c = conn.cursor()
    for bid in bids:  
         bid.id = hashlib.md5((bid.link).encode('utf-8')).hexdigest()  # UNIQUE ID
         #print(b.agency,b.title,b.link)
         c.execute("INSERT OR IGNORE INTO bids VALUES (?,?)",[bid.id,json.dumps(bid.__dict__ )]) # ONLY NEW BIDS NOT REPETED
    closeDBConnection(conn)   

def get_all_bids():
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("SELECT json_extract(data,'$') from bids")
    bids = c.fetchall()

    bidsJSONS = []
    for bid in bids:
        bidsJSONS.append(json.loads(bid[0]))
    
    c.execute("SELECT json_extract(data,'$') from settings where rowid=1")
    setting = c.fetchall()
    if (len(setting)):
        setting = json.loads(setting[0][0])
    closeDBConnection(conn)  

    ### Checks if the keyword filter is used in the configuration and applies them, returning filtered bids ################
    if( setting and setting['ApplyKeywordsFilters']):
        keywords = [k.strip().lower() for k in setting['keywords'].split(",")]
        filterByKeywordsResult = []
        for k in keywords:
            if len(k):
                filterByKeywordsResult =  [*filterByKeywordsResult,*list(filter(lambda x: ((x['title'].lower()).find(k) != -1), bidsJSONS))]
        return filterByKeywordsResult # there are duplicate offers here, worked with these in the ui to remove the repeat ones
    ###############################################################
    else:
        return bidsJSONS

def get_all_deleted_bids():
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("SELECT json_extract(data,'$') from deleted_bids")
    bids = c.fetchall()
    closeDBConnection(conn)  
    bidsJSONS = []
    for bid in bids:
        bidsJSONS.append(json.loads(bid[0]))
    return bidsJSONS     

def set_favourite_bid(id):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("UPDATE bids SET data= json_set(data,'$.isFavourite',1) where id= (?)",[id])
    #bids = c.fetchall()
    closeDBConnection(conn)    
    return    

def set_unfavourite_bid(id):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("UPDATE bids SET data= json_set(data,'$.isFavourite',0) where id= (?)",[id])
    #bids = c.fetchall()
    closeDBConnection(conn)    
    return         

def set_active_bidLink(id):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("UPDATE bids SET data= json_set(data,'$.isActive',0) where id= (?)",[id])
    #bids = c.fetchall()
    closeDBConnection(conn)    
    return    

def set_deactivate_bidLink(id):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("UPDATE bids SET data= json_set(data,'$.isActive',1) where id= (?)",[id])
    #bids = c.fetchall()
    closeDBConnection(conn)    
    return     

def deleted_bid(id):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("SELECT id,json_extract(data,'$') from bids WHERE id = (?)",[id])
    bid = c.fetchall()
    c.execute("INSERT INTO deleted_bids VALUES (?,?)",[bid[0][0],bid[0][1]])
    c.execute("DELETE FROM bids WHERE id=(?)",[id])
    closeDBConnection(conn)    
    return

def restore_deleted_bid(id):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("SELECT id,json_extract(data,'$') from deleted_bids WHERE id = (?)",[id])
    bid = c.fetchall()
    c.execute("INSERT INTO bids VALUES (?,?)",[bid[0][0],bid[0][1]])
    c.execute("DELETE FROM deleted_bids WHERE id=(?)",[id])
    closeDBConnection(conn)    
    return  

def full_deleted_bid(id):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("DELETE FROM deleted_bids WHERE id=(?)",[id])
    closeDBConnection(conn)    
    return

def save_bidbot_settings(data_json_str):
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("SELECT * from settings")
    setting = c.fetchall()
    if(len(setting)):
        c.execute("UPDATE settings SET data = (?) where rowid=1 ",[data_json_str])
    else:
        c.execute("INSERT INTO settings VALUES (?)",[data_json_str])
    closeDBConnection(conn)    
    return 

def get_settings():
    conn = getDBConnection()
    c = conn.cursor()
    c.execute("SELECT json_extract(data,'$') from settings where rowid=1")
    setting = c.fetchall()
    closeDBConnection(conn)  
    if (len(setting)):
        setting = json.loads(setting[0][0])
        return setting
    else:
        return 

    
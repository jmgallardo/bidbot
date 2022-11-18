import sqlite3
from app.database import db

def createDBTables():
     createBidsTable()

# Bids Table Creation
def createBDTables():
    try:   
        conn = db.getDBConnection()
        c = conn.cursor()
        c.execute("""CREATE TABLE bids (
                id VARCHAR(50) PRIMARY KEY,
                data json
        )""")        
        c.execute("""CREATE TABLE deleted_bids (
                id VARCHAR(50) PRIMARY KEY,
                data json
        )""")
        c.execute("""CREATE TABLE settings (
                data json
        )""")
        print("DB Initialization => Bids database tables created") 
        db.closeDBConnection(conn)   
    except:
            print("DB Initialization => A database tables were previously created") 

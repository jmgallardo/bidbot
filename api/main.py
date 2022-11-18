from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import db
from app.database import initializeDB
from  app.scrappers.AECID2Scraper import AECID2Scraper
from  app.scrappers.AECIDScraper import AECIDScraper
from  app.scrappers.AFDBScraper import AFDBScraper
from  app.scrappers.CemefiScraper import CemefiScraper
from  app.scrappers.DataOrgScraper import DataOrgScraper
from  app.scrappers.DFIDScraper import DFIDScraper
from  app.scrappers.FordFoundationScraper import FordFoundationScraper
from  app.scrappers.GPEScraper import GPEScraper
from  app.scrappers.IADBScraper import IADBScraper
from  app.scrappers.IDRCScraper import IDRCScraper
from  app.scrappers.MvGovernScraper import MvGovernScraper
from  app.scrappers.OpenSocietyScraper import OpenSocietyScraper
from  app.scrappers.OxFamScraper import OxFamScraper
from  app.scrappers.UKRIScraper import UKRIScraper
from  app.scrappers.UNDPScraper import UNDPScraper
from  app.scrappers.VWFoundationScraper import VWFoundationScraper
#############################################################################
#Create db tables,if not exists.
initializeDB.createBDTables()

# Initialize API
app = FastAPI()

# Front-end App url
origins = [
    "http://127.0.0.1:3000","http://localhost:3000"
]
# To give access to front-end App
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

#Initial API route.
@app.get("/")
def hello():
  return {'Welcome to DPA bidbot API, Yeahhhh!!!'}

@app.get("/search-bids")
def searchBids():
  try:
    callToWebScrapingFunctions()
    bids = db.get_all_bids()
    return {"ok":True,"bids":bids}
  except:
    return {'ok':False,'error':"Server error: check internet conection"}  

@app.get("/get-bids")
def getBids():
  bids = db.get_all_bids()
  return {"bids":bids,"fetched":len(bids),"total":len(bids)} 

@app.post("/set-favourite")
def setFavourite(id: str):
  db.set_favourite_bid(id)
  return 

@app.post("/set-unfavourite")
def setUnfavourite(id: str):
  db.set_unfavourite_bid(id)
  return   

@app.post("/set-active-link")
def setActiveLink(id: str):
  db.set_active_bidLink(id)
  return 

@app.post("/set-deactivate-link")
def setDectivateLink(id: str):
  db.set_deactivate_bidLink(id)
  return    

@app.get("/get-deleted-bids")
def getDeletedBids():
  bids = db.get_all_deleted_bids()
  return {"bids":bids,"fetched":len(bids),"total":len(bids)}   

@app.post("/delete-bid")
def deleteBid(id: str):
  db.deleted_bid(id)
  return

@app.post("/restore-delete-bid")
def restoreDeleteBid(id: str):
  db.restore_deleted_bid(id)
  return

@app.post("/full-delete-bid")
def fullDeletedBid(id: str):
  db.full_deleted_bid(id)
  return  

@app.post("/save-settings")
def saveSettings(data_json_str: str):
  db.save_bidbot_settings(data_json_str)
  return    

@app.get("/get-settings")
def getSettings():
  settings = db.get_settings()
  return {"setting":settings,"fetched":1,"total":1} 
   
def callToWebScrapingFunctions():
  bidSites = ['AECID2Scraper','AECIDScraper','AFDBScraper','CemefiScraper','DataOrgScraper','DFIDScraper',
  'FordFoundationScraper','GPEScraper','IADBScraper','IDRCScraper','MvGovernScraper','OpenSocietyScraper',
              'OxFamScraper','UKRIScraper','UNDPScraper','VWFoundationScraper']
  bids = []             
  for site in bidSites:
    scraper = globals()[site]()
    scraper.scrape()
    bids = [*bids,*scraper.getBids()]
  if len(scraper.bids):
    db.add_bids(bids)  




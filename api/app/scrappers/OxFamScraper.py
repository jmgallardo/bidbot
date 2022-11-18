from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class OxFamScraper(BidSite):

   agency = "OxFam" 

   baseURL = "https://www.oxfam.org.uk"
    
   def getSiteURL(self):
       return self.baseURL + "/about-us/plans-reports-and-policies/supplier-enquiries/" 
    
   def scrape(self):
       print("scraping: " + self.site_url)
       r = requests.get(self.site_url)
       soup = BeautifulSoup(r.content, 'html.parser')
       for a in soup.select('.sf-document-download', href=True): 
           if a.text: 
               self.bids.append(Bid(self.agency,a.text.split("pdf")[0].strip(), self.baseURL + a['href']))  
        
       return self

from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class DFIDScraper(BidSite):
   
   agency = 'DFID' 

   baseURL = "https://www.gov.uk"
    
   def getSiteURL(self):
       return self.baseURL + "/international-development-funding" 
    
   def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.gem-c-document-list__item-title.govuk-link', href=True): 
            if a.text: 
                self.bids.append(Bid(self.agency,a.text,self.baseURL + a['href']))  
        
        return self

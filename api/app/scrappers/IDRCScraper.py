from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class IDRCScraper(BidSite):

    agency = "IDRC"

    baseURL = "https://www.idrc.ca"
    
    def getSiteURL(self):
        return self.baseURL + "/en/funding" 
    
    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.field-content > a', href=True): 
            if a.text: 
                self.bids.append(Bid(self.agency,a.text, self.baseURL + a['href']))  
        return self  
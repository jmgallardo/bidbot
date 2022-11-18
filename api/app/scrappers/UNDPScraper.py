from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class UNDPScraper(BidSite):

    agency ="UNDPS"
    baseURL = "https://procurement-notices.undp.org/"
    
    def getSiteURL(self):
        return self.baseURL  
    
    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.content table tr td a', href=True):
            self.bids.append(Bid(self.agency,a.text,self.baseURL + a['href']))  
        return self   
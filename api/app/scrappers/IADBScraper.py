from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class IADBScraper(BidSite):

    agency = "IADB"

    def getSiteURL(self):
        return "https://www.iadb.org/en/calls-for-proposals" 
    
    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        print(soup)
        for a in soup.select('.component-title > a', href=True): 
            if a.text: 
                self.bids.append(Bid(self.agency,a.text, a['href']))  
        return self  
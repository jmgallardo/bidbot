from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class OpenSocietyScraper(BidSite):

    agency = "Open Society"

    def getSiteURL(self):
        return "https://www.opensocietyfoundations.org/grants" 
    
    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.m-cardsList__item a', href=True):
            self.bids.append(Bid(self.agency,a.text.strip().split("\n")[0], a['href']))  
        
        return self  
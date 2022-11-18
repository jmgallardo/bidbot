from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class AFDBScraper(BidSite):

    baseURL = "https://www.afdb.org"
    agency = "AFDB"
    
    def getSiteURL(self):
        return self.baseURL + "/en/about-us/corporate-procurement/procurement-notices/current-solicitations"

    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.views-field.views-field-title a', href=True):
            self.bids.append(Bid(self.agency,a.getText(), self.baseURL + a['href']))
        return self
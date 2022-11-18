from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class CemefiScraper(BidSite):

    agency = "Cemefi"

    baseURL = "https://www.cemefi.org"

    def getSiteURL(self):
        return self.baseURL + "/apoyo-economico-3"

    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a, strong in zip(soup.select('.entry-content > p > a', href=True), soup.select('.entry-content > p > strong', href=True)):
            self.bids.append(Bid(self.agency,strong.getText(),a['href']))
        return self    
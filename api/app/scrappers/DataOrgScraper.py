from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class DataOrgScraper(BidSite):

    agency = "DataOrg"


    def getSiteURL(self):
        return "https://data.org/opportunities/"

    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.c-opportunity-archive__available-opportunities-container .g-3-up article h3 a', href=True):
            self.bids.append(Bid(self.agency,a.getText(), a['href']))
        return self 
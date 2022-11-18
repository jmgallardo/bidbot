from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class GPEScraper(BidSite):

    agency = "GPE"

    def getSiteURL(self):
        return "https://www.globalpartnership.org/funding/applying-for-grants"

    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('section div div.field--name-field-body-page > h3'):
            self.bids.append(Bid(self.agency,a.getText(), self.getSiteURL()))
        return self  
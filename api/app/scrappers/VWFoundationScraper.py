from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests


class VWFoundationScraper(BidSite):

    agency ="VWFoundation"
    baseURL = "https://www.volkswagenstiftung.de"

    # overriding abstract method
    def getSiteURL(self):
        return self.baseURL + "/en/funding/our-funding-portfolio-at-a-glance"

    # overriding abstract method
    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.block-title > h3 > a', href=True):
            if a.text:
                self.bids.append(Bid(self.agency,a.text, self.baseURL + a['href']))

        return self

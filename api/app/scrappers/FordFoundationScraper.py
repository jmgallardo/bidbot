from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class FordFoundationScraper(BidSite):

    agency = 'Ford Foundation'

    baseURL = "https://www.fordfoundation.org"
    
    def getSiteURL(self):
        return self.baseURL + "/work/our-grants/grant-opportunities/"

    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for container in soup.select('.container-fluid', href=True):
            div = container.find("div", {"class": "rte col-sm-7 col-md-offset-1"})
            if div:
                a = div.find("p", {"class": "blue-button"}).find("a")
                self.bids.append(Bid(self.agency,a["title"], self.baseURL + a["href"]))
        return self  
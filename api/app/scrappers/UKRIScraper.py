from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class UKRIScraper(BidSite):

    agency = " UKRI" 
    baseURL = "https://www.ukri.org"

    def getSiteURL(self):
        return self.baseURL + "/opportunity/"

    def scrape(self):
        return self._scrape(self.getSiteURL(), 4)

    def _scrape(self, url, stopLimit):
        if stopLimit == 0:
            return self

        print("scraping: " + url)
        r = requests.get(url)
        soup = BeautifulSoup(r.content, 'html.parser')
        nextButtonLink = soup.find("a", {"class": "next page-numbers"})['href']

        for a in soup.select('a.ukri-funding-opp__link', href=True):
            self.bids.append(Bid(self.agency,a.getText(), a['href']))

        if nextButtonLink:
            return self._scrape(nextButtonLink, stopLimit - 1)

        return self   
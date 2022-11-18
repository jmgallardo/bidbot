from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class MvGovernScraper(BidSite):

    agency = "MvGovern"

    def getSiteURL(self):
        return "https://www.mcgovern.org/grants/"

    def scrape(self):
        return self._scrape(self.getSiteURL(), 2)

    def _scrape(self, url, stopLimit):
        if stopLimit == 0:
            return self
        
        print("scraping: " + url)
        r = requests.get(url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.grants.container article'):
            text = a.find("h2", {"class": "grantee-name"}).getText()
            try:
                link = a.find("a", {"class": "grantee-website"})['href']
                self.bids.append(Bid(self.agency,text, link))
            except:
                self.bids.append(Bid(self.agency,text, "Not available"))

        nextButtonLink = soup.find("a", {"class": "next page-numbers"})['href']
        if nextButtonLink:
            return self._scrape(nextButtonLink, stopLimit - 1)

        return self     
from app.BidSite import BidSite
from app.Bid import Bid
from bs4 import BeautifulSoup
import requests

class AECIDScraper(BidSite):

    agency = "AECID"

    def getSiteURL(self):
        return "https://www.aecid.es/ES/la-aecid/anuncios/licitaciones"

    def scrape(self):
        print("scraping: " + self.site_url)
        r = requests.get(self.site_url)
        soup = BeautifulSoup(r.content, 'html.parser')
        for a in soup.select('.listadoanuncios li'):
            date = a.find("p", {"class": "fechaPublicacionAnuncios"}).getText()
            text = a.find("p", {"class": "tituloAnuncios"}).getText()
            link = a.find("a", {"class": "vertodas"})["href"]
            self.bids.append(Bid(self.agency, date + " - " + text, link))
        return self
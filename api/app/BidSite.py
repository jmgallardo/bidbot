from abc import ABC, abstractmethod
import csv

class BidSite(ABC):

        def __init__(self):
            self.site_url = self.getSiteURL()
            self.bids = []
        
        @abstractmethod
        def getSiteURL(self):
            pass
        
        @abstractmethod
        def scrape(self):
            pass
        
        def getBids(self):
            return self.bids

        def exportToCSV(self, filePath):
            fieldnames = ['title', 'link']
            with open(filePath, 'w', newline='') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                for bid in self.bids:
                    writer.writerow({'title': bid.getTitle(), 'link': bid.getLink()})
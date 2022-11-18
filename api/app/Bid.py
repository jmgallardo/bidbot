
class Bid:

    def __init__(self, agency, title, link):
        self.agency = agency
        self.title = title
        self.link = link
        self.isActive = 1
        self.isFavourite = 0

    def getTitle(self):
        return self.title

    def getLink(self):
        return self.link

    def __str__(self):
        return self.title + ": " + self.link

    def __eq__(self, other):
        if isinstance(other, Bid):
            return self.title == other.title
        return False   
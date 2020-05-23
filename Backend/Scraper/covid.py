from pymongo import MongoClient
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq

client = MongoClient("mongodb://localhost:27017")
db = client['NewsCluster']
db.covid.drop()
url = "https://www.mohfw.gov.in"

def getParser(url):
    try:
        uClient = uReq(url)
    except:
        return None
    page = uClient.read()
    uClient.close()
    return soup(page, "html.parser")

def scrape(url):
    page = getParser(url)

    table = page.select("div.row div.col-xs-12 div.data-table.table-responsive table.table.table-striped tbody tr")
    for row in table:
        elements = row.select("td")
        state = elements[1].text
        confirmed = elements[2].text
        cured = elements[3].text
        deaths = elements[4].text

        row ={
            "state": state,
            "confirmed": confirmed,
            "cured": cured,
            "deaths": deaths
        }
        db.covid.insert_one(row)
        if state == 'Total#':
            break

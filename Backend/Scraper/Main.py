from IndiaToday import *
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['NewsCluster']
db.news.drop()

categories = ['home', 'sports', 'technology','lifestyle', 'education-today', 'business', 'science', 'world']
categories1 = ['sports', 'technology', 'lifestyle', 'education-today']
categories2 = ['business', 'science', 'world']
url = "https://www.indiatoday.in"

india = IndiaToday(db)
india.scrape()
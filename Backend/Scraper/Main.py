import IndiaToday
import IndiaTV
import IndianExpress
import covid
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['NewsCluster']
db.news.drop()
db.covid.drop()

IndiaToday.scrape()
IndianExpress.scrape()
IndiaTV.scrape()
covid.scrape()

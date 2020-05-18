from pymongo import MongoClient
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
# from Database.mongo import MongoRepository

client = MongoClient("mongodb://localhost:27017")
db = client['NewsCluster']
db.news.drop()
categories = ['home', 'sports', 'technology','lifestyle', 'education-today', 'business', 'science', 'world']
categories1 = ['sports', 'technology', 'lifestyle', 'education-today']
categories2 = ['business', 'science', 'world']
url = "https://www.indiatoday.in"

def getParser(url):
    try:
        uClient = uReq(url)
    except:
        return None
    page = uClient.read()
    uClient.close()
    return soup(page, "html.parser")

def insertDetails(url, category):       
    news = getParser(url) 
    if news == None:
        return

    try:
        title = news.select("h1")[0].text
        summary = news.select(".story-kicker h2")[0].text
        image = news.select(".stryimg img")[0]['src']
        descriptions = news.select(".description p")
    except:
        return

    description = ""
    for para in descriptions:
        description += para.text
    
    row = {
        "src" : "IndiaToday",
        "category" : category,
        "title" : title,
        "summary" : summary,
        "image" : image,
        "description" : description
    }
    db.news.insert_one(row)

def scrape(url, categories):
    for category in categories:
        print(category)
        try:
            if category == "home":
                news = getParser(url)
                stories = news.select(".top_stories_ordering")[0].select("ul li")

            elif category in categories1:
                news = getParser(url + '/' + category)
                stories = news.select(".special-top-news")[0].select("ul li")
            
            elif category in categories2:
                news = getParser(url + '/' + category)
                stories = news.select(".catagory-listing")
        except:
            continue

        for story in stories:
                link = url + story.select("a")[0]['href']
                insertDetails(link, category)

            




scrape(url, categories)

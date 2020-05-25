from pymongo import MongoClient
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
# from Database.mongo import MongoRepository

client = MongoClient("mongodb://localhost:27017")
db = client['NewsCluster']
db.news.drop()


routes = {
            'home' : '/home', 
            'trending' : '/trending-news',
            'corona' : '/coronavirus-covid-19-outbreak', 
            'sports' : '/sports',
            'cricket' : '/cricket',
            'football' : '/football', 
            'auto' : '/auto',
            'india' : '/india',
            'technology' : '/technology', 
            'lifestyle' : '/lifestyle', 
            'education' : '/education-today', 
            'business' : '/business',
            'science' : '/science',
            'world' : '/world',
            'health' : '/helath', 
            'crime' : '/crime'
        }

categories = ['home', 'trending', 'corona', 'sports', 'auto', 'cricket', 'football', 'auto', 'india', 'technology','lifestyle', 'education', 'business', 'science', 'world', 'health', 'crime']

categories1 = ['sports', 'technology', 'lifestyle', 'education']
categories2 = ['business', 'science', 'world', 'corona', 'trending', 'cricket', 'football', 'india', 'health', 'crime']
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
        image = news.select(".stryimg img")[0]['data-src']
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

def scrape():
    for category in categories:
        try:
            if category == "home":
                news = getParser(url)
                stories = news.select(".top_stories_ordering ul li")

            elif category in categories1:
                news = getParser(url + routes[category])
                stories = news.select(".special-top-news ul li")
            
            elif category in categories2:
                news = getParser(url + routes[category])
                stories = news.select(".catagory-listing")
        except:
            continue
        print(category, len(stories))
        for story in stories:
                link = url + story.select("a")[0]['href']
                insertDetails(link, category)

scrape()

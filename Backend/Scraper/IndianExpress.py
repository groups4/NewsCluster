from pymongo import MongoClient
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
# from Database.mongo import MongoRepository

client = MongoClient("mongodb://localhost:27017")
db = client['NewsCluster']

routes = {
            'home' : '/home', 
            'trending' : '/section/trending',
            'corona' : '/section/coronavirus', 
            'sports' : '/section/sports',
            'cricket' : '/section/cricket',
            'football' : '/section/football', 
            'auto' : '/section/auto',
            'india' : '/section/india',
            'technology' : '/section/technology', 
            'lifestyle' : '/section/lifestyle', 
            'education' : '/section/education', 
            'business' : '/section/business',
            'science' : '/section/science',
            'world' : '/section/world',
            'health' : '/section/helath', 
            'crime' : '/section/crime'
        }

categories = ['home', 'trending', 'corona', 'sports', 'cricket', 'football', 'india', 'technology','lifestyle', 'education', 'business', 'science', 'world', 'health', 'crime']

categories2 = ['trending', 'technology']
categories1 = ['business', 'sports', 'corona', 'science', 'world', 'india', 'lifestyle', 'education', 'cricket', 'football', 'health', 'crime']
url = "https://indianexpress.com/"

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
        title = news.select(".native_story_title")[0].text
        summary = news.select(".synopsis")[0].text
        image = news.select(".size-full")[0]['data-lazy-src']
        descriptions = news.select(".articles p")   
    
    except:
        return

    description = ""
    for para in descriptions:
        description += "\n\t" + para.text

    row = {
        "src" : "IndianExpress",
        "category" : category,
        "title" : title,
        "summary" : summary,
        "image" : image,
        "description" : description
    }
 
    db.news.insert_one(row)

def scrape():
    for category in categories:
        stories = []
         
        try:
            if category == "home":
                news = getParser(url)
                stories = news.select(".top-news li")

            elif category in categories1:
                print(category)
                news = getParser(url + routes[category])
                stories = news.select(".articles")
            
            elif category in categories2:
                news = getParser(url + routes[category])
                stories = news.select(".article-list li")
        except:
            continue
        print(category, len(stories))
        for story in stories:
                link = story.select("a")[0]['href']
                insertDetails(link, category)

            

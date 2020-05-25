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
            'cricket' : '/cricketnext',
            'football' : '/football', 
            'auto' : '/auto',
            'india' : '/india',
            'technology' : '/technology', 
            'lifestyle' : '/lifestyle', 
            'education' : '/education', 
            'business' : '/business',
            'science' : '/science',
            'world' : '/world',
            'health' : '/helath', 
            'crime' : '/crime'
        }

categories = ['home', 'corona', 'sports', 'auto', 'cricket', 'football', 'india', 'lifestyle', 'education', 'business', 'politics', 'world']

url = "https://www.news18.com"

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
        title = news.select(".article-box h1")[0].text
        summary = news.select(".article-box h2")[0].text
        image = news.select(".article-bimg img")[0]['src']
        descriptions = news.select(".article-content-box p")
    except:
        return

    description = ""
    for para in descriptions:
        description += "\n\t" + para.text
    
    row = {
        "src" : "News18",
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
                stories = news.select(".lead-mstory li")
            
            elif category == "cricket":
                news = getParser(url + routes[category])
                stories = news.select(".newslist li")

            else:
                news = getParser(url + routes[category])
                stories = news.select(".section-blog-left-img-list li")
                stories = stories + news.select(".blog-list-blog")

        except:
            continue

        # print(category, len(stories))
        for story in stories:
                link = story.select("a")[0]['href']
                insertDetails(link, category)


        
scrape()
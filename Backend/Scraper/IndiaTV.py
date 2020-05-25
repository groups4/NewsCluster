from pymongo import MongoClient
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq

client = MongoClient("mongodb://localhost:27017")
db = client['NewsCluster']
db.news.drop()
categories = ['home','india', 'business', 'entertainment', 'sports', 'health', 'technology', 'world', 'lifestyle', 'trending', 'auto', 'science', 'education', 'crime', 'cricket', 'football', 'tennis']
categories1 = ['india', 'business', 'technology', 'world', 'science', 'education', 'crime']
categories2 = ['entertainment', 'health', 'lifestyle', 'trending', 'auto', 'cricket', 'football', 'tennis']
url = "https://www.indiatvnews.com"
totaldone = 0


def getParser(url):
    try:
        uClient = uReq(url)
    except:
        return None
    page = uClient.read()
    uClient.close()
    return soup(page, "html.parser")


def insertDetails(url, category):
    print(url)
    news = getParser(url)
    global totaldone
    if news == None:
        return
    subcategory = ' '
    try:
        if category == 'home':
            listi = str(url).split('/')
            if listi[3] != 'news' or listi[3]:
                category = 'top stories'
                subcategory = listi[3]
            else:
                category = 'top stories'
                subcategory = listi[4]
        title = news.select("h1.arttitle")[0].text
        summary = news.select("h2.artdec")[0].text
        image = news.select("figure.artbigimg img")[0]['src']
        descriptions = news.select("div.content p")
    except:
        return

    totaldone += 1
    description = ""
    for para in descriptions:
        description += "\n\t" + para.text

    row = {
        "src": "IndiaTV",
        "category": category,
        "subcategory": subcategory,
        "title": title,
        "summary": summary,
        "image": image,
        "description": description
    }
    db.news.insert_one(row)


def scrape():
 
    for category in categories:
        stories = []
        try:
            if category == "home":
                news = getParser(url)
                stories = news.select("div.row.latest_news ul.h_story.normal")[0].select("li")
            elif category in categories1:
                news = getParser(url + '/' + category)
                stories = news.select("div.big-news-list ul")[0].select("li")
            elif category in categories2:
                if category == 'cricket' or category == 'football' or category == 'tennis':
                    news = getParser(url + '//' + 'sports' + '/' + category)
                else:
                    news = getParser(url + '/' + category)
                stories = news.select("div.row.lhsBox.s_two_column.pt20 ul.list li")
            elif category == "sports":
                news = getParser(url + '/' + category)
                stories = news.select("ul.newsListfull li.p_news")
        except:
            continue
        print(category, len(stories))
        for story in stories:
            link = story.select("a")[0]['href']
            insertDetails(link, category)


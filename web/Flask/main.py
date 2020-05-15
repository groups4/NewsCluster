from flask import Flask, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['MONGO_URI'] = "mongodb://localhost:27017/NewsCluster"
mongo = PyMongo(app)

@app.route('/news')
def news():
    category = request.args.get('category')
    if category == None:
        articles = mongo.db.news.find({"category" : "home"}, {"category" : 1, "title" : 1, "summary" : 1})
    else:    
        articles = mongo.db.news.find({"category" : category}, {"category" : 1, "title" : 1, "summary" : 1})
    
    articles = dumps(articles)
    return articles

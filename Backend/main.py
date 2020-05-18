from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['MONGO_URI'] = "mongodb://localhost:27017/NewsCluster"
mongo = PyMongo(app)

@app.route('/news/<category>')
def news(category):
    print(category)
    # category = request.params.get('category')
    if category == "1":
        articles = mongo.db.news.find({"category" : "india"}, {"src": 1, "subcategory" : 1, "title" : 1, "summary" : 1, "image":1})
    else:    
        articles = mongo.db.news.find({"category" : category}, {"src": 1,"category" : 1, "title" : 1, "summary" : 1})
    
    articles = dumps(articles)
    return articles

@app.route('/singleNews/<id>')
def singleNews(id):
    print(id)
    article = mongo.db.news.find_one({"_id": ObjectId(id)})
    article = dumps(article)
    return article

@app.route('/user/register', methods = ["POST"])
def register():
    return "hello"

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from bson.json_util import dumps
from bson.objectid import ObjectId
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['DEBUG'] = True
app.config['MONGO_URI'] = "mongodb://localhost:27017/NewsCluster"
mongo = PyMongo(app)

@app.route('/news/<category>')
@cross_origin()
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
@cross_origin()
def singleNews(id):
    print(id)
    article = mongo.db.news.find_one({"_id": ObjectId(id)})
    article = dumps(article)
    return article

@app.route('/websites', methods = ["POST", "GET"])
@cross_origin()
def register():
    if request.method == "POST":
        data = request.form
        ans = data.get('list')
        ans = ans.split(',')
        print(type(ans))
        mongo.db.user.drop()
        mongo.db.user.insert_one({
            "websites": ans
        })
        return "Done"
    else:
        websites = mongo.db.user.find()
        websites = dumps(websites)
        return websites

if __name__ == "__main__":
    app.run(debug=True)

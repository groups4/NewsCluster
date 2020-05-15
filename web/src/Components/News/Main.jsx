import React, {useState, useEffect} from "react";
import Article from "./Article";
import Article2 from "./Article2";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import "./main.scss";
import { Toolbar } from "@material-ui/core";

export default function Main() {
    const [articles, setArticles] = useState([{
                category: "TopStories",
                title: "Hello World",
                summary:
                     "Heavy snowstorm in Turkey creates havoc as hundreds of villages left without power, and hundreds of roads closed"
            }])

    useEffect(()=>{
        fetch('/news?category=home')
        .then(res => res.json())
        .then(data => {
            console.log("Hello World")
            setArticles(data)
            console.log(data)
        })
    }, [])
    
    return (
        <div>
            {/* <div style={{ height: "1200px" }}></div> */}
            <h1 className="main-title" id="sports">
                Sports
            </h1>
            <Divider />
            <div style={{ height: "20px" }}></div>
            <div className="container">
                {articles.map(article => (
                    <div className="column">
                        <Article2 details={article} />
                    </div>
                ))}
            </div>
        </div>
    );
}

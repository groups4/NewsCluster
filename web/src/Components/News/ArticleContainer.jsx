import React, { useState, useEffect } from "react";
// import Article from "./Article";
import Article2 from "./Article2";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import _ from "lodash";
import "./main.scss";

export default function ArticleContainer(props) {
    const [articles, setArticles] = useState([]);
    const [websites, setWebsites] = useState([]);

    function cropList() {
        // console.log(websites);
        // console.log(websites);
        var newArticles = articles.filter(article => {
            if (websites.indexOf(article.src) != -1) {
                return true;
            }
            return false;
        });
        // console.log(newArticles);
        return newArticles;
    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/news/" + props.title)
            .then(res => {
                // console.log(res.data);
                setArticles(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get("http://localhost:5000/websites")
            .then(res => {
                setWebsites(res.data[0].websites);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

    // if (articles.length === 0) {
    //     return <h1>Loading</h1>;
    // }
    if (articles.length === 0) {
        return <span> </span>;
    }

    return (
        <div>
            {/* {cropList()} */}
            {/* <div style={{ height: "1200px" }}></div> */}
            <h1
                className="main-title"
                id={props.title}
                // style={{ marginBottom: "20px" }}
            >
                {props.title}
            </h1>
            <Divider />
            <div style={{ height: "20px" }}></div>
            <div className="container">
                {/* {articles.map(article => (
                    <div className="column">
                        <Article2 details={article} />
                    </div>
                ))} */}

                {cropList().length != 0 &&
                    _.times(5, i => (
                        <div key={i} className="column">
                            <Article2 key={i} details={cropList()[i]} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react";
// import Article from "./Article";
import Article2 from "./Article2";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import _ from "lodash";
import "./main.scss";

export default function ArticleContainer(props) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios
            .get("/news/" + props.title)
            .then(res => {
                // console.log(res.data);
                setArticles(res.data);
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
                {_.times(5, i => (
                    <div key={i} className="column">
                        <Article2 key={i} details={articles[i]} />
                    </div>
                ))}
            </div>
        </div>
    );
}

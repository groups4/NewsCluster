import React, { useState, useEffect } from "react";
import NavBar from "../AppBar/NavBar";
import axios from "axios";
import "./style.scss";
import { Divider } from "@material-ui/core";

export default function Details(props) {
    const [article, setArticle] = useState([]);
    // console.log(props);

    useEffect(() => {
        console.log();
        const id = props.match.params.id;
        axios
            .get("/singleNews/" + id)
            .then(res => {
                // console.log(res.data);
                setArticle(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (article == null || article.length == 0) {
        return <h3>Loading</h3>;
    }

    return (
        <div>
            <article>
                <h2 className="detail-title">{article.title}</h2>
                <div className="img-container">
                    <img src={article.image}></img>
                </div>
                <h4 style={{ marginBottom: "0px" }}>{article.summary}</h4>

                <div className="subcaption">
                    <p>{new Date().toISOString()}</p>
                    {/* <p>IndiaToday</p> */}
                </div>

                <Divider />

                {/* <figure>
                    <img src="http://201-2.medill.northwestern.edu/lab1/wp-content/uploads/sites/2/2018/03/march.jpg"></img>
                    <figcaption>
                        "It was mind-blowing. It just shows there are a lot of
                        women and women's advocates that wanted to make their
                        voices heard," said organizer Liz Radford. "We were so
                        happy to provide a forum where they could come out and
                        do that. ... It was surreal."
                    </figcaption>
                </figure> */}

                <p>{article.description}</p>

                <p>
                    The march was not the biggest protest in the city's history,
                    though: That honor goes to a May 1, 2006, demonstration that
                    saw an estimated 400,000 people march against
                    anti-immigration laws.
                </p>

                <p>
                    Organizer Jaquie Algee said there were no incidents at the
                    march, adding there had been "nothing but love." She hopes
                    the women's marches — which were held on all seven
                    continents in numerous U.S. cities and foreign countries —
                    will cause Trump to have a "serious change of mind" and work
                    to forge a better relationship with women.
                </p>
            </article>
        </div>
    );
}

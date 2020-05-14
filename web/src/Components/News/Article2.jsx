import React from "react";
import Typography from "@material-ui/core/Typography";
import "./news2.scss";

export default function Article2(props) {
    return (
        <article className="article">
            {/* <img src="https://images.unsplash.com/photo-1589395937772-f67057e233c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></img> */}
            <h3
                className="article__category"
                style={{ backgroundColor: "#ee6352" }}
            >
                Hindustan Times
            </h3>
            <h2 className="article__title">{props.details.title}</h2>
            <p className="article__excerpt">{props.details.summary}</p>
            <span className="article__excerpt">Timestamp</span>
        </article>
    );
}

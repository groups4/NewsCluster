import React from "react";
import { Link } from "react-router-dom";
import "./news2.scss";

export default function Article2(props) {
    return (
        <Link
            to={"/details/" + props.details._id.$oid}
            style={{ textDecoration: "none" }}
        >
            <div className="article">
                <h3
                    className="article__category"
                    style={{ backgroundColor: "#ee6352" }}
                >
                    {props.details.src}
                </h3>
                <h2 className="article__title">
                    {props.details.title.substr(0, 50)}
                    {props.details.title.length > 50 ? "..." : ""}
                </h2>
                <p className="article__excerpt">
                    {props.details.summary.substr(0, 200)}
                    {props.details.summary.length > 100 ? "..." : ""}
                </p>
                <span className="article__excerpt">
                    {new Date().toUTCString()}
                </span>
            </div>
        </Link>
    );
}

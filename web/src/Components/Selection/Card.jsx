import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cardStyle.scss";

export default function Article2(props) {
    const [cardClass, setCardClass] = useState("card");

    useEffect(() => {
        if (props.isActive) {
            setCardClass("card cardActive");
        }
    });

    function cardClicked() {
        // console.log("Entered");
        if (cardClass === "card") {
            setCardClass("card cardActive");
        } else {
            setCardClass("card");
        }
    }

    return (
        <div className="cardContainer">
            <div className={cardClass} onClick={cardClicked}>
                <h1 className="title">{props.title}</h1>
            </div>
        </div>
    );
}

import React from "react";
import ArticleContainer from "./ArticleContainer";

export default function SubMain() {
    var categories = [
        "world",
        // "india",
        "sports",
        "business",
        // "entertainment",
        // "health",
        "lifestyle",
        "auto",
        // "crime",
        "science"
    ];

    return (
        <div>
            {categories.map(item => {
                return (
                    <ArticleContainer
                        key={item}
                        title={item}
                    ></ArticleContainer>
                );
            })}
        </div>
    );
}

import Carousel from "react-multi-carousel";
import React from "react";
import Article from "../News/Article";
import _ from "lodash";
import "../News/main.scss";
import "./style.css";
import { isMobileOnly } from "react-device-detect";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        paritialVisibilityGutter: 80
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        paritialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 20
    }
};

const articles = [
    {
        category: "News",
        title: "Snow in Turkey Brings Travel Woes",
        summary:
            "Heavy snowstorm in Turkey creates havoc as hundreds of villages left without power, and hundreds of roads closed"
    }
];

const Simple = props => {
    return (
        <div>
            <Carousel
                autoPlay={true}
                autoPlaySpeed={4000}
                ssr={true}
                infinite={true}
                deviceType={props.deviceType}
                itemClass="image-item"
                swipeable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                responsive={responsive}
                containerClass="carousel-container"
                centerMode={!isMobileOnly}
            >
                {_.times(5, i => (
                    <Article key={i} details={articles[0]} />
                ))}
            </Carousel>
        </div>
    );
};

export default Simple;

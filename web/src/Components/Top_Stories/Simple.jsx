import Carousel from "react-multi-carousel";
import React from "react";
import Article from "./Article";
import { useEffect, useState } from "react";
import _ from "lodash";
import "../News/main.scss";
import "./style.css";
import { isMobileOnly } from "react-device-detect";
import axios from "axios";

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

const Simple = props => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("/news/1")
            .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (!data) {
        return <h1>Loading</h1>;
    }

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
                {_.times(data.length, i => (
                    <Article key={i} details={data[i]} />
                ))}
            </Carousel>
        </div>
    );
};

export default Simple;

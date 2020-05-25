import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Card from "./Card";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import axios from "axios";

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "95%",
        margin: "0 auto"
    }
};

export default function Selection(props) {
    const websites = [
        "IndiaTV",
        "IndiaToday",
        "Times of India",
        "The Hindu",
        "Lokmat",
        "Economic Times"
    ];

    const [list, setList] = useState([]);
    const [isFetched, setFetched] = useState(false);

    useEffect(() => {
        axios
            .get("/websites")
            .then(res => {
                setList(res.data[0].websites);
                setFetched(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const [isSubmitted, setSubmitted] = useState(false);
    const cardSelected = website => {
        // console.log(website);
        // console.log(list.indexOf(website));
        // console.log("object");
        if (list.indexOf(website) != -1) {
            list.splice(list.indexOf(website), 1);
            // console.log("Yes");
        } else {
            var newList = list;
            newList.push(website);
            setList(newList);
            // console.log("No");
        }
    };
    const onSubmit = () => {
        var data = new FormData();
        data.append("list", list);
        axios
            .post("/websites", data)
            .then(res => {
                // console.log(res.data);
                setSubmitted(true);
            })
            .catch(err => {
                console.log(err);
            });
    };
    if (!isFetched) {
        return <span>Loading...</span>;
    }
    if (isSubmitted) {
        return <Redirect to="/"></Redirect>;
    }
    return (
        <div>
            <div style={styles.container}>
                {websites.map(website => {
                    return (
                        <div
                            onClick={() => {
                                cardSelected(website);
                            }}
                            key={website}
                            id={website}
                        >
                            <Card title={website} id={website}></Card>
                        </div>
                    );
                })}
            </div>
            <center>
                <Button
                    variant="contained"
                    className="cardButton"
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </center>
        </div>
    );
}

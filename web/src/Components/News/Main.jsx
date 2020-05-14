import React from "react";
import Article from "./Article";
import Article2 from "./Article2";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import "./main.scss";
import { Toolbar } from "@material-ui/core";

export default function Main() {
    const articles = [
        {
            category: "News",
            title: "Snow in Turkey Brings Travel Woes",
            summary:
                "Heavy snowstorm in Turkey creates havoc as hundreds of villages left without power, and hundreds of roads closed"
        }
    ];
    const articleImage =
        "https://s3.reutersmedia.net/resources/r/?m=02&d=20200512&t=2&i=1518305393&w=1200&r=LYNXMPEG4B0GO";
    const articleTitle =
        "Gunmen Attack Afghan Hospital Where MSF Aid Group Runs A Clinic";
    const articleUrl =
        "http://feeds.reuters.com/~r/reuters/topNews/~3/rpXa-usuNpc/gunmen-attack-afghan-hospital-where-msf-aid-group-runs-a-clinic-idUSKBN22O0RS";
    const articleSummary =
        "Gunmen attacked a hospital in the Afghan capital, Kabul, on Tuesday where the international humanitarian organisation Doctors Without Borders runs a maternity clinic, officials said.";
    const articleDate = "2020-05-12T07:50:49Z";
    const articleSource = "Reuters";
    return (
        <div>
            {/* <div style={{ height: "1200px" }}></div> */}
            <h1 className="main-title" id="sports">
                Sports
            </h1>
            <Divider />
            <div style={{ height: "20px" }}></div>
            <div className="container">
                {_.times(6, key => (
                    <div className="column">
                        <Article2 key={key} index={key} details={articles[0]} />
                    </div>
                ))}
            </div>
        </div>
    );
}

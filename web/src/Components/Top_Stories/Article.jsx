import React from "react";
import { useHistory } from "react-router-dom";
import "./news.scss";
import { Link } from "@material-ui/core";

export default function Article(props) {
    // console.log(props);
    var his = useHistory();
    const goDetail = () => {
        console.log("Entered");
        var path = "/details/" + props.details._id;
        console.log(path);
        // his.go("/details" + props._id);
        his.push("/details/" + props.details._id.$oid);
    };

    return (
        // <Link>
        <div style={{ margin: "10px" }} onClick={goDetail}>
            <figure className="snip1529">
                <img
                    src={props.details ? props.details.image : "hi"}
                    alt="pr-sample13"
                />
                {/* <div class="date"> */}
                {/* <span class="day">
                        {props.details ? props.details.subcategory : ""}
                    </span> */}
                {/* <span class="month">Apr</span> */}
                {/* </div> */}
                <figcaption>
                    <h3>{props.details ? props.details.title : "Title"}</h3>
                    {/* <p>
                        Which is worse, that everyone has his price, or that the
                        price is always so low.
                    </p> */}
                </figcaption>
                <div className="hover">
                    <i className="ion-android-open"></i>
                </div>
                <Link to={"/details" + props._id}></Link>
            </figure>
        </div>
        // </Link>
    );
}

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/AppBar/NavBar";
import Main from "./Components/News/Main";
import Details from "./Components/Details";

function App(props) {
    const [detail, setDetail] = useState(false);

    function toggleBack() {
        setDetail(!detail);
    }

    return (
        <div>
            <Router>
                <NavBar>
                    <Route exact path="/" component={Main} />
                    <Route path="/details/:id" component={Details} />
                </NavBar>
            </Router>
        </div>
    );
}

export default App;

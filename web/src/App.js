import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/AppBar/NavBar";
import Main from "./Components/News/Main";
import Details from "./Components/Details";
import Selection from "./Components/Selection";
import RenderMain from "./Components/renderMain";
import { func } from "prop-types";

function NewMain() {
    return (
        <NavBar>
            <Main />
        </NavBar>
    );
}

function DetailWithNavBar(props) {
    // const id = props.par;
    const id = props.match.params.id;
    return (
        <NavBar isBack={true}>
            <Details id={id}></Details>
        </NavBar>
    );
}

function SelectionWithNavBar(props) {
    // const id = props.par;
    // const id = props.match.params.id;
    return (
        <NavBar isBack={true}>
            <Selection></Selection>
        </NavBar>
    );
}

function MainWithNavBar() {
    // const id = props.par;
    // const id = props.match.params.id;
    return (
        <NavBar isBack={false}>
            <Main></Main>
        </NavBar>
    );
}

function App(props) {
    const [detail, setDetail] = useState(false);

    function toggleBack() {
        setDetail(!detail);
    }

    return (
        <div>
            <Router>
                {/* <NavBar> */}
                {/* <NavBar isBack={true}> */}
                <Route exact path="/" component={MainWithNavBar} />
                {/* </NavBar> */}
                {/* <NavBar isBack={false}> */}
                <Route path="/details/:id" component={DetailWithNavBar} />
                <Route path="/select" component={SelectionWithNavBar} />
                {/* </NavBar> */}
                {/* </NavBar> */}
            </Router>
        </div>
    );
}

export default App;

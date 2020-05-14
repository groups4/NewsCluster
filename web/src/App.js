import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/AppBar/NavBar";
import Drawer from "./Components/AppBar/Drawer";
// import NewDrawer from "./Components/AppBar/NewDrawer";
import Main from "./Components/News/Main";
import Corousel from "./Components/Top_Stories";

function App() {
    return (
        <div>
            <NavBar>
                <Corousel />
                <Main />
                {/* <Main /> */}
                {/* <Main /> */}
            </NavBar>
        </div>
    );
}

export default App;

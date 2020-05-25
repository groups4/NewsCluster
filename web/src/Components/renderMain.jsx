import React from "react";
// import logo from "../giphy.gif";
import NavBar from "./AppBar/NavBar";
const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    return (
        <NavBar>
            <Component {...rest} />
        </NavBar>
    );
};
export default ProtectedAdminRoute;

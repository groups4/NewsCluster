import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "./Drawer";
import BackIcon from "@material-ui/icons/ArrowBack";
import { func } from "prop-types";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        // zIndex: theme.zIndex.drawer + 100,
        zIndex: 1400,
        backgroundColor: "#ee6352"
        // color: "#ee6352"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        fontWeight: "800"
    }
}));

export default function ButtonAppBar(props) {
    var his = useHistory();
    var path = his.location.pathname;
    var [state, setState] = useState(false);

    useEffect(() => {
        // var his = useHistory();
        console.log(his);
        path = his.location.pathname;
    });

    // console.log(path);
    // console.log(props);
    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);
    const [detail, setDetail] = useState(false);
    const toggleDrawer = event => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawer(prevState => !prevState);
    };

    const goBack = event => {
        setState(!state);
        his.goBack();
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {!state && (
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer}
                        >
                            {!drawer && <MenuIcon />}
                            {drawer && <CloseIcon />}
                            {/* <MenuIcon /> */}
                        </IconButton>
                    )}
                    {state && (
                        // <Link to="/">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={goBack}
                        >
                            {<BackIcon />}
                        </IconButton>
                        // </Link>
                    )}

                    <Typography variant="h6" className={classes.title}>
                        NewsCluster
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                isOpen={drawer}
                children={props.children}
                toggleDrawer={toggleDrawer}
            ></Drawer>
        </div>
    );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { SwipeableDrawer } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        // display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: "auto"
    },
    content: {
        // flexGrow: 1,
        paddingLeft: theme.spacing(1)
    },
    linkDrawer: {
        textDecoration: "none",
        fontSize: "1.2em",
        color: "#121212",
        fontWeight: "500"
    }
}));

export default function ClippedDrawer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <SwipeableDrawer
                anchor="left"
                className={classes.drawer}
                variant="temporary"
                open={props.isOpen}
                classes={{
                    paper: classes.drawerPaper
                }}
                // elevation={3}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {[
                            "Home",
                            "Latest",
                            "Politics",
                            "Sports",
                            "Tech",
                            "Fashion"
                        ].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                {/* <ListItemText primary={text}> */}
                                <a
                                    href="#sports"
                                    className={classes.linkDrawer}
                                >
                                    {text}{" "}
                                </a>
                                {/* </ListItemText> */}
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>
            <main className={classes.content}>
                <Toolbar />
                {props.children}
            </main>
        </div>
    );
}

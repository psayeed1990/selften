import React from "react";
import Menu from "./Menu";
import Footer from './Footer';
import "../styles.css";
import { Card, Container, Grid, CardContent, Button, Typography } from '@material-ui/core';
import BottomMenu from './BottomMenu';
import Hidden from '@material-ui/core/Hidden';

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
        <div>
            <Menu />
            <div style={{ marginTop: '66px', }}></div>
            <div style={{ paddingBottom: '7px', backgroundColor: "white" }}></div>
            <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                <div className={className}>{children}</div>
            </Container>
            <div style={{ paddingTop: '7px', backgroundColor: "white" }}></div>


            <Hidden smDown>
                <Footer />
            </Hidden>
            <Hidden mdUp>
                <BottomMenu />
            </Hidden>
        </div>
    );

export default Layout;

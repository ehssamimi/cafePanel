import React, {Component} from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
//
// import ShowGallery from "./ShowGallery";
// import Gallery from "./Gallery";
import CafeAddGallery from "./NewGallery/CafeAddGallery";
import CafeShowGallery from "./NewGallery/CafeShowGallery";

const MainGallery = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/addgallery`} />

            <Route path={`${match.url}/addgallery`} component={CafeAddGallery} />
            <Route path={`${match.url}/showgallery`} component={CafeShowGallery} />
            {/*<Route path={`${match.url}/addgallery`} component={Gallery} />*/}
            {/*<Route path={`${match.url}/showgallery`} component={ShowGallery} />*/}

            <Redirect to="/error" />

        </Switch>
    </div>
);
export default MainGallery;
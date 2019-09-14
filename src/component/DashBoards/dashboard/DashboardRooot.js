import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


import Categories from "../../../component/Categories/Categories";
import ShowCategories from "../../../component/Categories/ShowCategories";

const DashboardRooot = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/addcategories`} />
            <Route path={`${match.url}/addcategories`} component={Categories} />
            <Route path={`${match.url}/showcategories`} component={ShowCategories} />

            <Redirect to="/error" />

        </Switch>
    </div>
);
export default DashboardRooot;
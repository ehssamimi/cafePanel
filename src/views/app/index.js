import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import gogo from "./gogo";
import secondMenu from "./second-menu";
import blankPage from "./blank-page";
import DashboardMain from "../../component/DashBoards/DashboardMain";
import Items from "../../component/Items/Items";
import MainGallery from "../../component/Gallery/MainGallery";
import Comments from "../../component/Comments/Comments";
import Exit from "../../component/Exit";
import DashboardRooot from "../../component/DashBoards/dashboard/DashboardRooot";
import PushNotification from "../../component/Message/PushNotification";

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards`} />
            <Route path={`${match.url}/maindashboards`} component={DashboardMain}/>
            <Route path={`${match.url}/dashboards`} component={DashboardRooot}/>
            <Route path={`${match.url}/items`} component={Items}/>
            <Route path={`${match.url}/gallery`} component={MainGallery}/>
            <Route path={`${match.url}/message`} component={PushNotification}/>
            <Route path={`${match.url}/comments`} component={Comments}/>
            <Route path={`${match.url}/exit`} component={Exit}/>
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import { isMultiColorActive } from "./constants/defaultValues";
import main from "./views";
import app from "./views/app";
import error from "./views/error";
// import orders from "./orders";
// import login from "./views/login";
import Exit from "./component/Exit";
import LogIn from "./views/LogIn";



const AuthRoute = ({ component: Component, authUser, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authUser ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            loginUser:true
        }
    }
    componentDidMount(){
        if(localStorage.getItem('user_id')){

        }else {
            console.log('this is false');
            this.setState({
                loginUser:false
            })
        }
    };

    render() {
        const { locale } = this.props;
        const currentAppLocale = AppLocale[locale];

        return (
            <div className="h-100">
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                    <React.Fragment>
                        <NotificationContainer />
                        {isMultiColorActive && <ColorSwitcher />}
                        <Router>
                            <Switch>
                                <AuthRoute  path="/app" authUser={this.state.loginUser} component={app}  />
                                {/*<Route path="/app" component={app} />*/}
                                {/*<Route path="/orders" component={orders} />*/}
                                <Route path="/error" exact component={error} />
                                <Route path="/login" exact component={LogIn} />
                                <Route path="/exit" exact component={Exit} />
                                <Route path="/" exact component={main} />
                                <Redirect to="/error" />
                            </Switch>
                        </Router>
                    </React.Fragment>
                </IntlProvider>
            </div>
        );
    }
}

const mapStateToProps = ({ settings }) => {
    const { locale } = settings;
    return { locale };
};
const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(App);

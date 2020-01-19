import React, {Component} from 'react';
import { connect } from 'react-redux';
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp";
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import Navigation from "../Navigation/Navigation"
import Dashboard from "../../components/Dashboard/Dashboard";
import Locations from "../Locations/Locations";
import Users from "../../components/Users/Users";
import Media from "../../components/Media/Media";
import UpsignLayout from "../../components/Layout/UpsignLayout";


class Page extends Component {
    constructor(props) {
        super(props);
        if (window.performance) {
            if (performance.navigation.type === 1) {
                // alert( "This page is reloaded" );
            }
        }
    }

    render() {
        console.log(this.props)
        const pageRoutes = this.props.authenticated !== true ?
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={SignUp} />
                <Redirect from="/signup" to="/register" exact component={SignUp} />
                <Redirect from="/" to="/login" component={Login} />
            </Switch>
         :
            <UpsignLayout>
                <Navigation/>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/locations" component={Locations} />
                    <Route path="/users" component={Users} />
                    <Route path="/media" component={Media} />
                    <Redirect from="/" to="/dashboard" component={Dashboard}/>
                </Switch>
            </UpsignLayout>


        return (
            <BrowserRouter>
                {pageRoutes}
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.loggedIn
    }
}


export default connect( mapStateToProps )(Page)

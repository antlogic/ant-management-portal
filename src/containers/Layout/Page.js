import React, {Component} from 'react';
import { connect } from 'react-redux';
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp";
import ImgUpload from "../image-upload/ImgUpload";
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
// import * as actions from "../../store/actions/auth";

class Page extends Component {
    render() {
        const pageRoutes =  !this.props.authenticated ?
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={SignUp} />
                <Redirect from="/signup" to="/register" exact component={SignUp} />
                <Redirect from="/" to="/login" component={Login} />
            </Switch>
         : <Switch>
                <Route path="/dashboard" component={ImgUpload} />
                <Redirect from="/" to="/dashboard" component={ImgUpload}/>
            </Switch>;

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
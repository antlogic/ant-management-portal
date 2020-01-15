import React, {Component} from "react";
import Auth from "../../containers/Auth/Auth";

class Login extends Component {
    render() {
        return (
            <Auth label="Log In" isLogin={true} />
        )
    }
}

export default Login






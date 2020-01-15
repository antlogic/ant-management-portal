import React, {Component} from "react";
import Auth from "../../containers/Auth/Auth";

class SignUp extends Component {
    render() {
        return (
            <Auth label="Sign Up" isLogin={false} />
        )
    }
}

export default SignUp






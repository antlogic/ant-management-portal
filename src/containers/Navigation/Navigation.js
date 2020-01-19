import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./navigation.scss"
import Logo from "../../assets/images/logo/UpSign_Symbol1.svg"
import { Menu } from "antd"
import Aux from "../../hoc/Aux/Aux"
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'dashboard'
        }
    }

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    handleLogout = () => {
        this.props.logOut()
    }


    render() {
        return (
            <Aux>
                <div className="logo">
                    <img src={Logo} className="logo" alt="logo"/>
                </div>
                <Menu theme="light"
                      mode="horizontal"
                      style={{ lineHeight: '64px' }}
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}>
                    <Menu.Item key="dashboard">
                        <Link to="/dashboard" >
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="locations">
                        <Link to="/locations" >
                            Locations
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="users">
                        <Link to="/users" >
                            Users
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="media">
                        <Link to="/media" >
                            Media
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={"hey there"} onClick={this.handleLogout}>
                        Logout
                    </Menu.Item>

                </Menu>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.logOut())
    };
};

export default connect(null, mapDispatchToProps)(Navigation)
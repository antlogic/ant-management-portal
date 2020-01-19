import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import "./navigation.scss"
import Logo from "../../assets/images/logo/UpSign_Symbol1.svg"
import { Menu, Button, Drawer } from "antd"
import Aux from "../../hoc/Aux/Aux"
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'dashboard',
            visible: false,
            mobile: false
        }
    }

    updateDimensions = () => {
        if(window.innerWidth < 800) {
            this.setState({
                mobile: true,
                visible: false
            });
        } else {
            this.setState({
                mobile: false,
                visible: true
            });
        }
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    handleClick = e => {
        this.setState({
            current: e.key,
            visible: false
        });
    };

    handleLogout = () => {
        this.props.logOut()
    }

    handleMenuClick = () => {
        this.setState({
            visible: !this.state.visible
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const home = {key: "dashboard"}
        return (
            <Aux>
                <div className="logo">
                    <Link to="/dashboard" onClick={() => this.handleClick(home)}><img src={Logo} className="logo" alt="logo"/></Link>
                </div>
                <div className={"hamburger-icon" + (this.state.visible ? " open" : "")} onClick={this.handleMenuClick}/>
                <Menu theme="light"
                      mode={(this.state.visible && this.state.mobile) ? "block" : "horizontal"}
                      style={{ lineHeight: '64px' }}
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      className={(!this.state.visible && this.state.mobile) ? "hidden" : ""}>

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

                <Redirect to={"/" + this.state.current} />
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
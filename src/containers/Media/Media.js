import React, {Component} from 'react';
import Aux from "../../hoc/Aux/Aux"
import {Card, List, Menu} from "antd";
import {Switch, Link, Route} from "react-router-dom";
import Images from "./Images/Images";
import Slides from "./Slides/Slides"

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "images",
        }
    }


    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Aux>
                <Menu theme="light"
                      mode={"horizontal"}
                      style={{ lineHeight: '64px' }}
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      className={(!this.state.visible && this.state.mobile) ? "hidden" : ""}>

                    <Menu.Item key="images">
                        <Link to="/media/images" >
                            Images
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="slides">
                        <Link to="/media/slides" >
                            Slides
                        </Link>
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route path="/media/images" component={Images} />
                    <Route path="/media/slides" component={Slides} />
                </Switch>
            </Aux>
        );
    }
}

export default Media
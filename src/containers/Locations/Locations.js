import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";
import { Button, Input, Modal, Empty, List, Card } from "antd"

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            columns: 0,
            address: "",
            name: "",
            number: "",
        }
        this.props.getLocations("locations");
    }

    updateDimensions = () => {
        if(window.innerWidth > 1300) {
            this.setState({ columns: 4 });
        } else if(window.innerWidth < 1300 && window.innerWidth > 800) {
            this.setState({ columns: 3 });
        } else if(window.innerWidth < 800 && window.innerWidth > 600) {
            this.setState({columns: 2});
        } else if(window.innerWidth < 600) {
            this.setState({columns: 1});
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


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const config = {
            "address": this.state.address,
            "name": this.state.name,
            "phoneNumber": this.state.number
        }
        this.props.addLocations("locations", config);
        this.handleCancel();
    }

    render() {
        const { locations } = this.props;
        const { columns } = this.state;

        const myLocations = locations !== null ? Object.keys(locations).map(i => locations[i]) : [];

        console.log(myLocations)

        const list = myLocations.length > 0 ? <List
            style={{padding: "3.5rem" }}
            grid={{
                gutter: 20,
                column: columns
            }}
            loading={this.props.loading}
            dataSource={myLocations}
            renderItem={item => (
                <List.Item>
                    <Card title={item.name}>Card content</Card>
                </List.Item>
            )}
        /> : null

        return (
            <Aux>
                {list}
                <Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={
                        myLocations.length === 0 ?
                            {height: 60} : {height: 0}
                    }
                    description={
                        <span>
                            {myLocations.length === 0 ? "No Locations available" : ""}
                        </span>
                    }
                >
                    <Button type="primary" onClick={this.showModal}>Add a Location</Button>
                </Empty>


                <Modal
                    title="Add Locations"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button onClick={this.handleSubmit} type="primary">Submit</Button>}
                >
                    <Input name="address" type="string" value={this.state.address} onChange={this.handleChange} placeholder="address"/>
                    <Input name="name" type="string" value={this.state.name} onChange={this.handleChange} placeholder="name"/>
                    <Input name="number" type="tel" value={this.state.number} onChange={this.handleChange} placeholder="number"/>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        locations: state.locations,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLocations: (to, config) => dispatch(actions.SetRequest(to, config)),
        getLocations: (to) => dispatch(actions.GetRequest(to))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
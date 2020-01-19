import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";
import { Button, Input, Modal } from "antd"

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            address: "",
            name: "",
            number: "",
        }
        this.props.getLocations("locations")
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
        const { locations } = this.props

        const myLocations = ( locations != null ?
            Object.keys(locations).map((unused, index) => (
                <h1 key={index}>{locations[index].name}</h1>
            )) : "");
        return (
            <Aux>
                <h1>Location Stats</h1>
                {myLocations}
                <Button type="primary" onClick={this.showModal}>
                    Add Locations
                </Button>
                <Modal
                    title="Add Locations"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button onClick={this.handleSubmit} className="ant-btn ant-btn-primary">Submit</Button>}
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
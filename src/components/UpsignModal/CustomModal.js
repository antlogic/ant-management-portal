import React, {Component} from 'react';
import {Modal, Button, Input} from "antd";

class CustomModal extends Component {

    render() {
        const form = Object.keys(this.props.inputs).map( i => (
                <Input
                    key={i}
                    name={i}
                    type={this.props.inputs[i].elementConfig.type}
                    value={this.props.inputs[i].value}
                    onChange={this.props.handleChange}
                    placeholder={this.props.inputs[i].elementConfig.placeholder}/>
            ))

        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                footer={<Button onClick={() => this.props.button()} type="primary">Submit</Button>}
            >
                {form}
            </Modal>
        );
    }
}

export default CustomModal
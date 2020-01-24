import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";
import { Button, Empty, List, Card } from "antd"
import CardDetails from "../../components/CardDetails/CardDetails";
import CustomModal from "../../components/UpsignModal/CustomModal";
import {Link} from "react-router-dom";

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            columns: 0,
            inputs: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name',
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                number: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'tel',
                        placeholder: 'Phone Number',
                    },
                    value: '',
                    isRequired: false,
                    touched: false
                },
                address: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Address',
                    },
                    value: '',
                    isRequired: false,
                    touched: false
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'City',
                    },
                    value: '',
                    isRequired: false,
                    touched: false
                },
                state: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'State',
                    },
                    value: '',
                    isRequired: false,
                    touched: false
                },
                zip: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Zip Code',
                    },
                    value: '',
                    isRequired: false,
                    touched: false
                }
            }
        }
        this.props.getLocations("locations");
    }

    updateDimensions = () => {
        if(window.innerWidth > 1200) {
            this.setState({ columns: 4 });
        } else if(window.innerWidth < 1200 && window.innerWidth > 1100) {
            this.setState({ columns: 3 });
        } else if(window.innerWidth < 1000 && window.innerWidth > 700) {
            this.setState({columns: 2});
        } else if(window.innerWidth < 700) {
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

    updateState = (updatedState, property) => {
        const updatedElement = {
            ...updatedState[property]
        }
        updatedElement.value = "";
        updatedElement.touched = false;

        return updatedElement
    }

    handleCancel = e => {
        const updatedState =  {
            ...this.state.inputs
        }
        updatedState["name"] = this.updateState(updatedState, "name");
        updatedState["number"] = this.updateState(updatedState, "number");
        updatedState["address"] = this.updateState(updatedState, "address");
        updatedState["city"] = this.updateState(updatedState, "city");
        updatedState["state"] = this.updateState(updatedState, "state");
        updatedState["zip"] = this.updateState(updatedState, "zip");

        this.setState({
            visible: false,
            inputs: updatedState
        })
    };

    handleChange = (event) => {
        const updatedObject = {
            ...this.state.inputs
        }
        const updatedElement = {
            ...updatedObject[event.target.name]
        }
        updatedElement.value = event.target.value;
        updatedElement.touched = true;

        updatedObject[event.target.name] = updatedElement;

        this.setState({
            inputs: updatedObject
        })
    }

    handleSubmit = (event) => {
        // event.preventDefault()
        const concattedAddress = this.state.inputs.address.value
            + ", " + this.state.inputs.city.value + ", "
            + this.state.inputs.state.value + " " + this.state.inputs.zip.value;

        const config = {
            "address": concattedAddress,
            "name": this.state.inputs.name.value,
            "phoneNumber": this.state.inputs.number.value,
        }
        this.props.addLocations("locations", config);
        this.handleCancel();
    }

    render() {
        const { locations } = this.props;
        const { columns } = this.state;

        const myLocations = locations !== null ? Object.keys(locations).map(i => locations[i]) : [];

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
                    <Link to={"/stores/" + item.locationId} >
                        <Card title={item.name}>
                            <CardDetails title="Displays:" data={item.numberOfDisplays}/>
                            <CardDetails title="Created By:" data={item.createdBy}/>
                            <CardDetails title="Last Updated:" data={item.updatedAt} isDate={true}/>
                            <CardDetails title="Updated By:" data={item.updatedBy}/>
                        </Card>
                    </Link>
                </List.Item>
            )}
        /> : null

        return (
            <Aux>
                {list}
                <div className={myLocations.length === 0 ? "center-empty" : "" } >
                    <Empty
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        imageStyle={
                            myLocations.length === 0 ?
                                {height: 60} : {height: 0}
                        }
                        description={
                            <span>
                                {myLocations.length === 0 ? "No Stores available" : ""}
                            </span>
                        }
                    >
                        <Button type="primary" onClick={this.showModal}>Add Store</Button>
                    </Empty>
                </div>

                <CustomModal
                    title="Add Store"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    handleChange={this.handleChange}
                    onCancel={this.handleCancel}
                    button={this.handleSubmit}
                    inputs={this.state.inputs}/>
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
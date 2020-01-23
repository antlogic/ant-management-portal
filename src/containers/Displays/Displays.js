import React, {Component} from 'react';
import { withRouter } from "react-router";
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";
import {Card, List} from "antd";
import CardDetails from "../../components/CardDetails/CardDetails";

class Displays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parent: null,
        }

        this.props.getDisplays("locations/" + this.props.match.params.locationId + "/displays")
    }

    componentDidMount() {
        const myLocations = Object.keys(this.props.locations).map(i => this.props.locations[i])
        console.log("component did mount")

        for(let location in myLocations){
            if(myLocations[location].locationId == this.props.match.params.locationId){
                this.setState({
                    parent: myLocations[location]
                })
            }
        }
    }

    render() {
        const { displays } = this.props;
        const { parent } = this.state

        const myDisplays = (displays !== null)  ? Object.keys(displays).map(i => displays[i]) : [];

        const list = myDisplays.length > 0 ? <List
            style={{padding: "3.5rem" }}
            grid={{
                gutter: 20,
                column: 2
            }}
            loading={this.props.loading}
            dataSource={myDisplays}
            renderItem={item => (
                <List.Item>
                    <Card title={item.name}>
                        <CardDetails title="Slides:" data={item.numberOfSlides}/>
                        <CardDetails title="Last Updated:" data={item.updatedAt} isDate={true}/>
                    </Card>
                </List.Item>
            )}
        /> : null

        console.log("hello")
        console.log(this.state)


        return (
            <div>
                {parent == null ? "" : <h1>{"These are my displays for location " + parent.name }</h1>}
                {list}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        displays: state.displays,
        locations: state.locations,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLocations: (to, config) => dispatch(actions.SetRequest(to, config)),
        getDisplays: (to) => dispatch(actions.GetRequest(to))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Displays))
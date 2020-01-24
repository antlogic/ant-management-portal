import React, {Component} from 'react';
import ImageUpload from "../ImageUpload/ImageUpload";
import Aux from "../../hoc/Aux/Aux"
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";
import DisplayImg from "../../components/DisplayImage/DisplayImg";
import {Card, List} from "antd";
import {Link} from "react-router-dom";
import CardDetails from "../../components/CardDetails/CardDetails";

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: 4
        }
        this.props.getMedia("images");
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


    uploadImage = (imageFile) => {
        const formData = new FormData()
        formData.append('file', imageFile)
        this.props.addMedia("images", formData)
    }


    render() {
        const { images } = this.props;
        const { columns } = this.state;
        const myImages = images !== null ? Object.keys(images).map(i => images[i]) : [];

        const display =  <List
            style={{padding: "3.5rem" }}
            grid={{
                gutter: 20,
                column: columns
            }}
            loading={this.props.loading}
            dataSource={myImages}
            renderItem={image => (
                <List.Item>
                    <Link to={"media"} >
                        <Card cover={<img src={image.url} alt="img" />} >
                            <CardDetails title="Name:" data={image.imageId} cssClass="full-width"/>
                            <CardDetails title="Width:" data={image.width}/>
                            <CardDetails title="Height:" data={image.height}/>
                        </Card>
                    </Link>
                </List.Item>
            )}
            />

        return (
            <Aux>
                {display}
                <ImageUpload upload={this.uploadImage} ImgArray={myImages.length}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        images: state.images,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMedia: (to, config) => dispatch(actions.SetRequest(to, config)),
        getMedia: (to) => dispatch(actions.GetRequest(to))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Media)
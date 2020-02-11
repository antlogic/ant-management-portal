import React, {Component} from 'react';
import Aux from "../../../hoc/Aux/Aux"
import * as actions from "../../../store/actions/actions";
import {connect} from "react-redux";
import {Button, Card, Empty, List} from "antd";
import {Link} from "react-router-dom";
import CardDetails from "../../../components/CardDetails/CardDetails";
import CustomModal from "../../../components/UpsignModal/CustomModal";
import "./Slides.scss"

class Slides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: 4,
            visible: false,
            selectedImage: -1,
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
                time: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Transition Time (ms)',
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
            }
        }
        this.props.getSlide("slides");
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
        updatedState["time"] = this.updateState(updatedState, "time");

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
        const config = {
            "imageId": this.state.selectedImage,
            "name": this.state.inputs.name.value,
            "transitionTimeMillis": this.state.inputs.time.value,
            "type": "image"
        }

        if(this.state.selectedImage !== -1) {
            this.props.addSlide("slides", config);
        }
        this.handleCancel();
    }

    selectImage = (value) => {
        this.setState({selectedImage: value.imageId})
    }


    render() {
        const { slides, images } = this.props;
        const { columns } = this.state;
        const mySlides = slides !== null ? Object.keys(slides).map(i => slides[i]) : [];
        const myImages = images !== null ? Object.keys(images).map(i => images[i]) : [];

        const imagePicker = myImages.map((value, index) => (
            <img
                src={value.url}
                key={"image" + index}
                onClick={() => this.selectImage(value)}
                width={60}
                height={60}
                className={"imagePicker" + (this.state.selectedImage === value.imageId ? " selected" : "")}
            />
        ))

        const display =  <List
            style={{padding: "3.5rem" }}
            grid={{
                gutter: 20,
                column: columns
            }}
            loading={this.props.loading}
            dataSource={mySlides}
            renderItem={slide => (
                <List.Item>
                    <Link to={"media"} >
                        <Card cover={<img className="imageCardCover" src={slide.image.url} alt="img" />} >
                            <CardDetails title="Name:" data={slide.name} cssClass="full-width"/>
                            <CardDetails title="Width:" data={slide.image.width}/>
                            <CardDetails title="Height:" data={slide.image.height}/>
                        </Card>
                    </Link>
                </List.Item>
            )}
        />

        return (
            <Aux>
                {this.props.slides === 0 ? "" : display}
                <Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={
                        this.props.slides === 0 ?
                            {height: 60} : {height: 0}
                    }
                    description={
                        <span>
                            {this.props.slides === 0 ? "No images available" : ""}
                        </span>
                    }
                >
                    <Button type="primary" onClick={this.showModal}>Add Slide</Button>
                </Empty>

                <CustomModal
                    title="Add Slide"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    handleChange={this.handleChange}
                    onCancel={this.handleCancel}
                    button={this.handleSubmit}
                    inputs={this.state.inputs}
                >
                    <div className="imageCarousel">
                        {imagePicker}
                    </div>
                </CustomModal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        slides: state.slides,
        images: state.images,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSlide: (to, config) => dispatch(actions.SetRequest(to, config)),
        getSlide: (to) => dispatch(actions.GetRequest(to))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slides)
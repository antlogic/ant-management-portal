import React, {Component} from 'react';
import ImgUpload from "../../containers/image-upload/ImgUpload";
import Aux from "../../hoc/Aux/Aux"

class Media extends Component {
    render() {
        return (
            <Aux>
                <h1>Media Stats</h1>
                <ImgUpload />
            </Aux>
        );
    }
}

export default Media
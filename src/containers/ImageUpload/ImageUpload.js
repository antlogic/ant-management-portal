import React, {Component} from 'react';
import {Button, Empty} from "antd";
import Dropzone from "react-dropzone";
import Aux from '../../hoc/Aux/Aux'


const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
class ImageUpload extends Component {

    verifyFile = (file) => {
        const fileType = file.type
        if(!acceptedFileTypesArray.includes(fileType)){
            alert("File " + file.name + " is of type " + fileType + " and is not an image")
            return false
        }
        return true
    }

    handleOnDrop = (files, rejectedFiles) => {
        console.log(files);
        for(let i = 0; i < files.length; i++){
            if(this.verifyFile(files[i])){
                this.props.upload(files[i])
            }
        }
        for(let i = 0; i < rejectedFiles.length; i++){
            this.verifyFile(rejectedFiles[i])
        }
    }
    render() {
        return (
            <Aux>
                <Dropzone
                    onDrop={this.handleOnDrop}
                    multiple={true}
                    accept={acceptedFileTypes}
                    maxSize={20971520}
                >
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Empty
                                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                    imageStyle={
                                        this.props.images === 0 ?
                                            {height: 60} : {height: 0}
                                    }
                                    description={
                                        <span>
                                            {this.props.images === 0 ? "No images available" : ""}
                                        </span>
                                    }
                                >
                                    <Button type="primary">Add Image</Button>
                                </Empty>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </Aux>
        );
    }
}

export default ImageUpload
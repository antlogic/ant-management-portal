import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import DisplayImg from './DisplayImg'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link,
    Switch
} from "react-router-dom";
import Login from "../../components/Auth/Login";
import SecureMessage from "./SecureMessage";

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
class ImgUpload extends Component {
  constructor(props){
    super(props)
    this.state = {
      ImgArray: [],
      LogOut: false
    }
  }

  handleRemoveImage = (removedItem) => {
    let updatedImgArray = this.state.ImgArray.filter((item) => {
      return item.ImgSrc !== removedItem.ImgSrc
    })
    this.setState({
      ImgArray: updatedImgArray
    })
  }

  verifyFile = (file) => {
    const fileType = file.type
    console.log(!acceptedFileTypesArray.includes(fileType))
    if(!acceptedFileTypesArray.includes(fileType)){
      alert("File " + file.name + " is of type " + fileType + " and is not an image")
      return false
    }
    return true
  }

  handleOnDrop = (files, rejectedFiles) => {
    console.log(typeof files[0]);
    for(let i = 0; i < files.length; i++){
      const currentFile = files[i]
      if(this.verifyFile(currentFile)) {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
          let newImgArray = this.state.ImgArray.slice()
          newImgArray.push({
            ImgSrc: reader.result,
            ImgName: currentFile.name,
            ImgType: currentFile.type,
            ImgSize: currentFile.size
          })
          console.log(files)
          this.setState({
            ImgArray: newImgArray
          })
        }, false)

        reader.readAsDataURL(currentFile)
      }
    }
    for(let i = 0; i < rejectedFiles.length; i++){
      this.verifyFile(rejectedFiles[i])
    }
  }

  signOut = () => {

  }

  render () {
    const {ImgArray} = this.state

    if (this.state.LogOut) {
      return (
          <Router>
            <Route>
              <Redirect to="/login"/>
            </Route>
            <Switch>
              <Route path='/login/' component={Login}/>
            </Switch>
          </Router>
      )
    } else {
      return (
          <div>
            <Link to='/login' onClick={this.signOut}>Sign Out</Link>

            <SecureMessage/>
            {ImgArray.map((item, index) =>
                <DisplayImg
                    ImgItem={item}
                    key={`image-key ${index}`}
                    removeImage={this.handleRemoveImage}/>
            )}

            <Dropzone
                onDrop={this.handleOnDrop}
                multiple={true}
                accept={acceptedFileTypes}
            >
              {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
              )}
            </Dropzone>
          </div>
      )
    }
  }
}

export default ImgUpload

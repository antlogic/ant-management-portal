import React, { Component } from 'react'

class DisplayImg extends Component {

  removeImageClicked = (event) => {
    event.preventDefault()
    const { removeImage } = this.props
    removeImage(this.props.ImgItem)
  }

  render () {
    const { ImgItem } = this.props
    return (
      <div>
        <img
          src={ImgItem.ImgSrc}
          alt={ImgItem.ImgName}
        />

        <h2 onClick={this.removeImageClicked}>
          Remove {ImgItem.ImgName}
        </h2>
      </div>
    )
  }
}

export default DisplayImg

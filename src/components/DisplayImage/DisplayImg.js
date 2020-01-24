import React from 'react'

const DisplayImg = (props) => {
    const { ImgItem } = props

    return (
      <div>
        <img
            className="image--display"
            src={ImgItem.url}
            alt={ImgItem.imageId}
        />

      </div>
    )
}

export default DisplayImg

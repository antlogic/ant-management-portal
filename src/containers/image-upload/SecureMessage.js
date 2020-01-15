import React, { Component } from 'react'
import AuthenticationService from '../../[DELETE] authentication/AuthenticationService.js'

class SecureMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

  getMessage = (event) => {
        event.preventDefault()
        AuthenticationService.getSecureMessage().then(result=>{
            this.setState({
                message: result
            })
        });
  }

  render () {
        const {message} = this.state
    return (
      <div>
          <button type='button' onClick={this.getMessage}>Click for Message</button>
          <h1>{message}</h1>
      </div>
    )
  }
}

export default SecureMessage

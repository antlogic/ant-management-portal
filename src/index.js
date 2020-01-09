import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import AuthenticationRoute from './authentication/AuthenticationRoute'

ReactDOM.render(<AuthenticationRoute />, document.getElementById('root'))

import React, {Component} from 'react';
import Input from "../../components/Input/Input";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/auth";
import Logo from '../../assets/images/logo/UpSign_Logo.svg'
import "./auth.scss"
import {Spinner} from "react-bootstrap";
import Aux from '../../hoc/Aux/Aux'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logInForm: {
                username: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Username',
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
            },
            signInForm: {
                firstName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'First Name'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                lastName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Last Name'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                phoneNumber: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'tel',
                        placeholder: 'Phone Number'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                companyName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Company Name'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                username: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Username'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig:{
                        type: 'email',
                        placeholder: 'E-Mail'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
                passwordCheck: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Confirm Password'
                    },
                    value: '',
                    isRequired: true,
                    touched: false
                },
            }
        }
    }

    isInvalid(value, type){
        switch (type) {
            case 'text':
                return !value
            case 'tel':
                return isNaN(value) || !value
            case 'email':
                return ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            case 'password':
                return (value.length <= 6);
            default:
                return true;

        }
    }

    handleOnChange = (event, id) => {
        const objectName = this.props.isLogin ? "logInForm" : "signInForm";
        const updatedState = {
             ...this.state[objectName]
        };
        const updatedElement = {
            ...updatedState[id]
        };
        updatedElement.value = event.target.value;
        updatedElement.touched = this.isInvalid(event.target.value, updatedElement.elementConfig.type)
        updatedState[id] = updatedElement;
        this.setState({
            [objectName]: updatedState
        })
    }

    logInSubmit = (event) => {
        event.preventDefault();
        const config = {
            data: {
                usernameOrEmail: this.state.logInForm.username.value,
                password: this.state.logInForm.password.value
            },
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'userId':'anon'
            },
        };
        this.props.onAuth(config, true);
    }

    signUpSubmit = (event) => {
        event.preventDefault();
        const config = {
            data: {
                firstName: this.state.signInForm.firstName.value,
                lastName: this.state.signInForm.lastName.value,
                username: this.state.signInForm.username.value,
                email: this.state.signInForm.email.value,
                phoneNumber: this.state.signInForm.phoneNumber.value,
                password: this.state.signInForm.password.value,
                companyName: this.state.signInForm.companyName.value
            },
            headers:{
                'Content-Type':'application/json; charset=UTF-8',
            },
        };
        this.props.onAuth(config, false);
    }

    render() {
        const { isLogin } = this.props;
        const formClass  = isLogin ? "loginForm" : "signupForm" ;
        const submitHandleFunction =  isLogin ? this.logInSubmit : this.signUpSubmit;
        const loopArray = isLogin ? this.state.logInForm : this.state.signInForm;
        const signUpButton = (
            <Link
                to={isLogin ? "/register" : "/login"}>
                    <button className="registerFormButton" type="button">
                        {isLogin ? "Sign Up" : "Log In"}
                    </button>
            </Link>
        );

        const formInputArray = [];
        for(let key in loopArray){
            formInputArray.push({
                id: key,
                config: loopArray[key]
            });
        }
        let form = (
            <Aux>
                {formInputArray.map(formInput => (
                    <div key={formInput.id} className="column form__group">
                        <Input
                            elementType={formInput.config.elementType}
                            elementConfig={formInput.config.elementConfig}
                            value={formInput.config.value}
                            isRequired={formInput.config.isRequired}
                            changed={(event) => this.handleOnChange(event, formInput.id)}
                            className={formInput.config.touched ? "form__field touched" : "form__field"}/>
                            <label className="form__label">{formInput.config.elementConfig.placeholder}</label>
                    </div>
                ))}
                <div className="column">
                    <button className="registerFormButton" type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </div>
                <div className="column">
                    {signUpButton}
                </div>
            </Aux>
        );

        if(this.props.loading) {
            form = <div className="spinner"><Spinner animation="border" role="status" /></div>
        }

        return (
            <div className="loginContainer" >
                <form onSubmit={submitHandleFunction} className={formClass}>
                    <img src={Logo} alt=""/>
                    <label className="form--heading">{"Admin " + this.props.label}</label>
                    <div className={"formContainer"}>
                        {form}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (config, isLogin) => dispatch(actions.auth(config, isLogin))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
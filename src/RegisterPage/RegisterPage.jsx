import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {regexConstants } from '../_constants'

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                phoneNumber:'',
                emailAddress:'',
                username: '',
                password: ''
            },
            submitted: false,
            isFirstNameValid: true,
            isLastNameValid: true,
            isPhoneNumberValid: true,
            isEmailValid: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAlfaCharacter = this.handleChangeAlfaCharacter.bind(this);
        this.handleChangeNumbericCharater = this.handleChangeNumbericCharater.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleChangeAlfaCharacter(event) {
        if (event.target.value !== '' && !regexConstants.Characters.test(event.target.value)) {            
            this.setAlphaCharcterFieldsValidation(event.target.name, false);
          } else {
            this.setAlphaCharcterFieldsValidation(event.target.name, true);
            this.setData(event);
          }
    }

    setAlphaCharcterFieldsValidation(fieldName, value) {
        switch(fieldName) {
            case 'firstName' : {
                this.setState({ isFirstNameValid: value });
                break;
            }
            case 'lastName' : {
                this.setState({ isLastNameValid: value });
                break;
            }
        }
    }

    handleChangeEmail(event) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (event.target.value !== '' && !regexConstants.Email.test(event.target.value)) {
            this.setState({ isEmailValid: false });
          } else {
            this.setState({ isEmailValid: true });
          }          
          this.setData(event);
    }

    handleChangeNumbericCharater(event) {
        const re = /^[0-9\b]+$/;
        if (event.target.value !== '' && !regexConstants.Numeric.test(event.target.value)) {
            this.setState({ isPhoneNumberValid: false });
          } else {
            this.setState({ isPhoneNumberValid: true });
            this.setData(event);
          }
    }

    setData(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password && user.phoneNumber && user.emailAddress) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, isEmailValid, isPhoneNumberValid, isFirstNameValid, isLastNameValid } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChangeAlfaCharacter} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                        {!submitted && !isFirstNameValid &&
                            <div className="help-block">Input characters only</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChangeAlfaCharacter} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                        {!submitted && !isLastNameValid &&
                            <div className="help-block">Input characters only</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.phoneNumber ? ' has-error' : '')}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control" name="phoneNumber" value={user.phoneNumber} onChange={this.handleChangeNumbericCharater} />
                        {submitted && !user.phoneNumber &&
                            <div className="help-block">Phone Number is required</div>
                        }
                        {!submitted && !isPhoneNumberValid &&
                            <div className="help-block">Input number only</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.emailAddress ? ' has-error' : '')}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input type="text" className="form-control" name="emailAddress" value={user.emailAddress} onChange={this.handleChangeEmail} />
                        {submitted && !user.emailAddress &&
                            <div className="help-block">Email Address is required</div>
                        }
                        {!submitted && !isEmailValid &&
                            <div className="help-block">Email Address not valid</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
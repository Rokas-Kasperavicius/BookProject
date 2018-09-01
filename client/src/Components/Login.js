import React from 'react';
import { Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form'
import { connect } from 'react-redux';
import { setToken, removeToken } from './Token';
import { renderField }from './Input';
import { required } from './Validation'
import { sendUser, clear } from '../Actions/Actions';
import { login } from '../API/API';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Login extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    const values = this.props.formValues;

    login(values).then(properties => {
      if (properties.errors) {
        NotificationManager.error(properties.errors, '', 4000);
      } else {
        setToken();
        this.props.sendUser(properties.loggedUser);
        this.props.history.push('/');
      }
    })
  };

  componentWillMount() {
    removeToken();
    this.props.clear();
  }

  render() {
    const { formErrors } = this.props;

    return (
      <div className="guest">
        <h2 className="login-title title">
          Login to Books Librarysadasfd
        </h2>
        <Form className="bookForm loginForm" onSubmit={e => this.onSubmit(e)}>
          <Field
            name="email"
            label="Email"
            component={renderField}
            validate={required}
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Field
            name="password"
            label="Password"
            component={renderField}
            validate={required}
            placeholder="Enter your password"
            type="password"
            autoComplete="password"
          />
          <Button
            content="Login"
            className="login"
            disabled={Object.keys(formErrors).length !== 0}
          />
          <div>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
          <NotificationContainer />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('login')(state),
  formErrors: getFormSyncErrors('login')(state),
});

const mapDispatchToProps = dispatch => {
  return {
    sendUser: user => dispatch(sendUser(user)),
    clear: () => dispatch(clear()),
  };
};

const formConfig = {
  form: 'login',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(Login)));
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react'
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form'
import { required, phone, email, maxValue } from './Validation'
import { renderField }from './Input';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class AccountSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lowercase: undefined,
      uppercase: undefined,
      characters: undefined,
      digits: undefined,
    }
  }

  componentWillReceiveProps(nextProps){
    let values = nextProps.formValues;

    if (values && values.password && values.password.length >= 8) {
      this.setState({ characters: true });
    }
    else {
      this.setState({ characters: undefined });
    }

    if (values && values.password && /(?=.*[a-z])/.test(values.password)) {
      this.setState({ lowercase: true });
    }
    else {
      this.setState({ lowercase: undefined });
    }

    if (values && values.password && /(?=.*[A-Z])/.test(values.password)) {
      this.setState({ uppercase: true });
    }
    else {
      this.setState({ uppercase: undefined });
    }

    if (values && values.password && /(?=.*[0-9])/.test(values.password)) {
      this.setState({ digits: true });
    }
    else {
      this.setState({ digits: undefined });
    }
  } //Password check

  componentWillMount(){
    let values = this.props.formValues;

    if (values && values.password && values.password.length >= 8) {
      this.setState({ characters: true });
    }
    else {
      this.setState({ characters: undefined });
    }

    if (values && values.password && /(?=.*[a-z])/.test(values.password)) {
      this.setState({ lowercase: true });
    }
    else {
      this.setState({ lowercase: undefined });
    }

    if (values && values.password && /(?=.*[A-Z])/.test(values.password)) {
      this.setState({ uppercase: true });
    }
    else {
      this.setState({ uppercase: undefined });
    }

    if (values && values.password && /(?=.*[0-9])/.test(values.password)) {
      this.setState({ digits: true });
    }
    else {
      this.setState({ digits: undefined });
    }
  }

  render () {
    const { formErrors } = this.props;
    const { uppercase, lowercase, characters, digits } = this.state;
    const validation = uppercase && lowercase && characters && digits;
    console.log(this.props.formValues);

    return (
      <div className="App">
        <h3 className="title">Account Settings</h3>
        <Form className="bookForm account-settingsForm" onSubmit={e => e.preventDefault()}>
          <Field
            name="firstName"
            label="First Name"
            component={renderField}
            validate={required}
            placeholder="Enter your first name"
            autoComplete="firstName"
          />
          <Field
            name="lastName"
            label="Last Name"
            component={renderField}
            validate={required}
            placeholder="Enter your last name"
            autoComplete="lastName"
          />
          <Field
            name="userName"
            label="Username"
            component={renderField}
            validate={[required, maxValue]}
            placeholder="Enter your username"
            autoComplete="userName"
          />
          <Field
            name="country"
            label="Country"
            component={renderField}
            validate={required}
            placeholder="Enter your country"
            autoComplete="country"
          />
          <Field
            name="email"
            label="Email"
            component={renderField}
            validate={[required, email]}
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Field
            name="phoneNumber"
            label="Phone Number"
            component={renderField}
            validate={[required, phone]}
            placeholder="Enter your phone number"
            autoComplete="phoneNumber"
          />
          <Field
            name="password"
            label="Password"
            component={renderField}
            validate={[required]}
            placeholder="Enter your password"
            type="password"
            autoComplete="new-password"
          />
          <div className="password-require">
            <Icon name={characters ? "check circle" : "warning circle"} style={{ color: characters ? "green" : "red" }} />
            <span>At least 8 characters long</span>
          </div>
          <div className="password-require">
            <Icon name={lowercase ? "check circle" : "warning circle"} style={{ color: lowercase ? "green" : "red" }} />
            <span>One lowercase character</span>
          </div>
          <div className="password-require">
            <Icon name={uppercase ? "check circle" : "warning circle"} style={{ color: uppercase ? "green" : "red" }} />
            <span>One uppercase character</span>
          </div>
          <div className="password-require">
            <Icon name={digits ? "check circle" : "warning circle"} style={{ color: digits ? "green" : "red" }} />
            <span>At least one number</span>
          </div>
          <Button
            content="Update Account"
            disabled={Object.keys(formErrors).length !== 0 || !validation}
          />
          <NotificationContainer />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged_user: state.state.logged_user,
  formValues: getFormValues('account-settings')(state),
  formErrors: getFormSyncErrors('account-settings')(state),
  initialValues: {
    firstName: state.state.logged_user.firstName,
    lastName: state.state.logged_user.lastName,
    userName: state.state.logged_user.userName,
    country: state.state.logged_user.country,
    email: state.state.logged_user.email,
    phoneNumber: state.state.logged_user.phoneNumber,
    password: state.state.logged_user.password,
  }
});

const formConfig = {
  form: 'account-settings',
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(AccountSettings)));
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form';
import { required, phone, email, maxValue } from './Validation';
import { renderField }from './Input';
import { PasswordValidation } from "./PasswordValidation";
import { NotificationContainer } from 'react-notifications';
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
    const values = nextProps.formValues;

    this.passwordCheck(values);
  } //Password check
  componentDidMount(){
    const values = this.props.formValues;

    this.passwordCheck(values);
  } //Password check

  passwordCheck = values => {
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

    return (
      <div className="app">
        <h3 className="title">Account Settings</h3>
        <Form className="form account-settings-form" onSubmit={e => e.preventDefault()}>
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
          <PasswordValidation
            characters={characters}
            lowercase={lowercase}
            uppercase={uppercase}
            digits={digits}
          />
          <Button
            content="Update Account"
            className='update-account'
            disabled={Object.keys(formErrors).length !== 0 || !validation}
          />
          <NotificationContainer />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
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
  enableReinitialize: true,
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(AccountSettings)));
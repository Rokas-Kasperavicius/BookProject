import React from 'react';
import Modals from './Modals'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { getFormSyncErrors, getFormValues, reduxForm, Field } from "redux-form";
import { renderField } from './Input';
import { renderFieldTextArea } from './InputTextArea';
import { required } from "./Validation";
import { NotificationManager } from "react-notifications";
import { timeout } from '../Constants/Constants';

const titleReset = 'Are you sure you want to reset the book?';
const titleSubmit = 'Are you sure you want to submit the book?';

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      modalProps: {
        title: '',
        content: '',
        onFunction: undefined,
        open: false,
      }
    }
  }

  componentWillMount() {
    this.setState({
      book: this.props.formValues,
    })
  }

  onReset = () => {
    this.props.reset();
    NotificationManager.success('The Book was successfully reset', '', timeout);
    this.onModalClose();
  };

  onSubmit = () => {
    const { formValues } = this.props;

    this.onModalClose();
    this.props.changeBook(formValues);
  };

  onModalOpen = (e, content, title, onFunction) => {
    e.preventDefault();
    const { modalProps } = this.state;

    const newModalProps = {
      ...modalProps,
      open: true,
      content: content,
      title: title,
      onFunction: onFunction,
    };

    this.setState({ modalProps: newModalProps })
  };

  onModalClose = () => {
    this.setState({
     modalProps: { open: false }
    })
  };

  render () {
    const { modalProps } = this.state;
    const { formErrors } = this.props;

    return (
      <div>
        <div>
          <Form className="form">
            <Field
              name="title"
              label="Pavadinimas"
              component={renderField}
              validate={required}
              placeholder="Enter Title"
              autoComplete="title"
            />
            <Field
              name="subject"
              label="Tema"
              component={renderField}
              validate={required}
              placeholder="Enter subject"
              autoComplete="subject"
            />
            <Field
              name="language"
              label="Kalba"
              component={renderField}
              validate={required}
              placeholder="Enter Language"
              autoComplete="language"
            />
            <Field
              name="pageNumber"
              type="number"
              label="Puslapių skaičius"
              component={renderField}
              validate={required}
              placeholder="Enter Page Number"
              autoComplete="pageNumber"
            />
            <Field
              name="plot"
              label="Aprašymas"
              component={renderFieldTextArea}
              validate={required}
              placeholder="Enter The Plot"
              autoComplete="plots"
            />
         </Form>
        </div>
        <div>
          <Button
            content="Reset"
            className="reset"
            onClick={e => this.onModalOpen(e, 'Reset', titleReset, this.onReset)}
          />
          <Button
            content="Submit"
            className="submit"
            onClick={e => this.onModalOpen(e, 'Submit', titleSubmit, this.onSubmit)}
            disabled={Object.keys(formErrors).length !== 0}
          />
        </div>
        <Modals
          modalProps={modalProps}
          onClose={() => this.onModalClose()}
        >
        </Modals>
      </div>
   );
  }
}

const mapStateToProps = (state, props) => ({
  formValues: getFormValues('book-form')(state),
  formErrors: getFormSyncErrors('book-form')(state),
  initialValues: {
    id: props.book.id,
    title: props.book.title,
    subject: props.book.subject,
    language: props.book.language,
    pageNumber: props.book.pageNumber,
    plot: props.book.plot
  }
});

const formConfig = {
  form: 'book-form',
  enableReinitialize: true,
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(BookForm)));

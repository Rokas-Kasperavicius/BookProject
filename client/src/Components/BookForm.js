import React from 'react';
import Modals from './Modals'
import { Button, Form } from 'semantic-ui-react'

const titleReset = 'Are you sure you want to reset the book?';
const titleSubmit = 'Are you sure you want to submit the book?';

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
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
    const { book } = this.props;

    this.setState({
      values: book,
      book,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { book } = nextProps;

    this.setState({
      values: book,
      book,
    })
  }

  onValueChange = (val, fieldName, author) => {
    const { values } = this.state;

    if (!author) {
      const newValues = {
        ...values,
        [fieldName]: val,
      };
      this.setState({ values: newValues });
    }
    else if (author) {
      const newAuthor = {
        ...values.authors,
        [fieldName]: val,
      };
      const newValues = {
        ...values,
        authors: newAuthor,
      };
      this.setState({ values: newValues })
    }
  }; //TODO: Fix this nonsense and maybe make inputs like in login, register and account settings!

  onReset = () => {
    this.onModalClose();

    const { book } = this.state;

    this.setState({
      values: book,
      open: false,
    })
  };

  onSubmit = () => {
    this.onModalClose();

    const { values } = this.state;
    this.props.changeBook(values);
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
    const { values, modalProps } = this.state;

    return (
      <div>
        <div>
          <Form className="form">
            <div>
               <label className="label">
                 Title:
               </label>
               <input
                type="text"
                className="text"
                placeholder="Enter Title"
                value={values.title}
                onChange={e => this.onValueChange(e.target.value, 'title')}
              />
            </div>
            <div>
              <label className="label">
                Author Name:
              </label>
              <input
                type="text"
                className="text"
                placeholder="Enter Author's Name"
                value={values.authors && values.authors.name}
                onChange={e => this.onValueChange(e.target.value, 'name', true)}
              />
            </div>

            <div>
              <label className="label">
                Downloads:
              </label>
              <input
                type="number"
                className="text"
                placeholder="Enter Download Count"
                value={values.download_count}
                onChange={e => this.onValueChange(e.target.value, 'download_count')}
              />
            </div>

            <div>
              <label className="label">
                Languages:
              </label>
              <input
                type="text"
                className="text"
                placeholder="Enter Language"
                value={values.languages}
                onChange={e => this.onValueChange(e.target.value, 'languages')}
              />
            </div>

            <div>
              <label className="label">
                Bookshelves:
              </label>
              <input
                type="text"
                className="text"
                placeholder="Enter Bookshelves"
                value={values.bookshelves}
                onChange={e => this.onValueChange(e.target.value, 'bookshelves')}
              />
            </div>

            <div>
              <label className="label">
                Media Type:
              </label>
              <input
                type="text"
                className="text"
                placeholder="Enter Media Type"
                value={values.media_type}
                onChange={e => this.onValueChange(e.target.value, 'media_type')}
              />
            </div>
         </Form>
        </div>
        <div>
          <Button content="Submit" className="submit" onClick={e => this.onModalOpen(e, 'Submit', titleSubmit, this.onSubmit)} />
          <Button content="Reset" className="reset" onClick={e => this.onModalOpen(e, 'Reset', titleReset, this.onReset)} />
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

export default BookForm;

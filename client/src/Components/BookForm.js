import React from 'react';
import Modals from './Modals'
import { Button, Form } from 'semantic-ui-react'

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      book: {},
      open: false,
      title: '',
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
    const { book } = this.state;

    this.setState({
      values: book,
      open: false,
    })
  };

  onSubmit = () => {
    const { values } = this.state;
    this.props.changeBook(values);
  };

  onModal = () => {
    const { open } = this.state;

    this.setState({
      open: !open,
    })
  };

  render () {
    const { values, open } = this.state;

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
        <div className="buttons-form">
          <Button content="Submit" className="submit form-buttons" onClick={() => this.onSubmit()} />
          <Button content="Reset" className="reset form-buttons" onClick={() => this.onModal()} />
        </div>
        <Modals
          open={open}
          onModal={this.onModal}
          onReset={this.onReset}
          title={'Are you sure you want to reset the book?'}
        >
        </Modals>
      </div>
   );
  }
}

export default BookForm;

import React from 'react';
import BookForm from './BookForm';
import BookList from './BookList';
import Modals from './Modals'
import { Header, Button } from 'semantic-ui-react';
import { dataApiGet, booksApiPost } from '../API/API';
import { NotificationManager } from 'react-notifications';
import { timeout } from '../Constants/Constants';
import { connect } from "react-redux";

const titleBook = 'Add a new Book!';
const titleSubject = 'Add a new Subject!';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      subjects: [],
      filtered: [],
      book: undefined,
      modalProps: {
        title: '',
        content: '',
        onFunction: undefined,
        open: false
      }
    };
  }

  componentWillMount() {
    this.loadDataFromAPI();
  }

  loadDataFromAPI = () => {
    dataApiGet(this.props.logged_user.id).then(data => {
      this.setState({
        books: data.books,
        filtered: data.books,
        subjects: data.subjects,
      })
    });
  };

  addBook = () => {
    let id = this.props.logged_user.id;
    let book = {
      title: "Labas",
      subject: "Science",
      language: "Sw",
      pageNumber: "11",
      plot: "Pgl!!!!"
    };

    fetch('/api/dataAddBook', {
      method: 'POST',
      body: JSON.stringify({ book, id }),
      headers: {"Content-Type": "application/json"}})
      .then( res => res.json())
      .then(data => {
        this.setState({
          books: data,
          filtered: data,
          book: undefined
        })
      })
      .catch(() => {
        NotificationManager.error('Something went wrong. Please try again', '', timeout);
      });
    this.onModalClose();
  };


  handleSubjectClick = (subject) => {
    const filtered = this.state.books.filter(x  => x.subject.includes(subject));

    this.setState({
      filtered,
      book: undefined
    });
  };

  handleSubjectReset = () => {
    const { books } = this.state;
    
    this.setState({
      filtered: books,
      book: undefined
    });
  };

  openBook = book => {
    this.setState({
      book: book
    });
  };

  changeBook = book => {
    const id = this.props.logged_user.id;
    booksApiPost( book, id ).then(books => {
      NotificationManager.success('The Book was successfully updated', '', timeout);
      this.setState({
        books,
        filtered: books,
        book: undefined
      });
    });
  };

  onModalClose = () => {
    this.setState({
      modalProps: {
        open: false
      }
    })
  };

  onModalOpen = (e, content, title, onFunction) => {
    e.preventDefault();
    const { modalProps } = this.state;

    const newModalProps = { //TODO: Get to another function that returns straight to setState!
      ...modalProps,
      open: true,
      content: content,
      title: title,
      onFunction: onFunction
    };

    this.setState({
      modalProps: newModalProps
    })
  };

  render() {
    const {
      subjects,
      filtered,
      book,
      modalProps
    } = this.state;

    return (
      <div className="app">
        <Header style={{ display: "grid" }}>
          <Button
            content="Add Book"
            className="add_book"
            onClick={e => this.onModalOpen(e, 'Submit', titleBook, this.addBook)}
          />
          <div className="subject-title">
            <span onClick={() => this.handleSubjectReset()}>All Subjects:</span>
          </div>
          <div className="subject">
            <span onClick={() => this.handleSubjectClick(subjects[0].name)}>{ subjects[0] && subjects[0].name }</span>
          </div>
          <div className="subject">
            <span onClick={() => this.handleSubjectClick(subjects[1].name)}>{ subjects[1] && subjects[1].name }</span>
          </div>
        </Header>
        <BookList filtered = { filtered } openBook={ this.openBook } />
        { book &&
          <BookForm book={ book } changeBook={ this.changeBook } />}
        <Modals
          modalProps={modalProps}
          onClose={() => this.onModalClose()}
        >
        </Modals>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged_user: state.state.logged_user,
});

export default connect(mapStateToProps)(Main);

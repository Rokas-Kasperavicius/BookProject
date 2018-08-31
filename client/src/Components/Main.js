import React from 'react';
import { Header } from 'semantic-ui-react'
import BookForm from './BookForm';
import BookList from './BookList'
import { booksApi, booksApiPost, subjectsApi } from '../API/API';
import { connect } from 'react-redux';

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      books: [],
      subjects: [],
      filtered: [],
      bookOpened: false,
      initialBook: undefined,

      customers: [],
    };
  }

  componentWillMount() {
    booksApi().then(books => {
      this.setState({
        books,
        filtered: books,
      })
    });

    subjectsApi().then(subjects => {
      this.setState({
        subjects,
      })
    });
  }

  handleSubjectClick(subject) {
    const filtered = this.state.books.filter(x  => x.subjects.includes(subject));

    this.setState({ filtered, bookOpened: false, initialBook: undefined, });
  }

  handleSubjectReset(){
    const { books } = this.state;

    this.setState({ filtered: books, bookOpened: false, initialBook: undefined });
  }

  openBook = (book) => {
    const filtered = this.filterBook(book);

    this.setState({ bookOpened: true, initialBook: filtered });
  };

  changeBook = (newValues) => {
    const { books } = this.state;

    for (let i = 0; i < books.length; i++) {
      if(books[i].id === newValues.id){
        books[i] = newValues;
        this.setState({ books });
        this.handleSubjectReset();
        break;
      }
    }
    booksApiPost(books);
  };

  filterBook = (book) => {
    const {
       title,
       download_count,
       bookshelves,
       media_type,
       languages,
       id,
       authors,
       subjects,
     } = book;

    return {
      title,
      download_count,
      languages,
      bookshelves,
      media_type,
      id,
      authors,
      subjects,
    };
  };

  render() {
    const { subjects, filtered, initialBook, bookOpened } = this.state;

    return (
      <div className="App">
        <Header className="App-header">
          <h3 className="title">Choose your favourite subject!</h3>
          <div className="all">
            <span onClick={() => this.handleSubjectReset()}>All Subjects:</span>
          </div>
          <div className="subjects">
            <span onClick={() => this.handleSubjectClick(subjects[0].name)}>{subjects[0] && subjects[0].name}</span>
          </div>
          <div className="subjects">
            <span onClick={() => this.handleSubjectClick(subjects[1].name)}>{subjects[1] && subjects[1].name}</span>
          </div>
        </Header>
        <BookList filtered = { filtered } openBook={this.openBook} />
        {bookOpened &&
          <BookForm book={initialBook} changeBook={this.changeBook} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { logged_user: state.state.logged_user };
};

export default connect(mapStateToProps)(Main);

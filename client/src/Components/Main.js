import React from 'react';
import BookForm from './BookForm';
import BookList from './BookList';
import { Header } from 'semantic-ui-react';
import { booksApi, booksApiPost, subjectsApi } from '../API/API';

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      books: [],
      subjects: [],
      filtered: [],
      book: undefined,
    };
  }

  componentWillMount() {
    this.loadDataFromAPI();
  }

  loadDataFromAPI = () => {
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
  };


  handleSubjectClick = (subject) => {
    const filtered = this.state.books.filter(x  => x.subject.includes(subject));

    this.setState({ filtered, book: undefined, });
  };

  handleSubjectReset = () => {
    const { books } = this.state;

    this.setState({ filtered: books, book: undefined });
  };

  openBook = (book) => {
    this.setState({ book: book });
  };

  changeBook = (book) => {
    booksApiPost(book).then(books => {
      console.log('Done');
      this.setState({
        books,
        filtered: books,
        book: undefined,
      });
    });
  };
  // TODO: Because of too many submits everything breaks!!!
  render() {
    const { subjects, filtered, book } = this.state;

    return (
      <div className="app">
        <Header>
          <h3 className="title">Choose your favourite subject!</h3>
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
      </div>
    );
  }
}


export default (Main);

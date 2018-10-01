import React from 'react';
import BookForm from './BookForm';
import BookList from './BookList';
import { Header } from 'semantic-ui-react';
import { dataApiGet, booksApiPost } from '../API/API';
import { NotificationManager } from 'react-notifications';
import { timeout } from '../Constants/Constants';
import { connect } from "react-redux";

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

  componentDidMount() {
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
    const id = this.props.logged_user.id;
    booksApiPost( book, id ).then(books => {
      NotificationManager.success('The Book was successfully updated', '', timeout);
      this.setState({
        books,
        filtered: books,
        book: undefined,
      });
    });
  };

  render() {
    const { subjects, filtered, book } = this.state;

    return (
      <div className="app">
        <Header style={{ display: "grid" }}>
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

const mapStateToProps = state => ({
  logged_user: state.state.logged_user,
});

export default connect(mapStateToProps)(Main);

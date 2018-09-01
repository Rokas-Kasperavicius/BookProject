import React from 'react';

class BookList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      books: [],
    }
  }

  componentWillMount(){
    const { filtered } = this.props;
    this.setState({
      books: filtered,
    })
  }
  componentWillReceiveProps(nextProps){
    const { filtered } = nextProps;
    this.setState({
      books: filtered,
    })
  }

render(){
 const { books } = this.state;

 return(
   <ol className="book-list">
     {
       books.map(filter => {
         return <li className="book" key={filter.id}>
             <span onClick={() => this.props.openBook(filter)}>{filter.title}</span>
         </li>;
       })
     }
   </ol>
 );
}

}

export default BookList;

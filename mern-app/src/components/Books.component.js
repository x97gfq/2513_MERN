import React, { Component } from 'react';  
import axios from 'axios';  
import Table from './Table';  
  
export default class Booklist extends Component {  
  
  constructor(props) {  
      super(props);  
      this.state = {books: [], showForm: false, showAddButton: true, book: null };  
    }  



    componentDidMount(){  
      this.GetBooks();
    }  

    tabRow(){  
      return this.state.books.map(function(object, i){  
          return <Table obj={object} key={i} onEditClick={this.EditBook}/>;  
      }, this);  
    } 

    GetBooks = () => {
      axios.get('http://localhost:8080/book')  
        .then(response => {  
          this.setState({ books: response.data });  
        })  
        .catch(function (error) {  
          console.log(error);  
        })  
    }

    AddNewBook= () => {  
      let newBook = { _id: null, isbn: '', title: '', author: '', description: '', published_year: '' }
      this.setState({ book: newBook, showForm: true, showAddButton: false }); 
    } 

    CancelBook = () => {
      let newBook = { _id: '', isbn: '', title: '', author: '', description: '', published_year: '' }
      this.setState({ book: newBook, showForm: false, showAddButton: true })
    }
  
    SaveBook = () => {
      if (this.state.book._id !== null) {

        axios.put('http://localhost:8080/book/' + this.state.book._id, this.state.book)  
        .then(response => {  
          this.GetBooks();  
          this.CancelBook();
        })  
        .catch(function (error) {  
          console.log(error);  
        })  

      } else {

        axios.post('http://localhost:8080/book/', this.state.book)  
        .then(response => { 
          this.GetBooks();  
          this.CancelBook();
        })  
        .catch(function (error) {  
          console.log(error);  
        })  

      }
    }

    EditBook = (book) => {
      this.setState({ book: book, showForm: true, showAddButton: false })
    }

    UpdateValue = (val, propName) => {
      let book = this.state.book;
      switch(propName) {
        case 'isbn':
          book.isbn = val;
          break;
        case 'title':
          book.title = val;
          break;
        case 'author':
          book.author = val;
          break;
        case 'published_year':
          book.published_year = val;
          break;
      }
      this.setState({ book: book })
    }

    render() {  
      let form;
      if (this.state.showForm) {
        form = <div>
            <h4>Book:</h4>
            <div>
                <label><strong>ISBN:</strong></label>
                <input type="text" className="form-control" id="isbn" name="isbn" value={this.state.book.isbn} 
                  onChange={e => { this.UpdateValue(e.target.value,'isbn')}}/>
            </div>
            <div>
                <label><strong>Title:</strong></label>
                <input type="text" className="form-control" id="title" name="title" defaultValue={this.state.book.title}
                  onChange={e => { this.UpdateValue(e.target.value,'title')}}/>
            </div>
            <div>
                <label><strong>Author:</strong></label>
                <input type="text" className="form-control" id="author" name="author" defaultValue={this.state.book.author}
                  onChange={e => { this.UpdateValue(e.target.value,'author')}}/>
            </div>
            <div>
                <label><strong>Year:</strong></label>
                <input type="text" className="form-control" id="published_year" name="published_year" defaultValue={this.state.book.published_year}
                  onChange={e => { this.UpdateValue(e.target.value,'published_year')}}/>
            </div>
            <div>
                <br/>
                <button type="button" onClick={this.SaveBook} className="btn btn-success">Save</button>
                <button type="button" onClick={this.CancelBook} className="btn btn-danger">Cancel</button>
            </div>
        </div>;
      } else {
        //Don't Show Form
      }
      let addNewButton;
      if (this.state.showAddButton) {
        addNewButton = <button type="button" onClick={this.AddNewBook} className="btn btn-success">Add Book</button>
      }
      return (  
        <div>
          <h4 align="center">Book List</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             { this.tabRow() }
            </tbody>
          </table>
          <br/>
          { addNewButton }
          { form }
        </div>
      );  
    }  
  }
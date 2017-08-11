import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

const shelves = {
  currentlyReading: {title: 'Currently Reading'},
  wantToRead: {title: 'Want to Read'},
  read: {title: "Read"},
}

class Bookshelf extends Component {
  state = {
    loading: false
  }

  componentDidMount = () => {
    if (this.props.books.length === 0) {
      this.setState({loading: true})
      BooksAPI.getAll().then((books) =>{
        this.props.updateBooks(books)
        this.setState({loading: false})
      })
    }
  }
  
  render () {
    const {books, onChangeShelf} = this.props
    const {loading} = this.state

    let sortedBooks = !loading && books.reduce((accumulator, value, index) => {
      if (!accumulator[value.shelf]) {
        accumulator[value.shelf] = []
      }
      accumulator[value.shelf].push(value)
      return accumulator
    }, {})

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1> My Reads {loading && '(loading'}</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {Object.keys(shelves).map((shelf) => (
              <Shelf 
                title={shelves[shelf].title}
                key={shelf}
                books={sortedBooks[shelf]}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </div>
        </div>
        <div className='open-search'>
            <Link to='/search'>Add Book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelf
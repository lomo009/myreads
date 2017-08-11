import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  state = {
    query: '',
    loading: false,
    results: []
  }

  componentDidMount () {
    if (this.props.books.length === 0) {
      this.setState({loading: true})
      BooksAPI.getAll().then((books) => {
        this.props.updateBooks(books)
        this.setState({loading: false})
      })
    }
  }

  updateQuery = (query) => {
    if (!query) {
      this.setState({query: query, results: [], loading: false})
      // this.props.updateBooks([])
      this.search.cancel()
      return
    }
    this.setState({loading: true, query: query})

    this.search(query)
  }

  search = _.debounce( (query) => {
    BooksAPI.search(query.trim(), 20).then((response) => {
      // console.log('search resulst', response)
      if (!response.error && this.state.query !== '') {
        // this.props.updateBooks(response)
        this.setState({results: response})
      } else {
        this.setState({results: []})
        // this.props.updateBooks([])
      }
      this.setState({loading: false})
    })
  }, 250 )

  render () {
    const myBooks = this.props.books
    const {query, loading, results} = this.state

    const books = results.map((book) => {
      let myBook = myBooks.find(b => b.id === book.id)
      if (myBook) {
        book.shelf = myBook.shelf
      } else {
        book.shelf = 'none'
      }
      return book
    })

    books.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/' >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author" />
          </div>
          <span className='loading' >{loading && 'loading'}</span>
        </div>
        <div className="search-books-results">
          {books.length === 0 && query && !loading && <p>No results found</p>}
          <ol className="books-grid">
            {books.length > 0 && books.map((book) => (
              <li key={book.id} >
                <Book info={book} onChangeShelf={this.props.onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
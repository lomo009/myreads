import React from 'react'
import Book from './Book'

const Shelf = (props) => (
  <div className='bookshelf'>
    <h2 className='bookshelf-title'>{props.title}</h2>
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        {props.books && props.books.map((book) => (
          <li key={book.id}>
            <Book 
              info={book}
              onChangeShelf={props.onChangeShelf} 
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
)

export default Shelf
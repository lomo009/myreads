import React from 'react'

const Book = (props) => {
  let thumb = props.info.imageLinks ? props.info.imageLinks.thumbnail : require('./assets/no_cover_thumb.gif')
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${thumb}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }} >
        </div>
        <div className="book-shelf-changer">
          <select
            value={props.info.shelf}
            onChange={(event) => props.onChangeShelf(event, props.info)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.info.title}</div>
      <div className="book-authors">{props.info.authors && props.info.authors[0]}</div>
    </div>
  )
}

export default Book
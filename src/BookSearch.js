import React, { Component } from 'react'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
class BookSearch extends Component {
    static propTypes = {
        bookAll: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        onUpdateShelf: PropTypes.func.isRequired,
    };
    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }
    render() {
        const { query } = this.state
        const { bookAll, onSearchBook, onUpdateShelf } = this.props
        const showingBooks = query === ''
            ? bookAll
            : bookAll.filter((c) => (
                c.title.toLowerCase().includes(query.toLowerCase())
            ))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(event) => onSearchBook(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            showingBooks.map((book) => (
                                <BookItem key={book.id} book={book} onUpdateShelf={onUpdateShelf} />
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
// BookSearch.proptypes = {
//     bookAll: PropTypes.array.isRequired,
//     onSearchBook: PropTypes.func.isRequired,
//     onUpdateShelf: PropTypes.func.isRequired,
// }

export default BookSearch
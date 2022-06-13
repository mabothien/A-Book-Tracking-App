import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { groupBy } from 'lodash-es'
import BookWrapper from './BookWrapper';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    bookAll: [],
    showSearchPage: false
  }
  async componentDidMount() {
    await this.getAll()
  }
  getAll = () => {
    BooksAPI.getAll().then((res) => {
      this.setState((books, bookAll) => ({
        bookAll: res,
        books: Object.entries(groupBy(res, 'shelf')).map((book) => ({
          category: book[0],
          data: book[1]
        }))
      }))
    })
  }
  searchBook = (query) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      BooksAPI.search(query)
        .then((res) => {
          if (!res) {
            this.getAll()
          } else if (!Array.isArray(res)) {
            this.setState((currentState) => ({
              bookAll: [],
            }))
          } else {
            const { bookAll } = this.state
            let bookSearchList = Object.assign([], res);
            const itemHash = bookAll.reduce((a, c) => {
              a[`${c.id}`] = c
              return a
            }, {})

            const newArray = bookSearchList.reduce((a, c) => {
              let item = { shelf: '' }
              if (!!itemHash[`${c.id}`]) {
                item = itemHash[`${c.id}`]
              } else {
                item = { shelf: '' }
              }
              return [...a, { ...c, ...item }]
            }, [])
            this.setState({ bookAll: newArray });
          }
        })
    }, 300);
  }
  updateBook = (item, shelf) => {
    debugger
    BooksAPI.update(item, shelf)
      .then((res) => {
        this.getAll()
      })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookWrapper books={this.state.books} onUpdateShelf={this.updateBook} />
        )} />
        <Route exact path='/search' render={() => (
          <BookSearch bookAll={this.state.bookAll} onSearchBook={this.searchBook} onUpdateShelf={this.updateBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp

import React, { Component } from 'react'
import { get } from 'lodash-es'
class BookItem extends Component {
    state = {
        selected: '',
        options: [
            {
                label: "Move to...",
                value: "move",
            },
            {
                label: "Currently Reading",
                value: "currentlyReading",
            },
            {
                label: "Want to Read",
                value: "wantToRead",
            },
            {
                label: "Read",
                value: "read",
            },
            {
                label: "None",
                value: "",
            },
        ]
    }
    componentDidMount() {
        this.setState({ selected: this.props.book.shelf ? this.props.book.shelf : '' });
    }
    onUpdateBook = (book, value) => {
        this.setState({ selected: value }, () => {
            this.props.onUpdateShelf(book, this.state.selected)
        });
    }
    render() {
        const { book } = this.props
        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${get(book, 'imageLinks.thumbnail', '')}")` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.onUpdateBook(book, e.target.value)} value={this.state.selected}>
                                {this.state.options.map((option, index) => (
                                    <option key={index} value={option.value} disabled={index === 0}
                                        className={book.shelf === option.value ? 'selected' : ''}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}
export default BookItem
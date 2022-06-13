import React, { Component } from "react";
import SearchButton from "./SearchButton";
import PropTypes from "prop-types";
import BookList from "./BookList";
class BookWrapper extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired,
	};
	render() {
		const { books, onUpdateShelf } = this.props;
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{
							books.map((item) => <BookList key={item.category} bookWithCategory={item} onUpdateShelf={onUpdateShelf} />)
						}
					</div>
				</div>
				<SearchButton />
			</div>
		);
	}
}

export default BookWrapper;
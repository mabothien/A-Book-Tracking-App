import React, { Component } from "react";
import BookListCategory from "./BookListCategory";
import BookItem from "./BookItem";
import PropTypes from "prop-types";
class BookList extends Component {
	static propTypes = {
		bookWithCategory: PropTypes.object.isRequired,
		onUpdateShelf: PropTypes.func.isRequired,
	};
	render() {
		const { bookWithCategory, onUpdateShelf } = this.props;
		return (
			<div className="bookshelf">
				<BookListCategory category={bookWithCategory.category} />
				<div className="bookshelf-books">
					<ol className="books-grid">
						{
							bookWithCategory.data.map((book) => (
								<BookItem key={book.id} book={book} onUpdateShelf={onUpdateShelf} />
							))
						}
					</ol>
				</div>
			</div>
		);
	}
}

export default BookList;
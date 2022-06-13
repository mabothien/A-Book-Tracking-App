import React from "react";
import { Link } from "react-router-dom";

const SearchButton = () => {
	return (
		<div className="open-search">
			<Link to={"/search"} title={"Add a book"}>
				<button>Add a book</button>
			</Link>
		</div>
	);
};
export default SearchButton;
import React, { Fragment, useState, useRef, useCallback } from "react";
import { useFetchBooks } from "./CustomHooks/useFetchBooks";

const InfiniteScrolling = () => {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);

	const handleChange = (event) => {
		setQuery(event.target.value);
		setPageNumber(1);
	};

	const { isLoading, hasError, books, hasMore } = useFetchBooks(
		query,
		pageNumber
	);

	const observer = useRef();
	const lastElementVisible = useCallback(
		(node) => {
			if (isLoading) return;

			// console.log("NODE", node);
			// console.log("observer.current", observer.current);

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					console.log("visible");
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});

			if (node) observer.current.observe(node);
		},
		[hasMore, isLoading]
	);

	return (
		<Fragment>
			<input type="text" value={query} onChange={handleChange} />

			{books.map((items, index) => {
				if (books.length - 1 === index) {
					return (
						<div ref={lastElementVisible} key={`${items} + ${items}`}>
							{items}
						</div>
					);
				} else {
					return <div key={`${items} + ${items}`}>{items}</div>;
				}
			})}
			{isLoading && <div>Loading....</div>}
			{hasError && <div>Error</div>}
		</Fragment>
	);
};

export default InfiniteScrolling;

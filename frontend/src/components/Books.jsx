import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
	return (
		<Link to={`/books/${id}`} className="m-4 w-full sm:w-64">
			<div className="border p-4 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
				<img className="w-full h-40 object-cover rounded-t-lg" src={`http://localhost:8000/${image}`} alt={title} />
				<div className="p-4">
					<h2 className="text-lg font-bold mb-2">
						{title} ({year})
					</h2>
					<p className="text-gray-500 mb-2">{author}</p>
					<p className="text-sm text-gray-400">
						<span className="font-bold text-gray-600">Publisher: </span>
						{publisher}
					</p>
				</div>
			</div>
		</Link>
	);
}

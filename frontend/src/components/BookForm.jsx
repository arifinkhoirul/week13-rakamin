import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";
import Modal from "react-modal";

export default function BookForm({ bookData }) {
	const [selectedImage, setSelectedImage] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		if (!selectedImage) {
			setModalMessage("Please select image");
			setIsOpen(true);
		}
		const formData = new FormData(event.target);
		if (bookData) {
			try {
				await editBook(
					bookData.id,
					formData.get("title"),
					formData.get("author"),
					formData.get("publisher"),
					parseInt(formData.get("year")),
					parseInt(formData.get("pages"))
				);
				setModalMessage("Book edited successfully");
				setIsOpen(true);
			} catch (error) {
				setModalMessage(error.response.data.message || "Something went wrong");
				setIsOpen(true);
			}
			return;
		}
		try {
			await createBook(formData);
			event.target.reset();
			setModalMessage("Book created successfully");
			setIsOpen(true);
			setSelectedImage("");
		} catch (error) {
			setModalMessage(error.response.data.message || "Something went wrong");
			setIsOpen(true);
		}
	}

	useEffect(() => {
		if (bookData?.image) {
			setSelectedImage(`http://localhost:8000/${bookData?.image}`);
		}
	}, [bookData]);

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className="flex items-center justify-center flex-col mt-5">
			<h1 className="text-2xl font-bold text-black">{bookData ? "Edit Book" : "Create Book"}</h1>
			<div className="w-1/2">
				<form onSubmit={handleSubmit} className="mt-4 mb-4 border p-5 rounded-lg shadow-lg">
					<div className="mb-4">
						<label className="block text-red-700">Title</label>
						<input
							name="title"
							required
							defaultValue={bookData?.title}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-red-700">Author</label>
						<input
							name="author"
							required
							defaultValue={bookData?.author}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-red-700">Publisher</label>
						<input
							name="publisher"
							required
							defaultValue={bookData?.publisher}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-red-700">Year</label>
						<input
							name="year"
							type="number"
							required
							defaultValue={bookData?.year}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-red-700">Pages</label>
						<input
							name="pages"
							type="number"
							required
							defaultValue={bookData?.pages}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
					{selectedImage && (
						<img className="w-16 h-16 object-cover rounded-full mb-4" src={selectedImage} alt="Selected Image" />
					)}
					{!bookData?.image && (
						<div className="mb-4">
							<label className="block text-red-700">Image</label>
							<input
								name="image"
								type="file"
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files[0];
									setSelectedImage(URL.createObjectURL(file));
								}}
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
					)}
					<button
						type="submit"
						className="mt-3 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
					>
						{bookData ? "Edit Book" : "Create Book"}
					</button>
					<button
						type="button"
						onClick={() => window.history.back()}
						className="ml-2 mt-3 px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700"
					>
						Cancel
					</button>
				</form>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					contentLabel="Message Modal"
					className="absolute inset-0 flex items-center justify-center outline-none"
					style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
				>
					<div className="bg-white rounded p-5 text-center">
						<h2 className="text-xl font-bold mb-4">{modalMessage}</h2>
						<button
							onClick={closeModal}
							className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
						>
							Close
						</button>
					</div>
				</Modal>
			</div>
		</div>
	);
}

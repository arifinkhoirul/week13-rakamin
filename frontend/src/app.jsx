import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookDetails from "./pages/BooksDetail";
import EditBookPage from "./pages/Editbook";
import Homepage from "./pages/Homepage";
import NewBookPage from "./pages/NewBooks";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoutes";

function App() {
	return (
		<div className="min-h-screen">
			<Router>
				<Navbar />
				<Routes>
					<Route path={"/"} element={<Homepage />} />
					<Route path={"/register"} element={<Register />} />
					<Route
						path={"/newbook"}
						element={
							<PrivateRoute>
								<NewBookPage />
							</PrivateRoute>
						}
					/>
					<Route path={"/books/:id"} element={<BookDetails />} />
					<Route
						path={"/editbook/:id"}
						element={
							<PrivateRoute>
								<EditBookPage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;

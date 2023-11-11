import { useEffect, useState } from "react";

export default function PrivateRoute({ children, ...rest }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(isAuthenticated);
		if (token) {
			setIsAuthenticated(true);
			// navigate("/");
		} else {
			setIsAuthenticated(false);
			// navigate("/");
		}
	}, []);

	return <div>{isAuthenticated ? children : <h1>Not Authenticated</h1>}</div>;
}

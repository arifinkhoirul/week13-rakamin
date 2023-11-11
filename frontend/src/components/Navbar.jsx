import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		if (token) {
			setIsLogin(true);
		}
	}, [window.localStorage.getItem("token")]);

	return (
		<nav className="flex items-center justify-between w-full h-16 px-10 bg-[#61A3BA] text-white">
			<Logo />
			<Menu isLogin={isLogin} setIsOpen={setIsOpen} />
			{isOpen && <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />}
		</nav>
	);
};

const Logo = () => (
	<Link to="/">
		<div className="flex items-center cursor-pointer">
			<h1 className="text-xl font-bold">BookApp</h1>
		</div>
	</Link>
);

const Menu = ({ isLogin, setIsOpen }) => (
	<div className="flex items-center">
		{isLogin && (
			<Link to="/newbook">
				<button className="px-4 py-2 mr-4 text-black bg-[#DDF2FD] rounded hover:bg-blue-100">Create New Book</button>
			</Link>
		)}
		{!isLogin ? (
			<button onClick={() => setIsOpen(true)} className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-[#427D9D]">
				Login
			</button>
		) : (
			<LogoutButton />
		)}
	</div>
);

const LogoutButton = () => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				window.localStorage.removeItem("token");
				setIsLogin(false);
				navigate("/");
			}}
			className="px-4 py-2 text-white bg-blue-600 hover:bg-[#427D9D] rounded"
		>
			Logout
		</button>
	);
};
{
	isOpen && (
		<>
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="w-1/3 p-5 bg-white rounded shadow-lg relative">
					<button
						onClick={() => setIsOpen(false)}
						className="absolute right-12 top-10 text-xl font-bold text-gray-500 hover:text-gray-700"
					>
						X
					</button>
					<h2 className="pl-6 pt-5 text-xl font-bold text-black">Login</h2>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							try {
								const token = await loginUser(e.target.email.value, e.target.password.value);
								window.localStorage.setItem("token", token.token);
								navigate("/");
								setIsOpen(false);
							} catch (err) {
								alert(err.message);
							}
						}}
					>
						<div className="px-6">
							<div>
								<label className="block">Email</label>
								<input
									name="email"
									type="email"
									placeholder="Enter your email address"
									className="w-full px-3 py-2 border rounded text-slate-700"
								/>
							</div>
							<div>
								<label className="block">Password</label>
								<input
									type="password"
									name="password"
									placeholder="Enter your password"
									className="w-full px-3 py-2 border rounded text-slate-700"
								/>
							</div>
						</div>
						<div className="px-6 py-4 flex justify-between items-center">
							<button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">
								Login
							</button>
							<Link to="/register" onClick={() => setIsOpen(false)}>
								<button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
									Doesn't Have Account? Click here
								</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Navbar;

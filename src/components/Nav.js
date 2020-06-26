import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
	return (
		<ul className="nav ">
			{props.isLoggedIn ? (
				<>
					<li className="nav-item">
						<Link className="nav-link active myContainer" to="/">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link
							className="nav-link active myContainer"
							to="/banane"
						>
							BANANE
						</Link>
					</li>
					<li className="nav-item">
						<button className="nav-link" onClick={props.onLogout}>
							Logout
						</button>
					</li>
				</>
			) : (
				<>
					<li className="nav-item">
						<Link className="nav-link" to="/signin">
							Sign in
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/signup">
							Sign up
						</Link>
					</li>
				</>
			)}
		</ul>
	);
}

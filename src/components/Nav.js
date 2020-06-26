import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";

class Nav extends React.Component {
	render() {
		const {logout, isLoggedIn } = this.props;

		return (
			<nav class="navbar navbar-light">
				{isLoggedIn ? (
					<>
						<Link to={"/profile"} class="btn" type="button">
						<i class="fas fa-home">Profile</i>
					</Link>
					<Link to={"/home"} class="btn" type="button">
						<i class="fas fa-home">Home</i>
					</Link>
					<Link to={"/connections"} class="btn" type="button">
						<i class="fas fa-home">Connections</i>
					</Link>
						<i
							class="fas fa-sign-out-alt btn btn-outline-danger"
							type="button"
							onClick={logout}
						>Log out</i>
					</>
				) : (
					<>
						<Link
							to="/signin"
							class="btn"
							type="button"
						>
							{" "}
							<i class="fas fa-sign-in-alt">Sign In</i>
						</Link>
						<br />
						<Link
							to="/signup"
							class="btn"
							type="button"
						>
							{" "}
							<i class="fas fa-user-plus"> Sign Up</i>
						</Link>
					</>
				)}
			</nav>
		);
	}
}

export default withAuth(Nav);

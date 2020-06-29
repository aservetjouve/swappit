import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";

// Style
import "../style/nav.css";

class Nav extends React.Component {
	render() {
		const { logout, isLoggedIn } = this.props;

		return (
			<>
				{isLoggedIn ? (
					<nav class="navbar__private">
						<Link to={"/profile"} class="btn" type="button">
							<h6 class="fas fa-home">Profile</h6>
						</Link>
						<Link to={"/home"} class="btn" type="button">
							<h6 class="fas fa-home">Home</h6>
						</Link>
						<Link to={"/connections"} class="btn" type="button">
							<h6 class="fas fa-home">Connections</h6>
						</Link>
						<h6
							class="fas fa-sign-out-alt btn btn-outline-danger"
							type="button"
							onClick={logout}
						>
							Log out
						</h6>
					</nav>
				) : (
					<nav class="navbar">
						<Link to="/signin" class="navbar__btn
						navbar__btn--left" type="button">
							{" "}
							<h6 class="navbar__btn__title">Sign In</h6>
						</Link>
						<Link to="/signup" class="navbar__btn
						navbar__btn--right" type="button">
							{" "}
							<h6 class="navbar__btn__title"> Sign Up</h6>
						</Link>
					</nav>
				)}
			</>
		);
	}
}

export default withAuth(Nav);

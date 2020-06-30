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
					<>
					</>
				) : (
					<nav className="navbar">
						<Link to="/signin" className="navbar__btn
						navbar__btn--left" type="button">
							{" "}
							<h6 className="navbar__btn__title">Sign In</h6>
						</Link>
						<Link to="/signup" className="navbar__btn
						navbar__btn--right" type="button">
							{" "}
							<h6 className="navbar__btn__title"> Sign Up</h6>
						</Link>
					</nav>
				)}
			</>
		);
	}
}

export default withAuth(Nav);

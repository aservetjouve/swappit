import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/Auth";

function PublicRoute({ component: Component, isLoggedIn, ...rest }) {
	return (
		<Route
			{...rest}
			render={function (props) {
				if (isLoggedIn) return <Redirect to="/home" />;
				else if (!isLoggedIn) return <Component {...props} />;
			}}
		/>
	);
}

export default withAuth(PublicRoute);

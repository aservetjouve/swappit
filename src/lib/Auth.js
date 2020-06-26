import React, { Component } from "react";
import authService from "./auth-service"; // IMPORT functions for axios requests to API
const { Consumer, Provider } = React.createContext();

// HOC to create a Consumer
const withAuth = (WrappedComponent) => {
	return class extends Component {
		render() {
			return (
				<Consumer>
					{({ signin, signup, logout, user, isLoggedIn }) => {
						return (
							<WrappedComponent
								user={user}
								isLoggedIn={isLoggedIn}
								signin={signin}
								signup={signup}
								logout={logout}
								{...this.props}
							/>
						);
					}}
				</Consumer>
			);
		}
	};
};

// Provider
class AuthProvider extends React.Component {
	state = {
		// contains data about authentication
		isLoggedIn: false,
		user: null,
		isLoading: true,
	};

	componentDidMount() {
		authService
			.user() // returns info only if the user has a cookie
			.then((user) =>
				this.setState({
					isLoggedIn: true,
					user: user,
					isLoading: false,
				})
			)
			.catch((err) =>
				this.setState({
					isLoggedIn: false,
					user: null,
					isLoading: false,
				})
			);
	}

	signup = (firstName, lastName, location, email, password) => {
		return authService
			.signup({ firstName, lastName, location, email, password })
			.then((user) => this.setState({ isLoggedIn: true, user }));
		//.catch(err => console.log(err));
		// catch in Signup.js to show message
	};

	signin = (email, password) => {
		authService
			.signin({ email, password })
			.then((user) => this.setState({ isLoggedIn: true, user }))
			.catch((err) => console.log(err));
	};

	logout = () => {
		authService
			.logout()
			.then(() => this.setState({ isLoggedIn: false, user: null }))
			.catch((err) => console.log(err));
	};

	render() {
		const { isLoading, isLoggedIn, user } = this.state;
		const { signin, logout, signup } = this;

		return (
			<Provider
				value={{ isLoading, isLoggedIn, user, signin, logout, signup }}
			>
				{this.props.children}
			</Provider>
		);
		/*
      <Provider> `value={}` data will be available to all <Consumer> components 
    */
	}
}

export { withAuth, AuthProvider }; // to export multiple things we dont use default.

//      Consumer ,  Provider

import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";

import { Link } from "react-router-dom";


// Style 
import '../style/auth.css'

class Login extends Component {
	state = { email: "", password: "" };

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { email, password } = this.state;

		this.props.signin(email, password);
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { email, password } = this.state;

		return (
			<main className="signin__page">
			<Link to="/"><h1 className="auth__header">Swappit.</h1></Link>

				<form onSubmit={this.handleFormSubmit} className="auth__form auth__form--sign-in">
					<div className="auth__info-section auth__info-section__email">
						
						<input
							className="auth__info-section__input"
							type="email"
							name="email"
							value={email}
							onChange={this.handleChange}
						/>
						<label className="auth__info-section__label">
						<span className="auth__info-section__content">Email</span></label>
					</div>

					<div className="auth__info-section
					auth__info-section__password"
					>
						
						<input
							className="auth__info-section__input"
							type="password"
							name="password"
							value={password}
							onChange={this.handleChange}
						/>
						<label htmlFor="password" className="auth__info-section__label"><span className="auth__info-section__content">Password</span></label>
					</div>
					<div>
						<input
							className="auth__button"
							type="submit"
							value="LET'S SWAPP"
						/>
						<Link to='/signup' className="switch__button">
							<p>Oh! You meant Signup?</p>
						</Link>
					</div>
				</form>
			</main>
		);
	}
}

export default withAuth(Login);

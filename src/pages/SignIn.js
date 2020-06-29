import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";


// Style 
import '../style/sign-in.css'

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
			<main className="sign-in">
				<h1 className="sign-in__header">Swappit.</h1>

				<form onSubmit={this.handleFormSubmit} className="sign-in__form">
					<div class="sign-in__info-section sign-in__info-section__email">
						
						<input
							className="sign-in__info-section__input"
							type="email"
							name="email"
							value={email}
							onChange={this.handleChange}
						/>
						<label className="sign-in__info-section__label">
						<span className="sign-in__info-section__content">Email</span></label>
					</div>

					<div class="sign-in__info-section
					sign-in__info-section__password"
					>
						
						<input
							className="sign-in__info-section__input"
							type="password"
							name="password"
							value={password}
							onChange={this.handleChange}
						/>
						<label htmlFor="exampleInputPassword1" className="sign-in__info-section__label"><span className="sign-in__info-section__content">Password</span></label>
					</div>
					<div>
						<input
							className="sign-in__button"
							type="submit"
							value="LET'S SWAPP"
						/>
					</div>
				</form>
			</main>
		);
	}
}

export default withAuth(Login);

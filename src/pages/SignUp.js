import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";

import { Link } from "react-router-dom";

// Style 
import '../style/auth.css'

class Signup extends Component {
	state = {
        firstName: "", 
        lastName:"",
        location: "",
        email: "",
		password: "",
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		const {
			firstName,
			lastName,
			location,
            email,
            password
		} = this.state;

		this.props
			.signup(firstName, lastName, location, email, password)
			.then((res) => console.log(res))
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
    };
    
	render() {
		const {
            firstName,
            lastName,
            location,
            email,
			password
		} = this.state;
		return (
			<main className="signup__page">
				<Link to="/"><h1 className="auth__header">Swappit.</h1></Link>

				<form onSubmit={this.handleFormSubmit}
				className="auth__form">
				
					<div className="auth__info-section 
					auth__info-section__email">
						<input
							className="auth__info-section__input"
							type="text"
							name="firstName"
							value={firstName}
							onChange={this.handleChange}
						/>
						<label className="auth__info-section__label">
						<span className="auth__info-section__content">First Name</span></label>
					</div>
					
					<div className="auth__info-section 
					auth__info-section__email">
						<input
							className="auth__info-section__input"
							type="text"
							name="lastName"
							value={lastName}
							onChange={this.handleChange}
						/>
						<label className="auth__info-section__label">
						<span className="auth__info-section__content">Last Name</span></label>
					</div>

					<div className="auth__info-section">
						<select id="location" name="location" placeholder="Location" value={location} onChange={this.handleChange}
						className="auth__select">
                            <option value="Paris">Paris</option>
                            <option value="Berlin">Berlin</option>
                            <option value="Miami">Miami</option>
							<option value="Lisbon">Lisbon</option>
							<option value="Amsterdam">Amsterdam</option>
                        </select>
					</div>
					
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
					auth__info-section__password">
						
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
							value="Signup"
						/>
						<Link to='/signin' className="switch__button">
							<p>Oh! You meant Signin?</p>
						</Link>
					</div>
				</form>
			</main>
		);
	}
}

export default withAuth(Signup);

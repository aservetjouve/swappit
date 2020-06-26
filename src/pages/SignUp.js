import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";

class Signup extends Component {
	state = {
        firstName: "", 
        lastName:"",
        location: "",
        email: "",
		password: "",
		errorMessage: "",
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
			.catch((err) => {
				// FIX TO CHANGE DEPENDING ON ERROR MESSAGE
				this.setState({ errorMessage: "Email already taken" });
			});
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
			password,
			errorMessage,
		} = this.state;
		return (
			<div>
				<h1>Sign Up</h1>

				<form onSubmit={this.handleFormSubmit}>
					<div class="form-group">
						<label>First Name:</label>
						<input
							class="form-control"
							type="text"
							name="firstName"
							value={firstName}
							onChange={this.handleChange}
							placeholder="Your name here"
						/>
					</div>
					<div class="form-group">
						<label>Last Name:</label>
						<input
							class="form-control"
							type="text"
							name="lastName"
							value={lastName}
							onChange={this.handleChange}
							placeholder="Your name here"
						/>
					</div>
					<div class="form-group">
                        <label>Location</label><br/>
						<select id="location" name="location" placeholder="Location" value={location} onChange={this.handleChange}>
                            <option value="Paris">Paris</option>
                            <option value="Berlin">Berlin</option>
                            <option value="Miami">Miami</option>
                        </select>
					</div>
					<div class="form-group">
						<label>Email:</label>
						<input
							class="form-control"
							type="email"
							name="email"
							value={email}
							onChange={this.handleChange}
							placeholder="Your location here"
						/>
						<span>{errorMessage}</span>
					</div>
					<div class="form-group">
						<label>Password:</label>
						<input
							class="form-control"
							type="password"
							name="password"
							value={password}
							onChange={this.handleChange}
							placeholder="And your password here"
						/>
					</div>
					<div class="sign-btn">
						<input
							class="btn btn-primary"
							type="submit"
							value="Signup"
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default withAuth(Signup);

import React from "react";
import { withAuth } from "../lib/Auth";
import config from '../config';

import axios from "axios";
import { Link } from "react-router-dom";

export class AddItem extends React.Component {
			state = {
				item : [],
				loggedInUser: null,
			};

			getUser() {
				axios
					.get(`${config.API_URL}/auth/user`, {
						withCredentials: true,
					})
					.then((res) => {
						this.setState({
							loggedInUser: res.data,
                        });
                        console.log('USER IS ', this.loggedInUser)
					})
			}

			componentDidMount() {
				if (!this.state.loggedInUser) {
					this.getUser();
				}
			}

			handleChange = (event) => {
				const { name, value } = event.target;
				this.setState({ [name]: value });
			};

			handleAddItem = (event) => {
				event.preventDefault();
				let name = event.target.name.value;
				let type = event.target.type.value;
				let aspect = event.target.aspect.value;
				let swappableWith = event.target.swappableWith.value;

				axios
					.post(
						`${config.API_URL}/item/add`,
						{
							name: name,
							type: type,
							aspect: aspect,
                            swappableWith: swappableWith,
						},
						{ withCredentials: true }
					)
					.then((res) => {
						this.setState(
							{
								item: [...this.state.item, res.data],
							}, () => {
                                this.props.history.push('/home')
                            })
			
					})
			};

			render() {
				const { name, type, aspect, swappableWith } = this.state;
				return (
					<div>
						<h1>Let's add your item</h1>

						<form onSubmit={this.handleAddItem}>
							<div class="form-group">
								<label>Name of your object:</label>
								<input
									class="form-control"
									type="text"
									name="name"
									value={name}
									onChange={this.handleChange}
									placeholder="The name here"
                                    required
								/>
							</div>
							<div class="form-group">
								<label>Last Name:</label>
								<input
									class="form-control"
									type="text"
									name="type"
									value={type}
									onChange={this.handleChange}
									placeholder="The type"
                                    required
								/>
							</div>
							<div class="form-group">
								<label>To Swapp with</label>
								<br />
								<select
									id="swappableWith"
									name="swappableWith"
									placeholder="Location"
									value={swappableWith}
									onChange={this.handleChange}
                                    required
								>
									<option value="any">Anything</option>
									<option value="small">Small</option>
									<option value="medium">Medium</option>
									<option value="large">Large</option>
								</select>
							</div>
							<div class="form-group">
								<label>Email:</label>
								<input
									class="form-control"
									type="text"
									name="aspect"
									value={aspect}
									onChange={this.handleChange}
									placeholder="It's aspect"
                                    required
								/>
							</div>
							<div class="sign-btn">
								<input
									class="btn btn-primary"
									type="submit"
									value="Signup"
                                    to="/"
								/>
							</div>
						</form>
					</div>
				);
			}
		}

export default withAuth(AddItem);

import React from "react";
import { withAuth } from "../lib/Auth";
import config from '../config';

import axios from "axios";

// Style 
import '../style/add-item.css'

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

				let myImage = event.target.image.files[0]

				let uploadData = new FormData();
					uploadData.append('imageUrl', myImage)
				
				axios.post(`${config.API_URL}/upload`, uploadData)
					.then((res) => {
						
						let {secure_url} = res.data
						if (secure_url.length > 0){
							axios
							.post(
								`${config.API_URL}/item/add`,
								{
									name: name,
									type: type,
									aspect: aspect,
									swappableWith: swappableWith,
									image: secure_url
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
							}
						})
						

				
			};

			render() {
				const { name, type, aspect, swappableWith, image} = this.state;
				return (
					<main>
						<h1>Add your item</h1>

						<form onSubmit={this.handleAddItem} className="edit__form">
							<div>
							<h6 className="edit__section__title">The Name</h6>
								<input
									className="edit__input"
									type="text"
									name="name"
									value={name}
									onChange={this.handleChange}
                                    required
								/>
							</div>
							<div className="form-group">
								<h6 className="edit__section__title">The Size</h6>
								<select
									id="type"
									name="type"
                                    autoComplete='off'
									value={type}
                                    onChange={this.handleChange}
                                    className="edit__input"
								>
									<option value="small">Small | You can carry it in a bag</option>
									<option value="medium">Medium | You will need your two hands</option>
									<option value="large">Large | You need two people to move it</option>
								</select>
							</div>
							<div className="form-group">
								<h6 className="edit__section__title">To Swapp with</h6>
								<select
									id="swappableWith"
									name="swappableWith"
                                    autoComplete='off'
									value={swappableWith}
                                    onChange={this.handleChange}
                                    className="edit__input"
								>
									<option value="any">Anything - Really</option>
									<option value="small">Something small - Don't have much room</option>
									<option value="medium"> Something not too big but not too small - I am picky</option>
									<option value="large">Something big - It's never too big</option>
								</select>
							</div>
							<div className="form-group">
								<h6 className="edit__section__title">How is it?</h6>
								<select
									id="aspect"
									name="aspect"
                                    autoComplete='off'
									value={aspect}
                                    onChange={this.handleChange}
                                    className="edit__input"
								>
									<option value="new">Brand New</option>
									<option value="small-damage">Teeny Tiny Scratches </option>
									<option value="medium-damage">I dropped it several times</option>
									<option value="big-damage">It's broken, but looking good</option>
								</select>
							</div>
							<div className="form-group">
								<label>Image</label>
								<input
									className="form-control"
									type="file"
									name="image"
									value={image}
									onChange={this.handleChange}
                                    required
								/>
							</div>
							<div className="sign-btn">
							<input
									className="edit__button"
									type="submit"
									value="Ready?"
                                    to="/home"
								/>
							</div>
						</form>
					</main>
				);
			}
		}

export default withAuth(AddItem);

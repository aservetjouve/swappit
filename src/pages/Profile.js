import React from "react";
import { withAuth } from "../lib/Auth";
import config from "../config";

import axios from "axios";
import { Link } from "react-router-dom";

import "../style/profile.css";

export class AddItem extends React.Component {
	state = {
		item: [],
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
				this.getItem();
			});
	}

	getItem() {
		const { _id } = this.state.loggedInUser;
		axios.get(`${config.API_URL}/item/${_id}`).then((res) => {
			this.setState({
				item: res.data,
			});
		});
	}

	componentDidMount() {
		if (this.state.item.length === 0) {
			this.getUser();
		}
	}

	handleDelete = () => {
		let { _id } = this.state.item[0];
		axios
			.delete(`${config.API_URL}/item/${_id}`, { withCredentials: true })
	};

	render() {
		const { logout } = this.props;
		if (this.state.item.length === 0) {
			return (
				<main className="profile__page">
					<div className="wrap">
						<div className="loading">
							<div className="bounceball"></div>
							<div className="text">LOADING...</div>
						</div>
					</div>
				</main>
			);
		} else {
			const { firstName } = this.state.loggedInUser;
			const itemName = this.state.item[0].name;
			const image = {
				backgroundImage:  `url(${this.state.item[0].image})`,
				backgroundPosition: 'center',
    			backgroundSize: 'cover'
			}
			const itemId = this.state.item[0]._id;
			return (
				<main className="profile__page">
					<h1 className="auth__header">Swappit.</h1>
					<h2 className="header__floater profile__floater">PROFILE</h2>
					<section className="profile__owner">
						<div className='profile__pic'/>
						<h2>Hey {firstName}!</h2>
						<h6>Ready to swapp?</h6>
					</section>
						<section className="profile__item">
							<div className="item__image"style={image}></div>
							<h6>It's your {itemName}</h6>

							<section className="profile__item_action">
								<Link
									to={`/item/${itemId}/edit`}
									className="action"
									type="button"
								>
									<i>Edit</i>
								</Link>

								<Link
									onClick={this.handleDelete}
									to={"/add-item"}
									className="action"
									type="button"
								>
									<i>Delete</i>
								</Link>
							</section>
						</section>
						<button to='/logout' className="button__img button__img__exit" onClick={logout}>
            <img src="https://res.cloudinary.com/andysv/image/upload/v1593557659/Union_3_2x_lcr2d2.png" alt='arrow to go back to the menu'/>
            </button>
						<Link to='/home' className="button__img button__img__profile">
            <img src="https://res.cloudinary.com/andysv/image/upload/v1593549904/arrow-left_2x_pgi5dr.png" alt='arrow to go back to the menu'/>
            </Link>
				</main>
			);
		}
	}
}

export default withAuth(AddItem);

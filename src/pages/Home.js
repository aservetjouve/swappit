import React from "react";
import { withAuth } from "../lib/Auth";
import config from "../config";
import { Link } from "react-router-dom";

import axios from "axios";

// Style
import "../style/home.css";

export class Home extends React.Component {
	state = {
		item: [],
		userItem: [],
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
				this.getItemToMatch();
			});
	}

	getItem() {
		const { _id } = this.state.loggedInUser;
		axios.get(`${config.API_URL}/item/${_id}`).then((res) => {
			this.setState({
				userItem: res.data,
			});
		});
	}

	getItemToMatch() {
		const { _id } = this.state.loggedInUser;
		console.log(_id);
		axios.get(`${config.API_URL}/transaction/init/${_id}`).then((res) => {
			console.log("res is ", res);
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

	handleLike(val) {
		const { _id } = this.state.userItem[0];
		axios
			.post(`${config.API_URL}/transaction/${_id}/${val}`)
			.then((res) => {
				let newItem = this.state.item.filter((item) => {
					return item[0]._id !== val;
				});

				this.setState({
					item: newItem,
				});
			});
		console.log("like");
	}

	handleDelete(val) {
		let newItem = this.state.item.filter((item) => {
			return item[0]._id !== val;
		});

		this.setState({
			item: newItem,
		});
		console.log("nope");
	}

	render() {
		if (this.state.item.length === 0 || !this.state.item) {
			return (
				<main className="home__page">
					<h1 className="auth__header">Swappit.</h1>
					<div className="home__card">
						<div className="home__searching"></div>
						<div className="home__card--copy pulse__anim"></div>
						<h6 className="home__searching__desc">
							We are looking for new matches{" "}
						</h6>
					</div>

					<section className="home__links">
						<Link
							to="/profile"
							className="home__btn home__btn--left"
						>
							<h6>Profile</h6>
						</Link>
						<Link
							to="/connections"
							className="home__btn home__btn--right"
						>
							<h6>Connections</h6>
						</Link>
					</section>
				</main>
			);
		} else {
			console.log("this.state.item is ", this.state.item);
			return (
				<main className="home__page">
					<h1 className="auth__header">Swappit.</h1>
					<section className="home__all-cards">
						{this.state.item.map((itm, i, arr) => {
							let { name } = arr[i][0];
							let { _id } = arr[i][0];
							let { aspect } = arr[i][0];
							let { image } = arr[i][0];
							if (image === undefined) {
								let random = Math.floor(Math.random() * 3);
								switch (random) {
									case 0:
										image =
											"https://res.cloudinary.com/andysv/image/upload/v1593541496/IceCreamDoodle_wejq6z.png";
										break;
									case 1:
										image =
											"https://res.cloudinary.com/andysv/image/upload/v1593541730/BikiniDoodle_hw1ypu.png";
										break;
									case 2:
										image =
											"https://res.cloudinary.com/andysv/image/upload/v1593541731/ReadingDoodle_r871u6.png";
										break;
									case 3:
										image =
											"https://res.cloudinary.com/andysv/image/upload/v1593541731/SitReadingDoodle_szmncj.png";
										break;
									default:
										image =
											"https://res.cloudinary.com/andysv/image/upload/v1593541731/ReadingSideDoodle_ilwbjc.png";
								}
							}
							let myStyle = {
								backgroundImage: `url(${image})`,
								height: "200px",
								width: "200px",
								margin: "20px auto",
								borderRadius: "50%",
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
								backgroundColor: "var(--main--light)",
							};
							return (
								<div key={i} className="home__card tinder--card">
									<div style={myStyle}></div>
									<h4>{name}</h4>
									<p>State: {aspect}</p>
									<section className="like-dislike__btn">
										<button
											onClick={() =>
												this.handleDelete(_id)
											}
											className="home__card__button"
											type="button"
										>
											<p>NOPE</p>
										</button>
										<button
											onClick={() => this.handleLike(_id)}
											className="home__card__button"
											type="button"
										>
											<p>LIKE</p>
										</button>
									</section>
								</div>
							);
						})}

						<section className="home__links">
							<Link
								to="/profile"
								className="home__btn home__btn--left"
							>
								<h6>Profile</h6>
							</Link>
							<Link
								to="/connections"
								className="home__btn home__btn--right"
							>
								<h6>Connections</h6>
							</Link>
						</section>
					</section>
				</main>
			);
		}
	}
}

export default withAuth(Home);

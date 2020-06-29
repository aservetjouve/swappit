import React from "react";
import { withAuth } from "../lib/Auth";
import config from "../config";

import axios from "axios";
import { Link } from "react-router-dom";

export class Connexion extends React.Component {
	state = {
		itemActive: [],
		itemOther: [],
		otherUser: [],
		transaction: [],
		loggedInUser: null,
		terminated: false,
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
				this.getTransaction();
			});
	}

	getItem() {
		const { _id } = this.state.loggedInUser;
		axios.get(`${config.API_URL}/item/${_id}`).then((res) => {
			this.setState({
				itemActive: res.data,
			});
		});
	}

	getTransaction() {
		const { _id } = this.state.loggedInUser;
		axios.get(`${config.API_URL}/transaction/done/${_id}`).then((res) => {
			let newTransaction = {};
			let newItemOther = [];
			let newOtherUser = [];
			for (let i = 0; i < res.data.length; i++) {
				newTransaction[i] = res.data[i];
			}

			this.setState({
				transaction: newTransaction,
			});

			let transactionLength = Object.keys(this.state.transaction).length;
			for (let i = 0; i < transactionLength; i++) {
				let itemUserA = this.state.transaction[i].itemUserA;
				let itemUserB = this.state.transaction[i].itemUserB;

				if (itemUserA === this.state.itemActive[0]._id) {
					axios
						.get(`${config.API_URL}/item/search/${itemUserB}`)
						.then((res) => {
							newItemOther.push(res.data);

							this.setState({
								itemOther: newItemOther,
							});
							Object.keys(
								this.state.itemOther.map((key) => {
									let { owner } = key;
									axios
										.get(
											`${config.API_URL}/auth/otheruser/${owner}`,
											{ withCredentials: true }
										)
										.then((res) => {
											newOtherUser.push(res.data);
											this.setState({
												otherUser: newOtherUser,
												terminated: true,
											});
											setTimeout(() => {
												this.setState({
													terminated: true,
												});
											}, 1000);
										});
								})
							);
						});
				} else {
					axios
						.get(`${config.API_URL}/item/search/${itemUserA}`)
						.then((res) => {
							newItemOther.push(res.data);

							this.setState({
								itemOther: newItemOther,
							});
							Object.keys(
								this.state.itemOther.map((key) => {
									let { owner } = key;
									axios
										.get(
											`${config.API_URL}/auth/otheruser/${owner}`,
											{ withCredentials: true }
										)
										.then((res) => {
											newOtherUser.push(res.data);
											this.setState({
												otherUser: newOtherUser,
												terminated: true,
											});
											setTimeout(() => {
												this.setState({
													terminated: true,
												});
											}, 1000);
										});
								})
							);
						});
				}
			}
		});
	}

	componentDidMount() {
		if (this.state.transaction.length === 0) {
			this.getUser();
		}
	}

	render() {
		if (this.state.terminated === false) {
			return <h1>NO CONNEXION YET</h1>;
		} else {
			let itemOther;
			let otherUser;

			const { firstName } = this.state.loggedInUser;
            const itemName = this.state.itemActive[0].name;
            console.log(itemName)
			return (
				<>
					{
						this.state.otherUser.map((key, i, arr) => {
							if (i < (this.state.otherUser.length/2)) {
								otherUser = arr[i].firstName;
								itemOther = this.state.itemOther[i].name;
                                let contact = arr[i].email
								return (
									<h1>
										Contact {otherUser} for the {itemOther} here {contact}
									</h1>
								);
							} else if (this.state.otherUser.length === 1){
                                otherUser = arr[0].firstName;
								itemOther = this.state.itemOther[0].name;
								return (
									<h1>
										Contact {otherUser} for the {itemOther}
									</h1>
								);
                            }
						})
					}
				</>
			);

			return (
				<h1>
					{firstName}, {otherUser} wants to swap your {itemName}{" "}
					against a {itemOther}
				</h1>
			);
		}
	}
}

export default withAuth(Connexion);

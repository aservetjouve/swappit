import React from "react";
import { withAuth } from "../lib/Auth";
import config from "../config";

import axios from "axios";
import { Link } from "react-router-dom";

// Style 
import '../style/connexion.css'

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
                                    return ' '
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
                                    return ''
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
			return (<main className='connexion__page'>
            <h1 className="auth__header">Swappit.</h1>
            <h2 className="header__floater">CONNECTIONS</h2>
            <div className="home__card">
						<div className="connect__searching"></div>
						<h6 className="home__searching__desc">It did not match </h6>
                        <p className="home__searching__desc little-note">No worries, <br/> You'll find the good one</p>
			</div>
            <Link to='/home' className="button__img">
            <img alt='arrow to go back home'src="https://res.cloudinary.com/andysv/image/upload/v1593549904/arrow-left_2x_pgi5dr.png"/>
            </Link>
            </main>)
		} else {
			let itemOther;
			let otherUser;
			return (
				<main className='connexion__page'>
                <h1 className="auth__header">Swappit.</h1>
                <h2 className="header__floater">CONNECTIONS</h2>
                <section className='home__all-cards'>
					{
						this.state.otherUser.map((key, i, arr) => {

							if (i < (this.state.otherUser.length/2)) {
								otherUser = arr[i].firstName;
								itemOther = this.state.itemOther[i].name;
                                let contact = arr[i].email
                                let image = {
                                backgroundImage: `url(${this.state.itemOther[i].image})`}
								return (
                                    <section className='home__card contact__card'>
                                    <div className='image__style' style={image}></div>
									<h6>For the {itemOther} </h6>
                                    <p>Contact {otherUser} <a className='contact__card__email' href={'mailto:'+contact}>here!</a></p>
                                    </section>
								);
							} else if (this.state.otherUser.length === 1){
                                otherUser = arr[0].firstName;
								itemOther = this.state.itemOther[0].name;
                                let contact = arr[0].email
								return (
									<h6>
										Contact {otherUser} for the {itemOther}
                                        here {contact}
									</h6>
								);
                            }
                            return ''
						})
					}
                    
                    <Link to='/home' className="button__img">
            <img alt='arrow to go back home' src="https://res.cloudinary.com/andysv/image/upload/v1593549904/arrow-left_2x_pgi5dr.png"/>
            </Link>
            </section>
				</main>
			);
		}
	}
}

export default withAuth(Connexion);

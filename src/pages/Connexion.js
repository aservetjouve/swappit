import React from "react";
import { withAuth } from "../lib/Auth";
import config from "../config";

import axios from "axios";
import { Link } from "react-router-dom";

export class Connexion extends React.Component {
	state = {
        itemActive : [],
        itemOther : [],
        otherUser : [],
		transaction: [],
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
                this.getTransaction();
                
			});
    }
    
    getItem(){
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
            console.log(res.data)
            if (!res.data.length) {
                this.setState({
                itemOther : [],
                otherUser : [],
                transaction: []
                })
            } else {
            let itemUserA = res.data[0].itemUserA
            let itemUserB = res.data[0].itemUserB

            if(itemUserA === this.state.itemActive[0]._id){
                console.log('The other user is UserB')
                axios.get(`${config.API_URL}/item/search/${itemUserB}`).then((res)=> {
                    this.setState({
                        itemOther: res.data
                    })
                    let {owner} = this.state.itemOther
                    axios.get(`${config.API_URL}/auth/otheruser/${owner}`, {withCredentials: true,})
                    .then((res) => {
                        this.setState({
                            otherUser: res.data,
                        });
                        console.log(this.state.otherUser)
                    })
                })
            } else {
                axios.get(`${config.API_URL}/item/search/${itemUserA}`).then((res)=> {
                    this.setState({
                        itemOther: res.data
                    })
                    let {owner} = this.state.itemOther
                    axios.get(`${config.API_URL}/auth/otheruser/${owner}`, {withCredentials: true,})
                    .then((res) => {
                        this.setState({
                            otherUser: res.data,
                        });
                        console.log(this.state.otherUser)
                    })
                })
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
        
		if (this.state.otherUser.length === 0) {

                return (
                    <h1>NO CONNEXION YET</h1>
                )

		} else {
            const { firstName } = this.state.loggedInUser;
            const itemName = this.state.itemActive[0].name;
            const itemOther = this.state.itemOther.name
            const otherUser = this.state.otherUser.firstName
			return (
				<h1>{firstName}, {otherUser} wants to swap your {itemName} against a {itemOther}</h1>
			);
		}
	}
}

export default withAuth(Connexion);

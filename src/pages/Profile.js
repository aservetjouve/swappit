import React from "react";
import { withAuth } from "../lib/Auth";
import config from "../config";

import axios from "axios";
import { Link } from "react-router-dom";

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

	render() {
		if (this.state.item.length === 0) {
			return <div>Loading...</div>;
		} else {
			const { firstName } = this.state.loggedInUser;
			const itemName = this.state.item[0].name;
			return (
				<div>
					Hey {firstName} ! What's up ?! <br /> Look at your{" "}
					{itemName}
				</div>
			);
		}
	}
}

export default withAuth(AddItem);

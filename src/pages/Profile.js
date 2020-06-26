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
    
    handleDelete = () => {
        let {_id} = this.state.item[0]
        console.log(_id)
        axios.delete(`${config.API_URL}/item/${_id}`, { withCredentials: true})
            .then(() => {
               // we will redirect here
               console.log('delete')
            })
    }

	render() {
		if (this.state.item.length === 0) {
			return <div>Loading...</div>;
		} else {
			const { firstName } = this.state.loggedInUser;
            const itemName = this.state.item[0].name;
            const itemId = this.state.item[0]._id
			return (
				<div>
					<h1>Hey {firstName} ! What's up ?! </h1> 
                    <p>Look at your {itemName}</p>
                    
                    <Link to={`/item/${itemId}/edit`} class="btn" type="button">
						<i class="fas fa-home">Edit</i>
					</Link>

                    <Link onClick={this.handleDelete} to={"/add-item"}class="btn" type="button">
						<i class="fas fa-home">Delete</i>
					</Link>
				</div>
			);
		}
	}
}

export default withAuth(AddItem);

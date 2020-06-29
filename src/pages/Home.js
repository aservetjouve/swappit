import React from "react";
import { withAuth } from "../lib/Auth";
import config from "../config";

import axios from "axios";
import { Link } from "react-router-dom";

export class Home extends React.Component {
	state = {
		item: [],
        userItem:[],
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
                this.getItem()
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
		axios.get(`${config.API_URL}/transaction/init/${_id}`).then((res) => {
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

    handleLike(val){
		const { _id } = this.state.userItem[0];
        axios.post(`${config.API_URL}/transaction/${_id}/${val}`).then((res) => {
            let newItem = this.state.item.filter((item) => {
				return item[0]._id !== val
			})
	  
			this.setState({
				item: newItem
			})
			console.log(this.state.item)
        })
    }

    handleDisplay(){
        
    }

    
    
	render() {
		if (this.state.item.length === 0) {
			return <div>WAITING FOR NEW CONNECTIONS</div>;
		} else {
                return(
                    <>
                    { this.state.item.map((itm, i, arr)=> {
                        let {name} = arr[i][0]
                        let {_id} = arr[i][0]
                        console.log('inside',_id)
                        return (
							<div key={i} id='changing'>
								<h2>bjr {name}{i}</h2>
								<button
									onClick={() => this.handleLike(_id)}
									class="btn"
									type="button"
									
                                    
								>
									<i  class="fas fa-home">LIKE</i>
								</button>
							</div>
						);
                        
                    }) 
                    }
                    </>
                )
		}
	}
}

export default withAuth(Home);

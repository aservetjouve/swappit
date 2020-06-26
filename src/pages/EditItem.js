import React from 'react'
import axios from 'axios'
import config from '../config'
import { Redirect } from 'react-router-dom';

export default class EditItem extends React.Component {

    state = {
        item: ''
    }

    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`${config.API_URL}/item/search/${id}`, {withCredentials: true})
            .then((res) => {
                this.setState({
                    item: res.data
                })
            })
    }

    handleEdit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.id
        axios.patch(`${config.API_URL}/item/${id}`, {
            name: this.state.item.name,
            type: this.state.item.type,
            aspect: this.state.item.aspect,
            swappableWith: this.state.item.swappableWith
        }, {withCredentials: true})
            .then((res) => {
                this.props.history.push('/home')
            })
    }

    handleNameChange = (e) => {
        let newItem = JSON.parse(JSON.stringify(this.state.item))
        newItem.name = e.target.value

        this.setState({
            item: newItem
        })
    }

    handleTypeChange = (e) => {
        let newItem = JSON.parse(JSON.stringify(this.state.item))
        newItem.type = e.target.value

        this.setState({
            item: newItem
        })
    }

    handleLocationChange = (e) => {
        let newItem = JSON.parse(JSON.stringify(this.state.item))
        newItem.location = e.target.value

        this.setState({
            item: newItem
        })
    }

    handleAspectChange = (e) => {
        let newItem = JSON.parse(JSON.stringify(this.state.item))
        newItem.aspect = e.target.value

        this.setState({
            item: newItem
        })
    }

    render(){
        if (!this.state.item){
            return(
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        const { name, type, aspect, swappableWith } = this.state.item;
        return (
            <>
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
									placeholder="The name here"
                                    onChange={this.handleNameChange}
								/>
							</div>
							<div class="form-group">
								<label>Last Name:</label>
								<input
									class="form-control"
									type="text"
									name="type"
									value={type}
									placeholder="The type"
                                    onChange={this.handleTypeChange}
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
                                    onChange={this.handleLocationChange}
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
									placeholder="It's aspect"
                                    onChange={this.handleAspectChange}
								/>
							</div>
							<div class="sign-btn">
								<input
									class="btn btn-primary"
									type="submit"
									value="Edit"
                                    onClick={this.handleEdit}
                                    to="/home"
								/>
							</div>
						</form>
					</div>
            </>
        )
    }
}
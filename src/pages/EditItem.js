import React from 'react'
import axios from 'axios'
import config from '../config'

import { Link } from "react-router-dom";

// Style 
import '../style/add-item.css'

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
            swappableWith: this.state.item.swappableWith,
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
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        const { name, type, aspect, swappableWith } = this.state.item;
        return (
                <main className="edit__page">
                        <Link to="/home"><h1 className="auth__header">Swappit.</h1></Link>

						

						<form onSubmit={this.handleAddItem} className="edit__form">
                        <h5 className="edit__header">Edit your item</h5>
							<div >
								<h6 className="edit__section__title">The Name</h6>
								<input
									className="edit__input"
									type="text"
									name="name"
                                    autoComplete='off'
									value={name}
                                    onChange={this.handleNameChange}
								/>
							</div>
                            <div className="form-group">
								<h6 className="edit__section__title">The Size</h6>
								<select
									id="swappableWith"
									name="swappableWith"
                                    autoComplete='off'
									value={type}
                                    onChange={this.handleTypeChange}
                                    className="edit__input"
								>
									<option value="small">Small | You can carry it in a bag</option>
									<option value="medium">Medium | You will need your two hands</option>
									<option value="large">Large | You need two peope to move it</option>
								</select>
							</div>
							<div className="form-group">
								<h6 className="edit__section__title">To Swapp with</h6>
								<select
									id="swappableWith"
									name="swappableWith"
                                    autoComplete='off'
									value={swappableWith}
                                    onChange={this.handleLocationChange}
                                    className="edit__input"
								>
									<option value="any">Anything - </option>
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
                                    onChange={this.handleLocationChange}
                                    className="edit__input"
								>
									<option value="new">Brand New</option>
									<option value="small-damage">Teeny Tiny Scratches </option>
									<option value="medium-damage">I dropped it several times</option>
									<option value="big-damage">It's broken, but looking good</option>
								</select>
							</div>
							
							<div className="sign-btn">
								<input
									className="edit__button"
									type="submit"
									value="Edit"
                                    onClick={this.handleEdit}
                                    to="/home"
								/>
							</div>
						</form>
					</main>

        )
    }
}
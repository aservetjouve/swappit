import React from 'react';

export default function SignUp(props){
    return (
        <form onSubmit={props.onSignUp}>
        <h1>THIS IS THE SIGNUP PAGE</h1>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" className="form-control" id="location" name="location" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input name="password" type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
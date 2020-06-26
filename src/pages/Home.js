import React from 'react';
// import {Link} from 'react-router-dom'

export default function Home(props){
    return (
        <>
            {
                props.isLoggedIn ? (
                    <h1>Hi {props.isLoggedIn.firstName}</h1>
                ) : (
                    <>
                        <h1>YOU ARE IN THE PUBLIC HOME PAGE</h1>
                    </>
                )
            }
        </>
    )
}
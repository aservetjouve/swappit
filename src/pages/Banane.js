import React from 'react';
// import {Link} from 'react-router-dom'

export default function Home(props){
    return (
        <>
                        {
                props.isLoggedIn ? (
                    <h1>Banane</h1>
                ) : (
                    <>
                        <h1>ACCESS DENIED</h1>
                    </>
                )
            }
        </>
    )
}
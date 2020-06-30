import React from 'react';

// Style 
import '../style/welcome.css'

// Component 
import Nav from '../components/Nav'

export default function Welcome(){    
    return (
        <>
        <Nav/>
        <h1 className="brand">Swappit</h1>
        <main className="welcome">
            <section className="welcome__section">
                <div className='welcome__loving'></div>
                <h2 className="welcome__section__title">Don't like it?</h2>
                <h2 className="welcome__section__title">Swapp it!</h2>
                <p className="welcome__section_desc">Libero consequatur incidunt et consequatur. Sit et enim. Sint quaerat omnis et repudiandae unde sapiente magnam enim. </p>
            </section>
            <section className="welcome__section">
                <h2 className="welcome__section__title">It's for you.</h2>
                <h2 className="welcome__section__title">For everyone.</h2>
                <p className="welcome__section_desc">Aut id ut ut eius dolorem et. Sequi voluptates eos cum. Temporibus quam et dolores ut ut. Saepe est harum repudiandae non. Deleniti sapiente culpa. </p>
            </section>
            <section className="welcome__section welcome__section--last">
                 <div className='welcome__ballet'></div>
                <h2 className="welcome__section__title">It's simple.</h2>
                <h2 className="welcome__section__title">It's free.</h2>
                <p className="welcome__section_desc">
                Voluptatem rem ut tempore quos doloribus non doloribus nulla. Rerum adipisci eligendi qui qui aperiam voluptatibus ut voluptatibus. Cum deleniti at qui veniam. Ipsam qui incidunt. Voluptatum veritatis harum officia soluta. 
                </p>
            </section>
            
        </main>
        <footer>
            <h5 className="about-us">About Us</h5>
        </footer>
        </>
    )
}
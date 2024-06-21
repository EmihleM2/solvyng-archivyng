import React from 'react';
import NavBar from "./Navbar.jsx";
import Settings from './Settings.jsx';

const Language = () => {

    return (
        <>
            <NavBar />
            <Settings />
            <hr className='billing-line-2' />
            <h1>Language page</h1>
        </>
    )
}
export default Language;

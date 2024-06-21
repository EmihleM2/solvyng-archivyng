import React from 'react';
import NavBar from "./Navbar.jsx";
import Settings from './Settings.jsx';

const Information = () => {

    return (
        <>
            <NavBar />
            <Settings />
            <hr className='billing-line-2' />
            <h1>Information page</h1>
        </>
    )
}
export default Information;

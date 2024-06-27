import React from 'react';
import NavBar from "./Navbar.jsx";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StampedDoc = () => {
    const location = useLocation();
    const { url } = location.state;

    return (
        <>
            {url && (
                <iframe
                    title="Modified PDF"
                    src={url}
                    width="100%"
                    height="800px"
                    style={{ position: 'absolute', zIndex: 0 }}
                ></iframe>
            )}
        </>
    )
}
export default StampedDoc;

import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
const imageUrl = 'https://res.cloudinary.com/dhujtl4cm/image/upload/v1768199495/Bigsizepng_za4j4w.png';
const Logo = () => {
    return (
        <div className="inner-logo">
            <Link to="/">
                <img
                    src={imageUrl}
                    alt="DLMStore"
                    className="logo-img"
                    width={150}
                    height={40}
                />
            </Link>
        </div>
    );
};
export default Logo;
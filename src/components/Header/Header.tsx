import React from 'react';
import TopHeader from './TopHeader/TopHeader';

import './Header.css';

export default function Header() {
    return (
        <header className="header-sticky">
            <div className='header-main'>
                <div className='container'>
                    <TopHeader />
                </div>
            </div>
        </header>
    );
}
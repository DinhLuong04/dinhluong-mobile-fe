import React from 'react';
import Logo from '../Logo/Logo';
import BtnCategory from '../BtnCategory/BtnCategory';
import SearchBar from '../SearchBar/SearchBar';
import BtnUser from '../BtnUser/BtnUser';
import BtnCart from '../BtnCart/BtnCart';
import './TopHeader.css';

const TopHeader = () => {
    return (
        <div className="inner-wrap">  
                    <Logo />
                    <BtnCategory />
                    <SearchBar />
                    <BtnUser />
                    <BtnCart />
        </div>
    );
};
export default TopHeader;
import React from 'react';
import './header.scss'

const Header = ({onChange,value,withoutSearch}) => {
    const search = withoutSearch ? null :  <input value={value} onChange={onChange} type="text" placeholder="Filter by team name" className="header__search"/>
    return (
        <header className="header">
            <p className="header__title">PANDA PREDICTIONS</p>
            {search}
        </header>
    );
};

export default Header;

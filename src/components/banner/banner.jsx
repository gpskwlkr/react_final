import React from 'react';
import './banner.scss'
import logo from '../../assets/images/main_banner.png'

const Banner = () => {
    return (
        <div className="banner" style={{'background-image': `url(${logo})`}}>
        </div>
    );
};

export default Banner;

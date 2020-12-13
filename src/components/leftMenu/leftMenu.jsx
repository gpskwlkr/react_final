import React from 'react';
import './leftMenu.scss'

const LeftMenu = ({selectedFederation, federations, onFederationSelect}) => {
    const federationList = federations.map((federation, i) => {
        return <p key={i}
                  onClick={() => onFederationSelect(federation)}
                  className={`menu__option ${selectedFederation === federation ? 'menu__option--selected' : ''}`}
        >
            {federation}
        </p>
    })
    return (
        <menu className="menu">
            <p className="menu__title">Federations</p>
            {federationList}
        </menu>
    );
};

export default LeftMenu;

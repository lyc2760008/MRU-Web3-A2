import React from 'react';
import myLogo from '../mylogo.png';
import { NavLink } from 'react-router-dom';

const HeaderBar = function (props) {
    return(
        <div className='header-titles'>
            <NavLink exact to='/home' activeClassName='active'>
            <button><img className= 'logo' src={myLogo} alt='myLogo'/> </button>
            </NavLink>
        </div>
    );
}
export default HeaderBar;

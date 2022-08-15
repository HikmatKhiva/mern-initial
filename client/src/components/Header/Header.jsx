import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.Context'
const Header = () => {
    const nav = useNavigate();
    const auth = useContext(AuthContext);
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout();
        nav('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding:'0 2rem'}}>
                <span className="brand-logo">Logo</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Create</NavLink></li>
                    <li><NavLink to='/links'>Links</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
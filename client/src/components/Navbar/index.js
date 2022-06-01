import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavButton,
    NavBtnLink
} from './Navbarproperties'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>logo</h1>
                    </NavLink>
                    <Bars />
                    <NavMenu>
                        <NavLink to="/Home" activeStyle>
                            Home
                        </NavLink>
                        <NavLink to="/about" activeStyle>
                            About
                        </NavLink>
                        <NavLink to="/Login" activeStyle>
                            Login
                        </NavLink>
                        <NavLink to="/signup" activeStyle>
                            Sign Up
                        </NavLink>
                        <NavLink to="/contact" activeStyle>
                            Contact
                        </NavLink>
                    </NavMenu>
                    <NavButton>
                        <NavBtnLink to= '/signin'>Sign In</NavBtnLink>
                    </NavButton>
            </Nav>
        </>
    );
};

export default Navbar;
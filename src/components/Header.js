import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./auction/Search";

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">
                        X
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <div className="col s12 ">
                                <div className="input-field col s6 s12">
                                    <Search />
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/auction/new">NY</Link>
                        </li>
                        <li>
                            <a href="badges.html">2</a>
                        </li>
                        <li>
                            <a href="collapsible.html">3</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;

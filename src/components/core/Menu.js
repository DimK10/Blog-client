import React, { Component } from 'react';
import { NavLink, Link, withRouter } from "react-router-dom";
 
class Menu extends Component {
    constructor(props) {
        super(props);

        this.smallNav = React.createRef();
        this.handleResizeToPhone = this.handleResizeToPhone.bind(this);
    };

    handleResizeToPhone() {
        let smallNav = this.smallNav;
        // console.log(smallNav);
        if (smallNav.current.className.indexOf("w3-show") === -1) {
            smallNav.current.className += " w3-show";
        } else {
            smallNav.current.className = smallNav.current.className.replace(" w3-show", "");
        };
    };

    render() {
        return (
            
            <div style={{width: '100%'}}>
                <div className="w3-bar w3-black">
                    <NavLink 
                        className="w3-bar-item
                        w3-button 
                        w3-bottombar 
                        w3-border-black 
                        w3-hover-border-white 
                        w3-hide-small"
                        to="/"
                    >
                        Home
                    </NavLink>


                    <button 
                        className="w3-bar-item 
                        w3-button w3-right 
                        w3-hide-large 
                        w3-hide-medium" 
                        type="button" 
                        onClick={this.handleResizeToPhone}
                    >
                        &#9776;
                    </button>
                </div>
                
                <div ref={this.smallNav} className="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium">
                    <Link 
                        className="w3-bar-item w3-button"
                        to="/"
                    >
                        Home
                    </Link>
                </div>
            </div>
                
        );
    }
    
};

export default withRouter(Menu);
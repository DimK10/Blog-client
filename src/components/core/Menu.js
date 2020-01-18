import React, { Component } from 'react';
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import SignIn from '../user/SignIn';
import {toggleSignInModal} from '../../actions/modals';
import {isAuthenticated, signout} from '../../API/auth/index';

import store from '../../store/configureStore'; 
class Menu extends Component {
    constructor(props) {
        super(props);

        this.smallNav = React.createRef();
        this.handleResizeToPhone = this.handleResizeToPhone.bind(this);
        this.handleSignInModal = this.handleSignInModal.bind(this);
        this.checkRender = this.checkRender.bind(this);
        this.state = {
            signInModalIsOpen: this.props.signInModalIsOpen
        };
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

    handleSignInModal = (prevState) => {
        this.setState({ signInModalIsOpen: !prevState.signInModalIsOpen }, () => {
            this.props.toggleSignInModal(this.props.signInModalIsOpen);
            console.log('store in handleSignInModal: ', store.getState());
        });
    };

    // Conditional renders 
    // render for guest
    guestRender = () => (
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
                        w3-button 
                        w3-right
                        w3-bottombar 
                        w3-border-black 
                        w3-hover-border-white 
                        w3-hide-small"
                    onClick={this.handleSignInModal}
                >
                    Sign In
                </button>


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
            <SignIn />
        </div>
            
    );

    userRender = () => (
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
                <NavLink 
                    className="w3-bar-item
                    w3-button 
                    w3-bottombar 
                    w3-border-black 
                    w3-hover-border-white 
                    w3-hide-small"
                    to="/posts-by-interest"
                >
                    Interests
                </NavLink>
                <NavLink 
                    className="w3-bar-item
                    w3-button 
                    w3-bottombar 
                    w3-border-black 
                    w3-hover-border-white 
                    w3-hide-small"
                    to="/explore-new-posts"
                >
                    Explore
                </NavLink>
                <span 
                    className="w3-bar-item
                        w3-button 
                        w3-right
                        w3-bottombar 
                        w3-border-black 
                        w3-hover-border-white 
                        w3-hide-small"
                    onClick={() => signout(() =>{
                        this.props.history.push('/');
                    })}
                >
                    Sign Out
                </span>


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
                <Link 
                    className="w3-bar-item w3-button"
                    to="/posts-by-interest"
                >
                    Interests
                </Link>
                <Link 
                    className="w3-bar-item w3-button"
                    to="/explore-new-posts"
                >
                    Explore
                </Link>
            </div>
            <SignIn />
        </div>
    );

    checkRender = () => {
        // Check if guest, user or admin
        if(isAuthenticated()) {
            const {user} = isAuthenticated();
            // Check if user is admin
            if(user.role === 1) {
                // TODO - Make adminRender
                // retun this.adminRender()
            } else {
                return this.userRender();
            }
        } else {
            return this.guestRender();
        };
    }

    render() {
        return (
            <React.Fragment>
                {this.checkRender()}
            </React.Fragment>
            
                
        );
    }
    
};

const mapStateToProps = ({signInModalIsOpen}) => ({
    signInModalIsOpen
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleSignInModal: () => dispatch(toggleSignInModal(ownProps.signInModalIsOpen))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));
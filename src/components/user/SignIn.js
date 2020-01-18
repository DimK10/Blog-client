import React, { useState, useEffect } from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {signIn, authenticate ,isAuthenticated} from '../../API/auth/index';
import {toggleSignInModal} from '../../actions/modals';
import store from '../../store/configureStore';
let FormData = require('react-form-data');




const SignIn = (props) => {

    Modal.setAppElement(document.getElementById('root'));


    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });
    const [modalIsOpen, setModalIsOpen] = useState(props.modalIsOpen);

    const {email, password, error, redirectToReferrer} = values;

    const {user} = isAuthenticated();

    useEffect(() => {
        setModalIsOpen(props.modalIsOpen);
    }, [props.modalIsOpen]);

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const handleCloseModal = () => {
        props.toggleSignInModal();
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        // console.log('email: ', email);
        // console.log('password: ', password);
        signIn({ email, password })
        .then(data => {
            console.log('DATA: ', data);

            if(data.err) {
                
                setValues({...values, error: data.err});
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values, 
                        redirectToReferrer: true
                    });
                    redirectUser();
                });
            };
        });
    };

    const showProps = () => {
        console.log('props in signin modal: ', props);
    };

    const signinForm = () => (
        <Modal 
           className="w3-modal"
            isOpen={modalIsOpen}
        >
            
            <div className="w3-modal-content w3-card w3-animate-zoom" style={{ maxWidth: '600px' }}>
                <div className="w3-center w3-section">
                    
                    <span 
                        onClick={handleCloseModal} 
                        className="w3-button w3-xlarge w3-hover-red w3-display-topright" 
                        title="Close Modal"
                    >
                    {/* TODO - add fontawesome X */}
                        &times; 
                    </span>
                    
                    {/* TODO - add fontawesome user  */}
                </div>
                <form className="w3-container">
                
                    <div className="w3-section">
                    <div className="w3-content">
                        <div className="w3-row">
                        {showError()}
                        </div>
                    </div>
                        <label><b>Email</b></label>
                        <input 
                            className="w3-input w3-border w3-margin-bottom" 
                            type="email" 
                            placeholder="Enter Email"
                            defaultValue={values.email}
                            onChange={handleChange('email')}
                            required
                        />
                        <label><b>Password</b></label>
                        <input 
                            className="w3-input w3-border w3-margin-bott12om" 
                            type="password" 
                            placeholder="Enter Password"
                            defaultValue={values.password}
                            onChange={handleChange('password')}
                            required
                        />
                        <button 
                        className="w3-button w3-block w3-black w3-section w3-padding" 
                        onClick={clickSubmit}
                        >
                            Login
                        </button>
                        {/* TODO - Add the option for the username to be remembered */}
                        {/* <input className="w3-check w3-margin-top" type="checkbox" defaultChecked="checked"> Remember me </input> */}
                    </div>
                </form>
                <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button className="w3-button w3-red" onClick={handleCloseModal}>
                        Cancel
                    </button>
                    {/* TODO - Add forgot password support */}
                    <span className="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>
                </div>
            </div>
            
        </Modal>
    );

    const showError = () => (
        <div className="w3-panel w3-pale-red w3-border errorMessage" style={{display: values.error ? '' : 'none'}}>
            <div className="error">
                {values.error}
            </div>
            <div className="closeMessage">
                <span className="w3-button closeIcon">
                    &times; 
                </span>
            </div>
        </div>
    );

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1) {
                // return <Redirect to="/admin/dashboard" />
            };
        } else {
            // return <Redirect to="/user/dashboard" />
        };

        if(isAuthenticated()) {
            console.log('should close modal and redirect');
            console.log('props.location ', props.location);
            props.toggleSignInModal();
            console.log('store state ', store.getState());
            console.log('modalIsOpen in props ', props.modalIsOpen);
            
            // return <Redirect to={props.location.pathname} />
            props.history.push({
                pathname: props.location.pathname,
                state: props.location.state
            });
        };
    }

    return (
        <React.Fragment>
            {signinForm()}
            {/* {redirectUser()} */}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({ modalIsOpen: state.modalsReducer.toggleSignInModal });

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleSignInModal: () => dispatch(toggleSignInModal(ownProps.modalIsOpen))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
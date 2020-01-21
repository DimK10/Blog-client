import React from 'react';
import Layout from './core/Layout'
import notFoundImg from '../assets/images/image-not-found-png-6-original.png';

const NotFound = () => {
    return (
        <React.Fragment>
            <Layout />
            <div className="w3-container w3-light-grey" id = "post-container">
                <div className="w3-col s12" id="content">
                        
                       
                <div className="w3-card w3-center w3-white" id="post-content">
                    {/* <h1 className="w3-grey w3-center">404</h1> */}
                    {/* <h3 className="w3-grey w3-center">The page you are looking for could not be found</h3> */}
                    <div className="img-container">
                        <img src={notFoundImg} alt="404 Img" style={{maxWidth: '70vw', maxHeight: '100vh' }}/>
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
};

export default NotFound;
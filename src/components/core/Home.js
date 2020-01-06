import React from 'react';
import Layout from './Layout';
import Footer from './Footer';

const Home = () => (

    <div className="w3-light-grey">
        <div className="w3-content" style={{maxWidth: '1900px' }}>
        <Layout />
            <div className="w3-center">
                <h3>Welcome To a Blog Dedicated To Nature!</h3>
                <h4>In This Blog Anyone Can Write!</h4>
                <br/>
            </div>
        <Footer />
        </div>
    </div>
);

export default Home;
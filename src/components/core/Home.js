import React from 'react';
import Layout from './Layout';
import Footer from './Footer';
import PostCard from './PostCard';
import AboutCard from './AboutCard';

const Home = () => (

    <div className="w3-light-grey">
        <div className="w3-content" style={{maxWidth: '1900px' }}>
        <Layout />
            <div className="w3-row">
                <div className="w3-col l7 s12">
                    <PostCard class={"w3-card-4 w3-margin w3-white"}/>
                    <PostCard class={"w3-card-4 w3-margin w3-white"}/>

                </div>
                
                <div className="w3-col l4">
                    <AboutCard />
                </div>
                <br/>
            </div>
        <Footer />
        </div>
    </div>
);

export default Home;
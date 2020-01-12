import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Footer from './Footer';
import PostCard from './PostCard';
import AboutCard from './AboutCard';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/blogApi';

const Home = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        props.dispatch(fetchPosts());
    }, []);

   

    return (

        <div className="w3-light-grey">
            <div className="w3-content" style={{maxWidth: '1900px' }}>
            <Layout />
                <div className="w3-row">
                    <div className="w3-col l7 s12">
                        
                        {props.data.posts.map((post) => {
                            return <PostCard 
                                        class={"w3-card-4 w3-margin w3-white"} 
                                        post = {post} 
                                        key ={post._id}
                                        isImgFetching={props.data.isImgFetching}
                                        images={props.data.images}
                                    />
                        })}
                        

                    </div>
                    
                    <div className="w3-col l4">
                        <AboutCard />
                    </div>
                    <br/>
                </div>
            {/* <Footer /> */}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

export default connect(mapStateToProps)(Home);
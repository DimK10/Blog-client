import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import Layout from './Layout';
import PostCard from './PostCard';
import AboutCard from './AboutCard';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/blogApi';

const Home = (props) => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        props.dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        if(props.location.state) {
            setMessage(props.location.state.message);
            setTimeout(() => {
                setMessage('');
            }, 1500);
        };
    }, [props.location]);

    const consoleProps = (p) => {
        console.log('props ', p);
    };

    const showFlashMessage = () => {
        return <div className="w3-panel w3-pale-green w3-border" style={{ display: message !== '' ? '' : 'none' }}>
            {message}
        </div>

    }

   const showHome = () => (
        <div className="w3-light-grey">
            <div className="w3-content" style={{maxWidth: '1900px' }}>
                <Layout />
                <div className="w3-row">
                    <div className="w3-col l7 s12">
                        {/* {JSON.stringify(props)} */}
                        {consoleProps(props)}
                        {props.location ? showFlashMessage() : null}
                        {props.data.asyncReducer.posts.map((post) => {
                            return <PostCard 
                                        class={"w3-card-4 w3-margin w3-white"} 
                                        post = {post} 
                                        key ={post._id}
                                        isImgFetching={props.data.isImgFetching}
                                        images={props.data.images}
                                    />
                        })}
                        

                    </div>
                    
                    <div className="w3-col l4" id="about-card">
                        <AboutCard />
                    </div>
                    <br/>
                </div>
            </div> 
        </div>
    );

    return (
        <React.Fragment>
            {showHome()}
        </React.Fragment>
        
    )
};

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

export default withRouter(connect(mapStateToProps)(Home));
import React, { Component } from 'react';
import Menu from './Menu';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import nl2br from 'react-newline-to-break';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import {API} from '../../config';


const Post = (props) => {

    const {post} = props.state;

    const consoleProps = (p) => {
        console.log('props ', p);
    };

    const formatString = (description) => {
        let formatted = description.replace('"','');
        console.log('formatted ', formatted);
        return formatted;
    };
    

    return (
        <div className="w3-container w3-light-grey" id = "post-container">
            <Menu />

            <div className="w3-col s12">

            <div className="w3-card w3-center w3-white" id="post-content">
                {consoleProps(props)}
                {post.photoId ? <img src={`${API}/post/image/${post._id}`}  style={{width:"100%"}}/>  : undefined }
                <div className="w3-container w3-center">
                    <h2>{post.title}</h2>
                    
                    <div className="w3-container w3-center">
                    
                        <div className="display-linebreak" >
                            <div className="w3-container w3-center">
                                <div className="w3-row">
                                    <div className="w3-container w3-left">
                                        <p className="w3-opacity w3-left-align">
                                            Created from <span className="w3-tag">{post.author.name}</span> at 
                                            {` ${moment(post.created_at).date()} ${moment(post.created_at).month()} ${moment(post.created_at).year()}`}
                                        </p> 
                                    </div>
                                </div>
                            
                                <div className="w3-left-align w3-margin-bottom" id="post-text">
                                    {JSON.parse(post.description)}
                                </div>
                                <div className="w3-margin-top"></div>
                            </div>
                        
                            
                        </div>
                    </div>
                </div>
                
            </div>
            <ScrollUpButton />
            </div>
            
           
        </div>
        
    );
};

export default Post;

// export default withRouter(Post);
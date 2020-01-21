import React, { Component, useEffect } from 'react';
import Menu from './Menu';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import nl2br from 'react-newline-to-break';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import {API} from '../../config';
import noImg from '../../assets/images/no-thumbnail-medium.png'


const Post = (props) => {

    // const {post} = props.state;

    const consoleProps = (p) => {
        console.log('props ', p);
    };

    const formatString = (description) => {
        let formatted = description.replace('"','');
        console.log('formatted ', formatted);
        return formatted;
    };

    const renderImage = () => {
        if(props.isPreview) {
            return <img src={props.image}  style={{width:"100%"}} alt=""/>
        } else {
            if (props.state.post.photoId) {
                return <img src={`${API}/post/image/${props.state.post._id}`}  style={{width:"100%"}} alt=""/>
            } else {
               return <img src={noImg}  style={{width:"100%"}} alt=""/>
            };
        };
    };

    // Render at top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    

    return (
        <div className="w3-container w3-light-grey" id = "post-container">
            <Menu />

            <div className="w3-col s12" id="content">

            <div className="w3-card w3-center w3-white" id="post-content">
                {consoleProps(props)}
                <div className="w3-row w3-margin w3-center" id="post-title">
                <h2>{props.state.post.title ? props.state.post.title : props.title}</h2>

                </div>
                {renderImage()}
                <div className="w3-container w3-center">
                    
                    <div className="w3-container w3-center">
                    
                        <div className="display-linebreak" >
                            <div className="w3-container w3-center">
                                <div className="w3-row">
                                    <div className="w3-container w3-left">
                                        <p className="w3-opacity w3-left-align">
                                            Created from <span className="w3-tag">{props.state.post.author.name}</span> at 
                                            {` ${moment(props.state.post.created_at).date()} ${moment(props.state.post.created_at).month()} ${moment(props.state.post.created_at).year()}`}
                                        </p> 
                                    </div>
                                </div>
                            
                                <div className="w3-left-align w3-margin-bottom" id="post-text">
                                    {props.state.post.description ? JSON.parse(props.state.post.description) : props.desc}
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
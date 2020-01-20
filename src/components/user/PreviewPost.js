import React, { Component, useState } from 'react';
// import Menu from './Menu';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import nl2br from 'react-newline-to-break';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import {API} from '../../config';
import noImg from '../../assets/images/no-thumbnail-medium.png'


const PreviewPost = (props) => {

    // const {post} = props.state;

    const [url, setUrl] = useState('');

    const consoleProps = (p) => {
        console.log('props ', p);
        console.log('url ', url);
    };

    const formatString = (description) => {
        let formatted = description.replace('"','');
        console.log('formatted ', formatted);
        return formatted;
    };

    const createUrl = () => {
        let url = URL.createObjectURL(props.image[0]);
        setUrl(url);
        return url;
    };
    

    return (
        <div className="w3-container w3-light-grey" id = "post-container">
            {/* <Menu /> */}

            <div className="w3-col s12" id="content">

            <div className="w3-card w3-center w3-white" id="post-content">
                {consoleProps(props)}
                <img src={createUrl}  style={{width:"100%"}} alt=""/>
                <div className="w3-container w3-center">
                    <h2>{props.title}</h2>
                    
                    <div className="w3-container w3-center">
                    
                        <div className="display-linebreak" >
                            <div className="w3-container w3-center">
                                <div className="w3-row">
                                    {/* <div className="w3-container w3-left">
                                        <p className="w3-opacity w3-left-align">
                                            Created from <span className="w3-tag">{props.state.post.author.name}</span> at 
                                            {` ${moment(props.state.post.created_at).date()} ${moment(props.state.post.created_at).month()} ${moment(props.state.post.created_at).year()}`}
                                        </p> 
                                    </div> */}
                                </div>
                            
                                <div className="w3-left-align w3-margin-bottom" id="post-text">
                                    {JSON.stringify(props.desc)}
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

export default PreviewPost;

// export default withRouter(Post);
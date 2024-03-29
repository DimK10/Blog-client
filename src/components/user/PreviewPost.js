import React, { Component, useState, useEffect } from 'react';
// import Menu from './Menu';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import nl2br from 'react-newline-to-break';
import {API} from '../../config';
import noImg from '../../assets/images/no-thumbnail-medium.png';


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
        console.log(props.image[0]);
        let urlImg = window.URL.createObjectURL(props.image[0]);
        console.log('urlImg ', urlImg);
        setUrl(urlImg);
        return urlImg
    };

    useEffect(() => {
        if(props.image.length > 0 && typeof props.image !== "string") {
            createUrl();
        } else {
            setUrl(props.image);
        }
    },[props.image]);
    

    return (
       
        <div className="w3-container w3-light-grey" id = "post-container">
            

            <div className="w3-col s12 w3-light-grey" id="content">
                
            <div className="w3-card w3-center w3-white" id="post-content">
                {consoleProps(props)}
                <div className="w3-row w3-margin w3-center" id="post-title">
                <h2>{props.title}</h2>
                </div>
                {props.image.length > 0 ? <img src={url}  style={{width:"100%"}} alt=""/> : <img src={noImg}  style={{width:"100%"}} alt=""/>}
                <div className="w3-container w3-center">
                    
                    
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
                                    <div className="w3-row">
                                    <div className="w3-container w3-left">
                                        <p className="w3-opacity w3-left-align">
                                            Tags - Categories: 
                                        </p> 
                                        {props.categories.map((element) =>{
                                            console.log('category id', element._id);
                                            return (<span className="w3-tag" key={element._id} style={{ marginRight: '5px' }}>{element.title}</span>)
                                        })
}
                                    </div>
                                </div>
                                </div>
                            
                                <div className="w3-left-align w3-margin-bottom" id="post-text">
                                    {ReactHtmlParser(props.desc)}
                                </div>
                                <div className="w3-margin-top"></div>
                            </div>
                        
                            
                        </div>
                    </div>
                </div>
             
            </div>
            
            </div>
            
           
        </div>
        
    );
};

export default PreviewPost;

// export default withRouter(Post);
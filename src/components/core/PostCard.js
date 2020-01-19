import React from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import {API} from '../../config';
import FontAwesome from 'react-fontawesome';
import noImg from '../../assets/images/no-thumbnail-medium.png';


const PostCard = (props) => {

    const consoleProps = (p) => {
        console.log('props ', p);
    };
    const showShortDesc = (description) => {
        const  indexOfDot = description.indexOf('.');
        let shortDesc = description.substring(0, indexOfDot);
        console.log('shortDesc ', shortDesc);
        return shortDesc;
    };

    return(
        <div className={props.class}>
            <div className="img-container">
            {props.post.photoId 
            ? 
                <img src={`${API}/post/image/${props.post._id}`}  style={{width:"100%"}}/>  
            :  
                <img src={noImg}  style={{width:"100%"}}/>
                
            }
            </div>
            {/* fetch here post img -- style = width:100%*/}
            
            <div className="w3-container">
                <h3>
                    {/* Post Title here */}
                    {props.post.title}
                </h3>
                <h5>
                     
                    <span className="w3-opacity">{/* fetch createdAt here */}{moment(props.post.created_at).fromNow() + ' '}</span>
                        by <span className="w3-tag">{/*author here -- clickable*/}{props.post.author.name}</span>
                </h5>
            </div>
            <div className="w3-container">
                <p>
                    {/* Dummy text here.Dummy text hereDummy text hereDummy text hereDummy text hereDummy text here
                    Dummy text hereDummy text hereDummy text hereDummy text here
                    Dummy text hereDummy text hereDummy text here
                    Dummy text hereDummy text hereDummy text here. */}
                    {showShortDesc(props.post.description)}
                    {/* {JSON.stringify(props.images)} */}
                    {consoleProps(props)}
                </p>
                <div className="w3-row">
                    <div className="w3-col m8 s12">
                        <p>
                            <button className="w3-button w3-padding-large w3-white w3-border">    
                            <Link
                                to={{
                                    pathname: `/post/${props.post._id}`,
                                    state: { post: props.post}
                                }}
                            >
                                <b>READ MORE</b>
                            </Link>

                        >
                            
                            </button>
                        </p>
                    </div>
                    <div className="w3-col m4 w3-hide-small">
                        <p>
                            <span className="w3-padding-large w3-right">
                                <b>
                                    Comments
                                </b>
                                <span className="w3-tag">{/* calculate num of comments */}</span>
                            </span>
                        </p>
					</div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
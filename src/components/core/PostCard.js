import React from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import {API} from '../../config';

const PostCard = (props) => {
    return(
        <div className={props.class}>
            {props.post.photoId ? <img src={`${API}/post/image/${props.post._id}`}  style={{width:"100%"}}/>  :  <Skeleton /> }
            {/* fetch here post img -- style = width:100%*/}
            
            <div className="w3-container">
                <h3>
                    {/* Post Title here */}
                    {props.post.title}
                </h3>
                <h5>
                    Title description, 
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
                    {props.post.description}
                    {/* {JSON.stringify(props.images)} */}
                </p>
                <div className="w3-row">
                    <div className="w3-col m8 s12">
                        <p>
                            <button className="w3-button w3-padding-large w3-white w3-border">
                                <b>READ MORE</b>
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
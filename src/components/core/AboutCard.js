import React from 'react';

const AboutCard = (props) => {
    return (
       <React.Fragment>
            <div className="w3-card w3-margin w3-margin-top">               
                <div className="w3-container w3-white">
                    <h4>
                        <b>About This Blog</b>
                    </h4>
                    <p>This blog is dedicated to nature</p>
                    <div className="w3-row">
                        <div className="w3-col m8 s12">
                            <button className="w3-button w3-padding-large w3-white w3-border">
                                <b>READ MORE »</b>
                            </button>
                        </div>
                    </div>
                </div>
             </div>
            <hr>
            </hr>
       </React.Fragment>
    );
};

export default AboutCard;
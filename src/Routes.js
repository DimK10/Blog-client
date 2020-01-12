import React from 'react';
import Home from './components/core/Home';
import Post from './components/core/Post';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { connect } from 'react-redux';


const Routes = (props) => {
    const renderPost = (post) => {
        return (
            <Post post={post}/>
        );
    }
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route 
                path="/post/:postId" 
                exact
                render={({ location }) => <Post {...location} /> }  />
        </Switch>
    </BrowserRouter>
)};

// const mapStateToProps = (state) => {
//     return {
//         data: state
//     }
// }

export default Routes;

// export default connect(mapStateToProps)(Routes);
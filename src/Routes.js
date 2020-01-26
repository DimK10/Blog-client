import React from 'react';
import Home from './components/core/Home';
import Post from './components/core/Post';
import CreatePost from './components/user/CreatePost';
import CreateCategory from './components/user/CreateCategory';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserRoute from './auth/UserRoute';
import NotFound from './components/NotFound';
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
            {/** TODO - Make this a private route */}
            <UserRoute path="/create-new-post" exact component={CreatePost} />
            <UserRoute path="/create-new-category" exact component={CreateCategory} />
            <Route 
                path="/post/:postId" 
                exact
                render={({ location }) => <Post {...location} /> }  
            />
            <Route path="/404-not-found" exact component={NotFound} />
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
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './stylesheets/main.css';

import SignUpLoginTemplate from './components/member/SignUpLoginTemplate';
import Index from './components/main/Index';
import PostArticle from './components/postArticle/PostArticle';
// import PostArticle from './components/postArticle/PostTest';
// import PostArticleCategory from './components/postArticle/PostArticleCategory';
import Profile from './components/profile/Profile';
// import ProfileIndex from './components/profile/ProfileIndex';
import UploadUserPhoto from './components/member/UploadUserPhoto';
import Logout from './components/member/Logout';


import upload from './components/upload';


import TodoApp from './components/todolist/TodoApp';
import Home from './components/default/Home';
import About from './components/default/About';
import Contact from './components/default/Contact';
import Error from './components/default/Error';
import Navigation from './components/Navigation';

import Swipe from './components/swipeTest/Swipe'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/' component={SignUpLoginTemplate} exact />
                    <Route path='/index' component={Index} />
                    <Route path='/post' component={PostArticle} />
                    {/*<Route path='/post_category' component={PostArticleCategory}/>*/}
                    <Route path='/profile' component={Profile} />
                    {/*<Route path='/profile' component={ProfileIndex} />*/}
                    <Route path='/UploadUserPhoto' component={UploadUserPhoto} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/upload' component={upload} />

                    <Route path='/todo' component={TodoApp} />
                    <Route path='/home' component={Home} exact />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />

                    <Route path='/swipe' component={Swipe} />

                    <Route component={Error} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}
// <Navigation />

export default App;
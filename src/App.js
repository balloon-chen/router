import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './stylesheets/main.css';

import SignUpLoginTemplate from './components/member/SignUpLoginTemplate';
import Index from './components/main/Index';
import PostArticle from './components/PostArticle';
import Profile from './components/profile/Profile';


import upload from './components/upload';


import TodoApp from './components/todolist/TodoApp';
import Home from './components/default/Home';
import About from './components/default/About';
import Contact from './components/default/Contact';
import Error from './components/default/Error';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/' component={SignUpLoginTemplate} exact />
                    <Route path='/index' component={Index} />
                    <Route path='/post' component={PostArticle} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/upload' component={upload} />

                    <Route path='/todo' component={TodoApp} />
                    <Route path='/home' component={Home} exact />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route component={Error} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}
// <Navigation />

export default App;
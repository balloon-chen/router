import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './stylesheets/main.css';

import SignUpLoginTemplate from './components/SignUpLoginTemplate';
import Index from  './components/Index';
import PostArticle from './components/PostArticle';

import TodoApp from './components/TodoApp';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
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
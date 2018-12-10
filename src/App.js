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

import Swipe from './components/swipeTest/Swipe';
import UnderMaintenance from './components/UnderMaintenance';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isUnderMaintenance: false
        };
        this.toggleRenderMode = this.toggleRenderMode.bind(this);
    }

    toggleRenderMode(){
        const { isUnderMaintenance } = this.state;
        this.setState({isUnderMaintenance: !isUnderMaintenance});
    }

    componentDidMount(){
        this.setState({isUnderMaintenance: false});
    }

    renderNormalMode() {
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
                        <Route path='/shutdown' component={UnderMaintenance} />

                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
    renderUnderMaintenanceMode() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/' component={UnderMaintenance} exact />
                        <Route path='/index' component={UnderMaintenance} />
                        <Route path='/post' component={UnderMaintenance} />
                        {/*<Route path='/post_category' component={PostArticleCategory}/>*/}
                        <Route path='/profile' component={UnderMaintenance} />
                        {/*<Route path='/profile' component={ProfileIndex} />*/}
                        <Route path='/UploadUserPhoto' component={UnderMaintenance} />
                        <Route path='/logout' component={UnderMaintenance} />
                        <Route path='/upload' component={UnderMaintenance} />

                        <Route path='/todo' component={UnderMaintenance} />
                        <Route path='/home' component={UnderMaintenance} exact />
                        <Route path='/about' component={UnderMaintenance} />
                        <Route path='/contact' component={UnderMaintenance} />

                        <Route path='/swipe' component={UnderMaintenance} />
                        <Route path='/shutdown' component={UnderMaintenance} />

                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
    render() {
        const { isUnderMaintenance } = this.state;
        return (isUnderMaintenance) ? this.renderUnderMaintenanceMode() : this.renderNormalMode();
    }
}

export default App;
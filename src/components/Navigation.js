import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../stylesheets/navigation.css'

class Navigation extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    render(){
        return (
            <div className="navigationBar">
                <NavLink className="navigationText" to='/post'>Post</NavLink>
                <NavLink className="navigationText" to='/index'>Index</NavLink>
                <NavLink className="navigationText" to='/'>Logout</NavLink>
            </div>
        );
    }
}

export default Navigation;

/*
<NavLink to='/todo'>Todo</NavLink>
<NavLink to='/home'>Home</NavLink>
<NavLink to='/about'>About</NavLink>
<NavLink to='/contact'>Contact</NavLink>
<Link
    to={{
        pathname: '/contact',
        state: { message: 'hello, im a passed message!' }
    }}
>xxx
</Link>
*/
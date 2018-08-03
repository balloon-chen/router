import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Navigation extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    render(){
        return (
            <div>
                <NavLink to='/'>Login</NavLink>
                <NavLink to='/post'>Post</NavLink>
                <NavLink to='/index'>Index</NavLink>
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
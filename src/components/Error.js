import React from 'react';

class Error extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    render(){
        return (
            <div>
                <p>Error: Page does not exist!!!!!</p>
            </div>
        );
    }
}

export default Error;
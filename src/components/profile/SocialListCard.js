import React from 'react';
import "../../stylesheets/articleItem.css";
import "../../stylesheets/articleWhoLikes.css"

class SocialListCard extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            apiURL: 'http://140.119.163.194:3000/',
            userData: []
        };
    }

    componentDidMount(){
        const { element } = this.props;
        fetch(this.state.apiURL + 'search_user', {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                let userData = res.filter(function(user){
                    return user._id === element;
                });
                this.setState({userData: userData[0]});
            });
    }

    render(){
        const { userData } = this.state;
        let _id = userData._id;
        let userName = userData.userName;
        let avatarLink = userData.avatarLink;

        return (
            <div>
                <div className="flex">
                    <div className="userPhoto" style={{backgroundImage: 'url('+avatarLink+')'}}> </div>
                    <span>{userName}</span>
                </div>
            </div>
        );
    }
}

export default SocialListCard;
import React from 'react';
import "../../stylesheets/articleItem.css";
import "../../stylesheets/articleWhoLikes.css"

class SocialListCard extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            apiURL: 'http://140.119.163.194:3004/',
            userData: [],
            avatarLink: ''
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
                let avatarLink = this.state.userData.avatarLink === undefined ? '' : this.state.userData.avatarLink[this.state.userData.avatarLink.length-1];
                this.setState({avatarLink: avatarLink});
            });
    }

    render(){
        const { userData } = this.state;
        let _id = userData._id;
        let userName = userData.userName;
        const { avatarLink } = this.state;

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
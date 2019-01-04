import React from 'react';
import { Redirect } from 'react-router-dom';

class ProfileArticle extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),

            redirectToPost: false,

            articlesInProfile: this.props.articlesInProfile,
            articlesInProfileDisplay: 'invisible',

            square01_imgMaskInvisible: 'invisible'
        };
        this.renderSquare01Mode = this.renderSquare01Mode.bind(this);
        this.renderSquare02Mode = this.renderSquare02Mode.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.addSquare01_imgMask = this.addSquare01_imgMask.bind(this);
    }

    redirectToProfile(event){
        switch (event.target.name){
            case 'author':{
                localStorage.setItem("whichUserID", event.target.value);
                // this.setState({redirectToProfile: true});
                // 🦄
                window.location.assign('https://dingdong-60a19.firebaseapp.com/profile');
                break;
            }
            default: {
                break;
            }
        }
    }

    addSquare01_imgMask(){
        this.setState({square01_imgMaskInvisible: ''});
    }

    componentDidMount(){
        if (this.state.articlesInProfile){
            let id = localStorage.getItem("whichUserID") ? localStorage.getItem("whichUserID") : this.state.currentUserID;
            if (this.props.authorID === id){
                this.setState({articlesInProfileDisplay: ''});
            }
            else {
                this.setState({articlesInProfileDisplay: 'invisible'});
            }
        }
        else {
            this.setState({articlesInProfileDisplay: ''});
        }
    }

    // 渲染編輯畫面
    renderSquare02Mode(){

    }
    // 渲染一般畫面
    renderSquare01Mode(){
        const { redirectToProfile } = this.state;
        const { square01_imgMaskInvisible } = this.state;
        if (redirectToProfile) {
            return <Redirect push to="/profile" />;
        }

        let { mediaLink } = this.props;
        let mediaLinkFixed = ( mediaLink === '') ? "https://res.cloudinary.com/dzzdz1kvr/image/upload/v1544314816/Social_Media/mediaLink/y9fy1wbtyfcwl9fs2qy7.jpg" : mediaLink;

        return (
            <div className={'square01 '+this.state.articlesInProfileDisplay}>
                {/*<img src={mediaLinkFixed} alt="" className='test2'/>*/}
                <div className={'square01_imgMask '+square01_imgMaskInvisible}> </div>
                <div className='square01_img' style={{backgroundImage: 'url('+mediaLinkFixed+')'}} onClick={this.addSquare01_imgMask}> </div>
            </div>
        );
    }
    // 判斷渲染一般畫面或編輯畫面
    render(){
        return this.state.editable ? this.renderSquare02Mode() : this.renderSquare01Mode();
    }
}

export default ProfileArticle;
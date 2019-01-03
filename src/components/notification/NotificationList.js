import React from 'react';
import '../../stylesheets/notificationList.css';

class NotificationList extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            invisible: 'invisible'
        };
        this.toggleWhoLikesInvisible = this.toggleWhoLikesInvisible.bind(this);
    }

    toggleWhoLikesInvisible(){
        if (this.state.invisible === 'invisible')
            this.setState({invisible: ''});
        else
            this.setState({invisible: 'invisible'});
    }

    // 渲染未按愛心的畫面
    render(){
        const { time } = this.props;
        // const timeForm = this.timeConverter(time);
        const timeForm = '12月24日 16:54';
        const squarePhoto = 'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1546486847/Social_Media/mediaLink/wskadnapvgoxpz06dkuw.jpg';

        return (
            <div>

                <div className="aaa notificationListBackground">
                    <div className='notificationListUnread'> </div>
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className='notificationListUnread'> </div>
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

                <div className="aaa notificationListBackground">
                    <div className="left">
                        <button name="author" value='authorID' className='buttonNoneStyle'>
                            <div className="notificationUserPhoto" style={{'backgroundImage': 'url('+'https://res.cloudinary.com/dzzdz1kvr/image/upload/v1545977318/Social_Media/avatar/yvnpauuawzicfhzrcpwq.jpg'+')'}}> </div>
                        </button>
                        <div className="nameLabel">
                            <button name="author" value='authorID'  className='buttonNoneStyle'>
                                <span className="notificationUser">顏良羽</span>
                                <span className='notificationMessage'>分享一張照片</span>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm}</div>
                        </div>
                    </div>
                    <img src={squarePhoto} className='notificationPhoto' alt="iconMenu"/>
                </div>
                <div className='notificationSeparationLine'> </div>

            </div>
        );
    }
    // 渲染已按愛心的畫面
    // renderLikeMode(){
    //     const { articleID } = this.props;
    //     const { numberOfLikes } = this.props;
    //     const { onHandleLike } = this.props;
    //     const { whoLikes } = this.props;
    //     const { invisible } = this.state;
    //
    //     const whoLikesElements = whoLikes.map((whoLike) =>
    //         (<div key={whoLike}>
    //             <ArticleWhoLikes
    //                 whoLike = {whoLike}
    //             />
    //         </div>)
    //     );
    //
    //     return (
    //         <div>
    //
    //         </div>
    //     );
    // }
    // 判斷渲染已按愛心的畫面或未按愛心的畫面
    // render(){
    //     return this.props.likeOrDislike ? this.renderLikeMode() : this.renderDislikeMode();
    // }
}

export default NotificationList;
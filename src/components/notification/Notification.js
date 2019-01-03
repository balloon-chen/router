import React from 'react';
import iconMenu from "../../images/iconMenu.svg";
import NotificationList from "./NotificationList";

class Notification extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            innerHeight: window.innerHeight-50
        };
    }

    render(){
        return (
            <div className='notificationCardBackground' style={{height: this.state.innerHeight+'px'}}>
                <div className='flex justify-content-space-between notificationBackground'>
                    <img src={iconMenu} alt="iconMenu" className='navigationIconSmall opacity-zero'/>
                    <div className='notificationFont'>通知</div>
                    <img src={iconMenu} alt="iconMenu" className='navigationIconSmall'/>
                </div>
                <NotificationList />
            </div>
        );
    }
}

export default Notification;
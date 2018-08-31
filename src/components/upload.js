import React from 'react';
import Navigation from './Navigation';

class upload extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            myImg: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.xxx = this.xxx.bind(this);
    }

    // 取得輸入值
    handleChange(event) {
        switch (event.target.name){
            case 'uploadImage':{
                console.log('1: '+event.target.value);
                console.log('2: '+event.target.files[0]);
                // this.setState({myImg: event.target.value});
                this.setState({myImg: event.target.files[0]});
                break;
            }
            default: {
                break;
            }
        }
    }
    // 提交表單
    handleSubmit(event) {
        this.fetch();
        event.preventDefault();
    }
    // 連接 API 並填入文章內容
    fetch() {
        let formData = new FormData();

        console.log('this.state.myImg: ' + this.state.myImg);

        // formData.append('authorID', this.state.currentToken);
        formData.append('userID', "5b88b9ce89da36146a8891e3");
        // formData.append('category', '沒有分類');
        // formData.append('content', '沒有內文');
        // formData.append('title', '我不是標題');
        // formData.append('privacy', 'public');
        formData.append('image', this.state.myImg);
        formData.append('photoType', 'jpg');

        fetch('http://140.119.163.194:3000/upload_backGroundPhoto', {
            method: 'post',
            body: formData
        }).then(res=>res.json())
            .then(res => console.log(res));
    }

    componentDidMount(){
        this.xxx();
    }
    // 連接 API 並填入文章內容
    xxx() {
        fetch('http://140.119.163.194:3000/search_profileByUserID', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: '5b88b9ce89da36146a8891e3'})
        }).then(res=>res.json())
            .then(res => console.log(res));
    }

    render(){
        return (
            <div>
                <Navigation />
                <label>
                    <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <input name="uploadImage" type="file" onChange={this.handleChange} />
                        <input className="submit" type="submit" value="完成" />
                    </form>
                </label>
            </div>
        )
    }
}

export default upload;
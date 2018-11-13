import React from 'react';
import { Redirect } from 'react-router-dom';

class PostArticleCategory extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            redirectToPost: false,
            categoryDisplay01: '',
            categoryDisplay02: '',
            categoryDisplay03: '',
            categoryDisplay04: '',
            categoryDisplay05: '',
            categoryDisplay06: '',
            categoryDisplay07: '',
            categoryDisplay08: '',
            categoryDisplay09: '',
            categoryDisplay10: '',
            categoryDisplay11: '',
            categoryDisplay12: '',
            categoryDisplay13: '',
        };
        this.categoryDisplay01 = this.categoryDisplay01.bind(this);
        this.categoryDisplay02 = this.categoryDisplay02.bind(this);
        this.categoryDisplay03 = this.categoryDisplay03.bind(this);
        this.categoryDisplay04 = this.categoryDisplay04.bind(this);
        this.categoryDisplay05 = this.categoryDisplay05.bind(this);
        this.categoryDisplay06 = this.categoryDisplay06.bind(this);
        this.categoryDisplay07 = this.categoryDisplay07.bind(this);
        this.categoryDisplay08 = this.categoryDisplay08.bind(this);
        this.categoryDisplay09 = this.categoryDisplay09.bind(this);
        this.categoryDisplay10 = this.categoryDisplay10.bind(this);
        this.categoryDisplay11 = this.categoryDisplay11.bind(this);
        this.categoryDisplay12 = this.categoryDisplay12.bind(this);
        this.categoryDisplay13 = this.categoryDisplay13.bind(this);
    }

    categoryDisplay01(){
        this.state.categoryDisplay01 === ''?
            this.setState({categoryDisplay01: 'display-block'}) :
            this.setState({categoryDisplay01: ''});
    }
    categoryDisplay02(){
        this.state.categoryDisplay02 === ''?
            this.setState({categoryDisplay02: 'display-block'}) :
            this.setState({categoryDisplay02: ''});
    }
    categoryDisplay03(){
        this.state.categoryDisplay03 === ''?
            this.setState({categoryDisplay03: 'display-block'}) :
            this.setState({categoryDisplay03: ''});
    }
    categoryDisplay04(){
        this.state.categoryDisplay04 === ''?
            this.setState({categoryDisplay04: 'display-block'}) :
            this.setState({categoryDisplay04: ''});
    }
    categoryDisplay05(){
        this.state.categoryDisplay05 === ''?
            this.setState({categoryDisplay05: 'display-block'}) :
            this.setState({categoryDisplay05: ''});
    }
    categoryDisplay06(){
        this.state.categoryDisplay06 === ''?
            this.setState({categoryDisplay06: 'display-block'}) :
            this.setState({categoryDisplay06: ''});
    }
    categoryDisplay07(){
        this.state.categoryDisplay07 === ''?
            this.setState({categoryDisplay07: 'display-block'}) :
            this.setState({categoryDisplay07: ''});
    }
    categoryDisplay08(){
        this.state.categoryDisplay08 === ''?
            this.setState({categoryDisplay08: 'display-block'}) :
            this.setState({categoryDisplay08: ''});
    }
    categoryDisplay09(){
        this.state.categoryDisplay09 === ''?
            this.setState({categoryDisplay09: 'display-block'}) :
            this.setState({categoryDisplay09: ''});
    }
    categoryDisplay10(){
        this.state.categoryDisplay10 === ''?
            this.setState({categoryDisplay10: 'display-block'}) :
            this.setState({categoryDisplay10: ''});
    }
    categoryDisplay11(){
        this.state.categoryDisplay11 === ''?
            this.setState({categoryDisplay11: 'display-block'}) :
            this.setState({categoryDisplay11: ''});
    }
    categoryDisplay12(){
        this.state.categoryDisplay12 === ''?
            this.setState({categoryDisplay12: 'display-block'}) :
            this.setState({categoryDisplay12: ''});
    }
    categoryDisplay13(){
        this.state.categoryDisplay13 === ''?
            this.setState({categoryDisplay13: 'display-block'}) :
            this.setState({categoryDisplay13: ''});
    }

    render(){
        const { redirectToPost } = this.state;
        if (redirectToPost) {
            return <Redirect push to="/post" />;
        }
        const { categoryDisplay01 } = this.state;
        const { categoryDisplay02 } = this.state;
        const { categoryDisplay03 } = this.state;
        const { categoryDisplay04 } = this.state;
        const { categoryDisplay05 } = this.state;
        const { categoryDisplay06 } = this.state;
        const { categoryDisplay07 } = this.state;
        const { categoryDisplay08 } = this.state;
        const { categoryDisplay09 } = this.state;
        const { categoryDisplay10 } = this.state;
        const { categoryDisplay11 } = this.state;
        const { categoryDisplay12 } = this.state;
        const { categoryDisplay13 } = this.state;

        const { setCategory } = this.props;
        const { postArticleDisplay } = this.props;

        return (
            <div>
                <div className="flex justify-content-space-between PostArticle_Nav">
                    <span onClick={() => postArticleDisplay && postArticleDisplay()}>＜</span>
                    <span>選擇類別</span>
                    <span> </span>
                </div>
                <div className='search'><span>Ｑ</span><span>搜尋</span></div>
                <div className='categorySelect'>
                    <div onClick={this.categoryDisplay01}>
                        <span className='categoryMain'>創作</span>
                        <span>v</span>
                        <div className={'category category01 '+categoryDisplay01} onClick={() => setCategory && setCategory('漫畫塗鴉')}>漫畫塗鴉</div>
                        <div className={'category category01 '+categoryDisplay01} onClick={() => setCategory && setCategory('圖文創作')}>圖文創作</div>
                        <div className={'category category01 '+categoryDisplay01} onClick={() => setCategory && setCategory('小說連載')}>小說連載</div>
                        <div className={'category category01 '+categoryDisplay01} onClick={() => setCategory && setCategory('散文筆記')}>散文筆記</div>
                        <div className={'category category01 '+categoryDisplay01} onClick={() => setCategory && setCategory('藝文評論')}>藝文評論</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay02}>
                        <span className='categoryMain'>旅遊</span>
                        <span>v</span>
                        <div className={'category category02 '+categoryDisplay02} onClick={() => setCategory && setCategory('國內旅遊')}>國內旅遊</div>
                        <div className={'category category02 '+categoryDisplay02} onClick={() => setCategory && setCategory('國外旅遊')}>國外旅遊</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay03}>
                        <span className='categoryMain'>生活</span>
                        <span>v</span>
                        <div className={'category category03 '+categoryDisplay03} onClick={() => setCategory && setCategory('收藏嗜好')}>收藏嗜好</div>
                        <div className={'category category03 '+categoryDisplay03} onClick={() => setCategory && setCategory('生活綜合')}>生活綜合</div>
                        <div className={'category category03 '+categoryDisplay03} onClick={() => setCategory && setCategory('KUSO')}>KUSO</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay04}>
                        <span className='categoryMain'>運動</span>
                        <span>v</span>
                        <div className={'category category04 '+categoryDisplay04} onClick={() => setCategory && setCategory('運動體育')}>運動體育</div>
                        <div className={'category category04 '+categoryDisplay04} onClick={() => setCategory && setCategory('活動紀錄')}>活動紀錄</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay05}>
                        <span className='categoryMain'>娛樂</span>
                        <span>v</span>
                        <div className={'category category05 '+categoryDisplay05} onClick={() => setCategory && setCategory('視聽娛樂')}>視聽娛樂</div>
                        <div className={'category category05 '+categoryDisplay05} onClick={() => setCategory && setCategory('偶像明星')}>偶像明星</div>
                        <div className={'category category05 '+categoryDisplay05} onClick={() => setCategory && setCategory('電影評論')}>電影評論</div>
                        <div className={'category category05 '+categoryDisplay05} onClick={() => setCategory && setCategory('音樂評析')}>音樂評析</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay06}>
                        <span className='categoryMain'>時尚</span>
                        <span>v</span>
                        <div className={'category category06 '+categoryDisplay06} onClick={() => setCategory && setCategory('時尚流行')}>時尚流行</div>
                        <div className={'category category06 '+categoryDisplay06} onClick={() => setCategory && setCategory('美容彩妝')}>美容彩妝</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay07}>
                        <span className='categoryMain'>科技</span>
                        <span>v</span>
                        <div className={'category category07 '+categoryDisplay07} onClick={() => setCategory && setCategory('科技生活')}>科技生活</div>
                        <div className={'category category07 '+categoryDisplay07} onClick={() => setCategory && setCategory('攝影寫真')}>攝影寫真</div>
                        <div className={'category category07 '+categoryDisplay07} onClick={() => setCategory && setCategory('電玩動漫')}>電玩動漫</div>
                        <div className={'category category07 '+categoryDisplay07} onClick={() => setCategory && setCategory('汽機車')}>汽機車</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay08}>
                        <span className='categoryMain'>學習</span>
                        <span>v</span>
                        <div className={'category category08 '+categoryDisplay08} onClick={() => setCategory && setCategory('職場甘苦')}>職場甘苦</div>
                        <div className={'category category08 '+categoryDisplay08} onClick={() => setCategory && setCategory('校園生活')}>校園生活</div>
                        <div className={'category category08 '+categoryDisplay08} onClick={() => setCategory && setCategory('進修深造')}>進修深造</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay09}>
                        <span className='categoryMain'>財經</span>
                        <span>v</span>
                        <div className={'category category09 '+categoryDisplay09} onClick={() => setCategory && setCategory('財經企管')}>財經企管</div>
                        <div className={'category category09 '+categoryDisplay09} onClick={() => setCategory && setCategory('政論人文')}>政論人文</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay10}>
                        <span className='categoryMain'>命理</span>
                        <span>v</span>
                        <div className={'category category10 '+categoryDisplay10} onClick={() => setCategory && setCategory('星座算命')}>星座算命</div>
                        <div className={'category category10 '+categoryDisplay10} onClick={() => setCategory && setCategory('心理測驗')}>心理測驗</div>
                        <div className={'category category10 '+categoryDisplay10} onClick={() => setCategory && setCategory('宗教超自然')}>宗教超自然</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay11}>
                        <span className='categoryMain'>心情</span>
                        <span>v</span>
                        <div className={'category category11 '+categoryDisplay11} onClick={() => setCategory && setCategory('戀愛情事')}>戀愛情事</div>
                        <div className={'category category11 '+categoryDisplay11} onClick={() => setCategory && setCategory('心情日記')}>心情日記</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay12}>
                        <span className='categoryMain'>美食</span>
                        <span>v</span>
                        <div className={'category category12 '+categoryDisplay12} onClick={() => setCategory && setCategory('美味食記')}>美味食記</div>
                        <div className={'category category12 '+categoryDisplay12} onClick={() => setCategory && setCategory('食譜分享')}>食譜分享</div>
                    </div>
                    <hr className='hrLine'/>
                    <div onClick={this.categoryDisplay13}>
                        <span className='categoryMain'>家庭</span>
                        <span>v</span>
                        <div className={'category category12 '+categoryDisplay13} onClick={() => setCategory && setCategory('親子育兒')}>親子育兒</div>
                        <div className={'category category12 '+categoryDisplay13} onClick={() => setCategory && setCategory('寵物日記')}>寵物日記</div>
                        <div className={'category category12 '+categoryDisplay13} onClick={() => setCategory && setCategory('結婚紀錄')}>結婚紀錄</div>
                        <div className={'category category12 '+categoryDisplay13} onClick={() => setCategory && setCategory('醫療保健')}>醫療保健</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostArticleCategory;
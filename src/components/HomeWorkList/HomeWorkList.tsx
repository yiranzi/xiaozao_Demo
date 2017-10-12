

import * as React from "react";
import * as className from "./style/style.less";
import { Timeline } from 'antd';


interface PropsTypes {
    homeWorkInfo: [
        {
            title: String,
            content: String,
            id: Number,
        }
    ]
    onHomeWorkShowClick: Function, // 点击显示作业的按钮
    onClickHomeWorkList: Function, // 点击某一道题
}

interface StateTypes {
}

class HomeWorkList extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.onHomeWorkShowClick = this.onHomeWorkShowClick.bind(this);
        this.onClickHomeWorkList = this.onClickHomeWorkList.bind(this);
    }

    render() {
        return(<div className={className.HomeWorkList}>
            {this.renderTitle()}
            {this.renderQuestionList()}
        </div>);
    }

    renderTitle() {
        console.log(this.props)
        return(<div onClick = {this.onHomeWorkShowClick} className={className.title}>
            <p>我的作业</p>
        </div>)
    }

    // 点击作业按钮回调
    onHomeWorkShowClick() {
        this.props.onHomeWorkShowClick(false);
    }

    // 问题列表
    renderQuestionList() {
        let arr = [];
        for ( let i = 0; i < this.props.homeWorkInfo.length; i++ ) {
            arr.push(<div className={className.sub} >
                <div className={className.chapterTitle}>{this.props.homeWorkInfo[i].title}</div>
                <div className={className.chapterContent} onClick = {this.onClickHomeWorkList.bind(this, this.props.homeWorkInfo[i].id)}>{this.props.homeWorkInfo[i].content}</div>
            </div>)
        }
        return(<div className={className.list}>
            {arr}
        </div>)
    }

    // 点击问题列表
    onClickHomeWorkList(id) {
        this.props.onClickHomeWorkList(id);
    }
}

export default HomeWorkList;
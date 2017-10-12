/**
 * Created by ichangtou on 2017/8/30.
 */

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
    onHomeWorkShowClick: Function, //
    onClickHomeWorkList: Function,
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

    onClickHomeWorkList(id) {
        this.props.onClickHomeWorkList(id);
    }
}

export default HomeWorkList;
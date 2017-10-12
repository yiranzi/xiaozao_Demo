//这是一个

import * as React from "react";
import * as className from "./style/style.less";

import LessonList from "@/components/LessonList/LessonList/";//tabbar
import HomeWorkList from "@/components/HomeWorkList/HomeWorkList";//pop弹窗页
import LessonContent from "@/components/LessonContent/LessonContent";//主内容页

interface PropsTypes {

}

interface StateTypes {

}

class Main extends React.Component<PropsTypes, StateTypes> {
    currentChoose = 0;// 记录用户点击.
    constructor(props: PropsTypes) {
        super(props);
        this.onChooseBar = this.onChooseBar.bind(this);// 点击章节
        this.onInnerBarClick = this.onInnerBarClick.bind(this);// 点击小节
        this.onHomeWorkShowClick = this.onHomeWorkShowClick.bind(this);// 点击显示作业列表
        this.onClickHomeWorkList = this.onClickHomeWorkList.bind(this);// 点击作业列表

        //
        this.state = {
            currentChapterIndex: 0,
            currentChapterClick: 0,
            currentSubIndex: 0,
            showHomeWork: false,
        }
    }

    render() {
        if(!this.props.lessonInfo.chapter || this.props.lessonInfo.chapter.length === 0) {
            return;
        }
        return(<div className = {className.Main}>
            <div className={className.lessonList}>{this.renderTabbar()}</div>
            <div className={className.lessonContent}>{this.renderContent()}</div>
            {this.renderHomeWork()}
        </div>);
    }
    /*
    1
     */
    // 渲染课程列表
    renderTabbar() {
        console.log(this.state.currentChapterClick)
        return(<div className = {className.lessonList}>
            <LessonList currentChapterClick = {this.state.currentChapterClick} currentChapterIndex = {this.state.currentChapterIndex} currentSubIndex = {this.state.currentSubIndex} onChooseBar = {this.onChooseBar} onInnerBarClick = {this.onInnerBarClick} lessonInfo = {this.props.lessonInfo} defaultActiveKey = {this.state.currentChapterIndex}></LessonList>
        </div>)
    }

    // 点击章节回调
    onChooseBar(key) {
        this.setState({
            currentChapterClick: key
        })
    }

    // 点击小节回调
    onInnerBarClick(key) {
        this.setState({
            currentChapterIndex: this.state.currentChapterClick,
            currentSubIndex: key,
        })
    }
    /*
     2
     */
    // 渲染课程内容
    renderContent() {
        console.log('renderContent');
        // 从列表中获取标题
        let chapter = this.props.lessonInfo.chapter[this.state.currentChapterIndex];
        let subContent = chapter.sub[this.state.currentSubIndex];
        let chapterTitle = subContent.subTitle;
        return(<div className={className.mid}><LessonContent onHomeWorkShowClick = {this.onHomeWorkShowClick} chapterContent = {this.props.lessonContent[this.state.currentChapterIndex][this.state.currentSubIndex]} chapterTitle = {chapterTitle}></LessonContent></div>)
    }

    // 作业弹框回调
    onHomeWorkShowClick(result) {
        // let result = this.state.showHomeWork;
        // result = !result;
        this.setState({
            showHomeWork: result,
        })
    }
    /*
     3
     */
    // 渲染作业弹框
    renderHomeWork() {

        let homeWorkWidth = this.state.showHomeWork ? 320 : 0;
        let style = {
            width: `${homeWorkWidth}px`
        }
        return(<div style = {style} className={className.homeWork}>
            <HomeWorkList homeWorkInfo = {this.props.homeWorkInfo} onClickHomeWorkList = {this.onClickHomeWorkList} onHomeWorkShowClick = {this.onHomeWorkShowClick}></HomeWorkList>
        </div>)
    }

    //
    onClickHomeWorkList(questionId) {
        this.getQuestionIndex(questionId);
    }

    //
    getQuestionIndex(questionId) {
        let chapter;
        let innerContent;
        for ( let i = 0; i < this.props.lessonInfo.chapter.length; i++ ) {
            chapter = this.props.lessonInfo.chapter[i];
            for ( let j = 0; j < chapter.sub.length; j++) {
                innerContent = chapter.sub[j];
                if ( innerContent.id === questionId) {
                    this.setState({
                        currentChapterIndex: i,
                        currentSubIndex: j,
                    })
                }
            }
        }
    }
}

Main.defaultProps = {
    // 获取到的课程信息
    lessonInfo: {
        lessonTitle: '数据分析课程',
        chapter: [
            {
                chapterTitle: '第一章',
                sub: [
                    {
                        subTitle: '1 数据分析的基本原则',
                        type: 'lesson',
                        id: 0,
                    },
                    {
                        subTitle: '2 从大量数据中发现问题',
                        type: 'lesson',
                        id: 1,
                    },
                    {
                        subTitle: '3 第一章作业',
                        type: 'question',
                        id: 0,
                    },
                ]
            },
            {
                chapterTitle: '第二章',
                sub: [
                    {
                        subTitle: '1 常用的工具',
                        type: 'lesson',
                        id: 3,
                    },
                    {
                        subTitle: '2 工具选择',
                        type: 'lesson',
                        id: 4,
                    },
                    {
                        subTitle: '3 第二章作业',
                        type: 'question',
                        id: 1,
                    },
                ]
            },
        ]
    },

    // 获取到的课程内容
    lessonContent: [
        //title
        [
            {
                content: '数据分析的基本原则是要有合理数据',
            },
            {
                content: '发现问题首先要有大量数据',
            },
            {
                content: '第一章作业..作业..',
            },
        ],
        [
            {
                content: '常用工具有excel',
            },
            {
                content: 'python也不错 excel也不错',
            },
            {
                content: '第二章作业..作业..',
            },
        ],

    ],

    // 题目列表
    homeWorkInfo: [
        {
            title: '第一章作业',
            content: '作业题目是...',
            id: 0
        },
        {
            title: '第二章作业',
            content: '作业题目是....',
            id: 1
        },
    ],


}

export default Main;
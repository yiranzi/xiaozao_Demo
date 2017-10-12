
import * as React from "react";
import * as className from "./style/style.less";
import { Collapse } from 'antd';
import { Timeline } from 'antd';
const Panel = Collapse.Panel;


interface PropsTypes {
    lessonInfo: [
        {
            lessonTitle: String,
            chapter: [
                {
                    chapterTitle: String,
                    sub: [
                        {
                            subTitle: String,
                            type: String,
                            id: Number,
                        }
                    ]
                }
            ],

        }
    ]
    onChooseBar: Function, // 点击章节
    onInnerBarClick: Function, //点击小节
    defaultActiveKey: Number, //默认打开第几个
}


class LessonList extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.onInnerBarClick = this.onInnerBarClick.bind(this);
        this.onChooseBar = this.onChooseBar.bind(this);
    }

    render() {
        return(<div className={className.LessonList}>
            {this.renderTitle()}
            <div className={className.list}>{this.renderList()}</div>
        </div>);
    }

    // 标题
    renderTitle() {
        let color = this.props.currentChapterIndex;
        let style = {

        }
        return(<div className={className.title}><p>{this.props.lessonInfo.lessonTitle}</p></div>)
    }

    // 渲染课程列表
    renderList() {
        let color = this.props.currentSubIndex;
        let styleTitle = {}


        let arr = [];

        //章节标题填充
        for ( let i = 0; i < this.props.lessonInfo.chapter.length; i++ ) {
            console.log('padding')

            if(i == this.props.currentChapterClick) {
                styleTitle = {
                    backgroundColor: 'red',
                }
            } else {
                styleTitle = {
                }
            }


            arr.push(<Panel style = {styleTitle} className={className.panelHeader} header={this.props.lessonInfo.chapter[i].chapterTitle} key={i}>
                {/*渲染小节*/}
                {this.renderInner(this.props.lessonInfo.chapter[i], i)}
            </Panel>)
        }

        //放入collapse内部并返回
        return(<Collapse  accordion defaultActiveKey={[`${this.props.defaultActiveKey}`]} onChange={this.onChooseBar}>
            {arr}
        </Collapse>)
    }

    // 渲染小节列表
    renderInner(chapter, currentChapter) {
        let arr = [];
        let styleContent = {}
        for ( let i = 0; i < chapter.sub.length; i++ ) {
            // 如果小节选中 并且 章节也选中
            if(i == this.props.currentSubIndex && currentChapter == this.props.currentChapterIndex) {
                styleContent = {
                    color: 'red',
                }
            } else {
                styleContent = {
                }
            }
            arr.push(<Timeline.Item style = {styleContent} onClick = {this.onInnerBarClick.bind(this, i)}>{chapter.sub[i].subTitle}</Timeline.Item>)
        }
        return arr;
    }

    // 点击章节
    onChooseBar(index) {
        this.props.onChooseBar(index)
    }

    // 点击小节
    onInnerBarClick(index) {
        this.props.onInnerBarClick(index);
    }


}

export default LessonList;
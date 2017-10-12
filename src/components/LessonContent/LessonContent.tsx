/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";



interface PropsTypes {
    chapterTitle: String,
    chapterContent: String,
    onHomeWorkShowClick: Function,
}


class LessonContent extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.onHomeWorkShowClick = this.onHomeWorkShowClick.bind(this);
    }

    render() {
        if(!this.props.chapterContent) {
            return <div>null</div>
        }
        return(<div className={className.LessonContent}>
            {this.renderTitle()}
            {this.renderContent()}
        </div>);
    }

    // 标题
    renderTitle() {
        return(<div className={className.title}>
            <p>{this.props.chapterTitle}</p>
            <div className={className.button} onClick = {this.onHomeWorkShowClick}>click</div>
        </div>)
    }

    // 内容
    renderContent() {
        return(<div className={className.content}>
            <p>{this.props.chapterContent.content}</p>
        </div>)
    }

    // 点击作业按钮回调(点击显示作业)
    onHomeWorkShowClick() {
        this.props.onHomeWorkShowClick(true);
    }


}

export default LessonContent;
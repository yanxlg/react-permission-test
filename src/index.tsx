/**
 * @disc:React 权限管理组件及自动化测试支持组件
 * @type:Component
 * @author:yanxinaliang
 * @time：2018/9/4 11:14
 */

import * as React from "react";
import {ReactNode} from 'react';
import * as ReactDOM from 'react-dom';

declare interface IReactPermissionTest{
    permission?:string;// 权限
    id?:string;// 标签id
    children:ReactNode;
    permissions?:string[];// 权限列表,通常放在Redux中
}

class ReactPermissionTest extends React.Component<IReactPermissionTest>{
    private hasPermission(){
        const {permissions,permission} = this.props;
        if(permissions&&permission){
            return permissions.find((per)=>per===permission);
        }
        return true;
    }
    componentDidMount(){
        // id 添加
        const {id} = this.props;// 如果没有id或者没有权限则放弃
        const hasPermission = this.hasPermission();
        if(!id||!hasPermission) return;
        const dom = ReactDOM.findDOMNode(this);// Element | null | Text
        if(null !== dom&&void 0 !== (dom as HTMLElement).tagName){
           // 标签元素
            (dom as HTMLElement).setAttribute("test-id",id);
        }
    }
    render(){
        const hasPermission = this.hasPermission();
        return hasPermission?this.props.children:null;
    }
}

export {ReactPermissionTest};
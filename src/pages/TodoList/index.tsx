import React, { useEffect } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import AddNewList from './components/AddNewList'
import MyList from './components/List'

/**
 * 查询列表
 * 
 */

const queryList = async (dispatch: any) => {
    const hide = message.loading('正在查询');
    try {
        await dispatch({
            type: 'todoList/getListApi',
        });
        hide();
        message.success('查询成功');
        return true;
    } catch (error) {
        hide();
        message.error('查询失败请重试！');
        return false;
    }
};

const index: React.FC<any> = (props) => {
    useEffect(() => {
        queryList(props.dispatch)
    }, [])
    return (
        <div>
            <h2 style={{ background: '#1890ff', color: '#fff', height: '85px', lineHeight: '85px', textAlign: 'center', borderRadius: '10px', fontSize: '45px' }}>我的代办</h2>
            <AddNewList />
            <MyList onDelete={props.handleDelete} list={props.list} />
        </div>
    )
}

function mapStateToProps(state: { todoList: { list: any; }; }) {
    return {
        list: state.todoList.list,
    };
}

function mapDispatchToProps(dispatch: (arg0: { type: string; payload: any; }) => void) {
    return {
        dispatch,
        handleDelete(key: any) {
            dispatch({
                type: 'todoList/delete',
                payload: key,
            });
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(index);
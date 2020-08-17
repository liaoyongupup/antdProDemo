import { todoListQuery } from '../pages/TodoList/service'
const todoListModel = {
    namespace: 'todoList',
    state: {
        list: [],
    },
    reducers: {
        save(state: any, action: { value: any; }) {
            var newState = JSON.parse(JSON.stringify(state))
            newState.list = action.value;
            return newState;
        },
        add(state: any, action: { value: any; }) {
            var newState = JSON.parse(JSON.stringify(state))
            newState.list.push(action.value);
            return newState;
        },
        delete(state: any, { payload: key }: any) {
            var newState = JSON.parse(JSON.stringify(state))
            console.log('state--', state, 'key:', key)
            newState.list = newState.list.filter((item: { key: any; }) => item.key !== key);
            return newState;
        }
    },
    effects: {
        *getListApi(_: any, { call, put }: any) {
            const response = yield call(todoListQuery);
            console.log('myRes', response)
            yield put({ type: 'save', value: response });
        },
    }
};
export default todoListModel;
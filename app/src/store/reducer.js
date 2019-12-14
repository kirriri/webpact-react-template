import { combineReducers } from 'redux'
import * as Actions from './contants'

const defaultValue = {
    testData: '测试数据'
}

const mainReducer = (state = defaultValue, action) => {
    const newState = JSON.parse(JSON.stringify(state)) 
    switch (action.type) {
        case Actions.TEST:
            state.testData = action.value
            return state
        default:
            return state
    }
}

const reducer =  combineReducers({
    // home: HomeReducer,
    main: mainReducer
})

export default reducer
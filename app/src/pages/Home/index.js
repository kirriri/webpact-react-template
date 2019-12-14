  
import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import store from '../../store/index'

@connect(
    state => ({
        test: store.getState().testData,
    }),
    dispatch => ({
        setTest: (value) => dispatch(actionCreators.setTest(value))
    })
)
class Home extends React.PureComponent {
 
    handleInput = (e) => {
        this.props.setTest(e.target.value)
    }

    render () {
        const { test } = this.props
        return (
            <div>
                <input value={test} onChange={(e) => this.handleInput(e)}/>
            </div>
        )
    }
}

export default Home
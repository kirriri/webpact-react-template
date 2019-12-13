import React from 'react'
import './index.css'

class App extends React.Component {

    render(){
      return (
        <div>
          <h2 className="test">Hello World! da23423!</h2>
          <img src={require("./static/images/test.png")} alt=""/>
          <p className="aab">测试用例</p>
        </div>
      )
    }
  }
export default App
import React from 'react'
import './index.css'

class App extends React.Component {

    render(){
      return (
        <div>
          <h2 className="test">Hello World! da23423!</h2>
          <img src={require("../public/static/images/test.png")} alt=""/>
        </div>
      )
    }
  }
export default App
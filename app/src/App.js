import React from 'react'
import Home from './pages/Home'
import axios from 'axios'

class App extends React.Component {

  componentDidMount() {
    axios.post('/api/test/profile').then(res => {
      console.log(res)
    })
  }

    render(){
      return (
        <div className="App">
          <Home></Home>
        </div>
      )
    }
  }
export default App
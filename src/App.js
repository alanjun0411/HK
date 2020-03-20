import React,{Component} from 'react'
import { HashRouter as Router, Route} from 'react-router-dom'
import TabBar from './components/TabBar'
import Map from './view/map'
import {connect} from 'react-redux'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <Route path='/Map' component={Map}></Route>
          </Router>
        </div>
        <div style={this.props.pathChange ? {display: 'block'} : {display: 'none'}}>
          <TabBar></TabBar>
        </div>
      </div>
    );
  }
}
const connToProps = (state) =>{
  return {
    pathChange: state.viewControl.pathChange
  }
}
const connFun = connect(connToProps)
export default connFun(App);

import React,{Component} from 'react'
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import TabBar from './components/TabBar'
import Map from './view/map'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* 先显示tabBar组件 */}
            <Route exact path="/">
              <Redirect to="/home/index"></Redirect>
            </Route>
            <Route path="/home" component={TabBar}></Route>
            {/* 纯页面组件 */}
            <Route path="/map" component={Map}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App

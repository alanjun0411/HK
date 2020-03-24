import React,{Component} from 'react'
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import TabBar from './components/TabBar'
import Map from './view/map/map'
import Citylist from "./view/citylist/citylist"
import Search from "./view/search/search"
import {connect} from 'react-redux'
import { mapCity } from './store/actionView'
class App extends Component {
  componentDidMount() {
    this.getMapApi()
    window.onLoad = () => {
      this.props.changCity()
    }
  }
  getMapApi= () => {
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=eec4bfef5fc03a89a3e3da55989b720e&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
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
            <Route path="/search" component={Search}></Route>
            <Route path="/citylist" component={Citylist}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return  {
    mapCity: state.mapControl.mapCity
  }
}
const changState = (dispatch) => {
  return  {
    changCity() {
      dispatch(mapCity())
    }
  }
}
export default  connect(mapStateToProps, changState)(App)

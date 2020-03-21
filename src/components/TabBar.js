import React,{ Component } from 'react'

import { Route} from 'react-router-dom'
import { TabBar } from 'antd-mobile'

import Home from '../view/home/home'
import Found from '../view/found/found'
import News from '../view/news/news'
import My from '../view/my/my'
class TabBarExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false
    }
  }
  componentDidUpdate() {
    let {history, location} = this.props
    if (location.pathname === '/home') {
      history.push('/home/index')
    }
  }
  render() {
    let {history, location} = this.props
    if (location.pathname === '/home') {
      return (<div></div>)
    } else {
      return (
        <div style={ {position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="home"
              icon={<i className="iconfont icon-shouye"></i>}
              selectedIcon={<i className="iconfont icon-shouye"></i>}
              selected={location.pathname === '/home/index'}
              onPress={()=>{history.push('/home/index')}}
              data-seed="logId"
            >
              <Route path="/home/index" component={Home}></Route>
            </TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-sousuo"></i>}
              selectedIcon={<i className="iconfont icon-sousuo"></i>}
              title="找房"
              key="found"
              selected={location.pathname === '/home/found'}
              onPress={()=>{history.push('/home/found')}}
              data-seed="logId1"
            >
              <Route path="/home/found" component={Found}></Route>
            </TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-dingdan"></i>}
              selectedIcon={<i className="iconfont icon-dingdan"></i>}
              title="资讯"
              key="news"
              selected={location.pathname === '/home/news'}
              onPress={()=>{history.push('/home/news')}}
            >
              <Route path="/home/news" component={News}></Route>
            </TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-icon-test1"></i>}
              selectedIcon={<i className="iconfont icon-icon-test1"></i>}
              title="我的"
              key="my"
              selected={location.pathname === '/home/my'}
              onPress={()=>{history.push('/home/my')}}
            >
              <Route path="/home/my" component={My}></Route>
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
   
  }
}
export default TabBarExample
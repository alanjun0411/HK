import React,{ Component } from 'react'

import { HashRouter as Router, Route} from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import Home from '../view/home'
import Found from '../view/found'
import News from '../view/news'
import My from '../view/my'
class TabBarExample extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'blueTab',
      hidden: false
    }
    window.location=(`#/`)
  }

  renderContent = () => {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home}></Route>
          <Route path="/Found" component={Found}></Route>
          <Route path="/News" component={News}></Route>
          <Route path="/My" component={My}></Route>
        </Router>
    </div>)
  }
  pressEvent= (selectedTab, path) => {
    this.setState({selectedTab})
    window.location=(`#${path}`)
  }
  render() {
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
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => this.pressEvent('blueTab','/')}
            data-seed="logId"
          >
            {this.renderContent()}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-sousuo"></i>}
            selectedIcon={<i className="iconfont icon-sousuo"></i>}
            title="找房"
            key="found"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => this.pressEvent('redTab','/Found')}
            data-seed="logId1"
          >
            {this.renderContent()}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-dingdan"></i>}
            selectedIcon={<i className="iconfont icon-dingdan"></i>}
            title="资讯"
            key="news"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => this.pressEvent('greenTab','/News')}
          >
            {this.renderContent()}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-icon-test1"></i>}
            selectedIcon={<i className="iconfont icon-icon-test1"></i>}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => this.pressEvent('yellowTab','/My')}
          >
            {this.renderContent()}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default TabBarExample
import React,{ Component } from 'react'
import { TabBar } from 'antd-mobile';

class TabBarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false
    };
  }

  renderContent(pageText) {
    return (
        <div>{pageText}</div>
    )
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
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('Life')}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-sousuo"></i>}
            selectedIcon={<i className="iconfont icon-sousuo"></i>}
            title="找房"
            key="found"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('Koubei')}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-dingdan"></i>}
            selectedIcon={<i className="iconfont icon-dingdan"></i>}
            title="资讯"
            key="news"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-icon-test1"></i>}
            selectedIcon={<i className="iconfont icon-icon-test1"></i>}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample
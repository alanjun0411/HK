import React,{PureComponent} from 'react'
import { Toast, NavBar, Icon } from 'antd-mobile';
import axios from '../../utils/axios'
import {connect} from 'react-redux'
import {List} from 'react-virtualized';
import citylistCss from './citylist.module.scss'
import {mapCityList} from '../../store/actionView'

class Citylist extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            cityList: [],
            cityListRight: ['#','热'],
            activeIndex: 0
        }
    }
    async componentDidMount() {
        Toast.loading('加载中...', 0)
        let cityList = (await axios.get('/area/city?level=1')).data.body
        let hots = (await axios.get('/area/hot')).data.body
        hots.sort((a,b) => a.short > b.short ? 1 : -1)
        let newCityList = [{
            name: '当前定位',
            value: [{label:this.props.mapCity}]
        },
        {
            name: '热门城市',
            value: hots
        }]
        newCityList = this.makData(cityList, newCityList)
        this.setState({
            cityList: newCityList
        })
        Toast.hide()
    }
    makData= (data, newCityList) => {
        let newData = {}
        data.sort((a,b) => a.short > b.short ? 1 : -1)
        data.forEach(element => {
            let key = element.short.slice(0,1).toUpperCase()
            if (!newData[key]) newData[key] = []
            newData[key].push({...element})
        })
        let cityListRight = this.state.cityListRight
        for(let i in newData) {
            cityListRight.push(i)
            newCityList.push({
                name: i,
                value: newData[i]
            })
        }
        this.setState({cityListRight})
        return newCityList
    }
    rowRenderer = ({
        key,
        index,
        isScrolling, 
        isVisible,
        style,
      }) => {
        return (
          <div key={key} style={style}>
            <div className={citylistCss.scrollAreaTitle}>{this.state.cityList[index].name}</div>
            {this.state.cityList[index].value.map((v, i) => {
                return (
                    <div key={i} className={citylistCss.scrollAreaList} onClick={()=>this.onChangeCity(v.label)}>{v.label}</div>
                )
            })}
          </div>
        );
    }
    computeHeight= ({index}) => {
        return 40 + this.state.cityList[index].value.length * 40
    }
    onRowsRendered= ({startIndex}) => {
        this.setState({activeIndex: startIndex})
    }
    onChangeCity= (city) => {
        this.props.cityChange(city)
        this.props.history.goBack()
    }
    render() {
        let {history} = this.props
        return(
            <div>
               <div className="goBack">
                <NavBar
                  mode="light"
                  icon={<Icon type="left" />}
                  onLeftClick={() => history.goBack()}
                >城市选择</NavBar>
               </div>
               <div className={citylistCss.scrollArea}>
               <List
                  width={window.screen.width}
                  height={window.screen.height-45}
                  rowCount={this.state.cityList.length}
                  rowHeight={this.computeHeight}
                  rowRenderer={this.rowRenderer}
                  onRowsRendered={this.onRowsRendered}
                  scrollToIndex={this.state.activeIndex}
                //   这是列表的必须配置一定不能少
                  scrollToAlignment='start'
                />
                <div className={citylistCss.scrollAreaLeft}>
                    {this.state.cityListRight.map((v, i) => <div key={i} className={[
                        citylistCss.scrollAreaLeftOne,
                        this.state.activeIndex === i ?  citylistCss.scrollAreaActive: ''
                    ].join(' ')} onClick={()=>this.setState({activeIndex: i})}>{v}</div>)}
                </div>
               </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return  {
    mapCity: state.mapControl.mapCity
  }
}
const mapStateToChanges = (dispatch) =>{
    return {
        cityChange(city){
            dispatch(mapCityList(city))
        }
    }
}
export default connect(mapStateToProps,mapStateToChanges)(Citylist)
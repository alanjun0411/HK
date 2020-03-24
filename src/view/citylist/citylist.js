import React,{PureComponent} from 'react'
import { Toast } from 'antd-mobile';
import axios from '../../utils/axios'
import {connect} from 'react-redux'

class Citylist extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            cityList: []
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
        console.log(this.state)
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
        for(let i in newData) {
            newCityList.push({
                name: i,
                value: newData[i]
            })
        }
        return newCityList
    }
    render() {
        return(
            <div>
                Citylist
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return  {
      mapCity: state.mapControl.mapCity
    }
  }
export default connect(mapStateToProps)(Citylist)
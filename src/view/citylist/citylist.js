import React,{PureComponent} from 'react'
import { Toast } from 'antd-mobile';
import axios from '../../utils/axios'

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
        let newCityList = this.makData(cityList)
        this.setState({
            cityList: newCityList
        })
        Toast.hide()
    }
    makData= (data) => {
        let newData = {}
        data.forEach(element => {
            if (!newData[element.short.slice(0,1)]) {
                newData[element.short.slice(0,1)] = []
            }
            newData[element.short.slice(0,1)].push({...element})
        })
        data = []
        for(let i in newData) {
            data.push(newData[i])
        }
        for(let i=0 ; i< data.length-1; i++){
            for(let k=0 ; k< data.length-i-1; k++){
                if(data[k][0].short.slice(0,1)>data[k+1][0].short.slice(0,1)){
                    let max = data[k]
                    data[k] = data[k+1]
                    data[k+1] = max
                }
            }
        }
        return data
    }
    render() {
        return(
            <div>
                Citylist
            </div>
        )
    }
}
export default Citylist
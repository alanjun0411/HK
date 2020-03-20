import React,{Component} from 'react'
import {connect} from 'react-redux'
import {viewChange} from '../store/actionView'

class Found extends Component{
    componentDidMount() {
        this.props.change(true)
    }
    componentWillUnmount() {
        this.props.change(false)
    }
    clickEvent= () => {
        window.location=`#/map`
    }
    render() {
        return(
            <div>
                Found
                <div onClick={this.clickEvent}>map</div>
            </div>
        )
    }
}
const getView = (state) => {
    return({
        pathChange: state.viewControl.pathChange
    })
}
const setView = (dispatch) => {
    return({
        change(value) {
            dispatch(viewChange(value))
        }
    })
}
const connFun = connect(getView,setView)
export default connFun(Found)
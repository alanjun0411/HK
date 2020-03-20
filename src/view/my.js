import React,{Component} from 'react'
import {connect} from 'react-redux'
import {viewChange} from '../store/actionView'

class My extends Component{
    componentDidMount() {
        this.props.change(true)
    }
    componentWillUnmount() {
        this.props.change(false)
    }
    render() {
        return(
            <div>
                My
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
export default connFun(My)
import React,{Component} from 'react'

class Map extends Component{
    backEvent= () => {
        console.log(this.props.history)
        this.props.history.goBack()
    }
    render() {
        return(
            <div>
                Map
                <div onClick={this.backEvent}>返回</div>
            </div>
        )
    }
}
export default Map
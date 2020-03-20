import React,{Component} from 'react'

class Found extends Component{
    clickEvent= () => {
        this.props.history.push('/map')
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
export default Found
import React,{Component} from 'react'

class Home extends Component{
    clickEvent= () => {
        this.props.history.push('/map')
    }
    render() {
        return(
            <div>
                home
                <div onClick={this.clickEvent}>map</div>
            </div>
        )
    }
}
export default Home
import React,{Component} from 'react'
import { Carousel, Toast } from 'antd-mobile';
import axios,{baseURL} from '../utils/axios'

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            carouseDdata: [],
            imgHeight: 176,
        }
    }
    async componentDidMount(){
        Toast.loading('加载中...', 0)
        let carouseDdata = await this.getRes('/home/swiper')
        this.setState({
            carouseDdata
        })
        Toast.hide()
    }
    getRes = async (url) => {
        let carouseDdata = await axios.get(url)
        return carouseDdata.data.body 
        
    }
    render() {
        return(
            <div className="home">
                {/* 1.轮播图 */}
                <div>
                    {this.state.carouseDdata.length && <Carousel
                      autoplay
                      infinite
                    >
                      {this.state.carouseDdata.map(val => (
                        <a
                          key={val.id}
                          href="http://www.alipay.com"
                          style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                          <img
                            src={baseURL+val.imgSrc}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          />
                        </a>
                      ))}
                    </Carousel>
                    }
                </div>
            </div>
        )
    }
}
export default Home
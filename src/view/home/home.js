import React,{Component} from 'react'
import { Carousel, Toast } from 'antd-mobile'
import axios,{baseURL} from '../../utils/axios'
import HomeScss from './home.module.scss'
import {connect} from 'react-redux'
// import { mapCity } from '../../store/actionView'

// 本地图片加载
import Nav1 from '../../assct/img/nav-1.png';
import Nav2 from '../../assct/img/nav-2.png';
import Nav3 from '../../assct/img/nav-3.png';
import Nav4 from '../../assct/img/nav-4.png';

class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {
      carouseDdata: [],
      groupsDdata: [],
      newsDdata: [],
      imgHeight: 176,
      navImg: [
        {id: 1, path: '/list', name: Nav1, alt: '整租'},
        {id: 2, path: '/list', name: Nav2, alt: '合租'},
        {id: 3, path: '/map', name: Nav3, alt: '地图找房'},
        {id: 4, path: '', name: Nav4, alt: '去出租'}
      ]
    }
  }
  async componentDidMount(){
    Toast.loading('加载中...', 0)
    let carouseDdata = await this.getRes('/home/swiper')
    let groupsDdata = await this.getRes(`/home/groups?area=${'广州'}`)
    let newsDdata = await this.getRes(`/home/news?area=${'广州'}`)
    this.setState({
      carouseDdata,
      groupsDdata,
      newsDdata
    })
    Toast.hide()
  }
  getRes = async (url) => {
    let carouseDdata = await axios.get(url)
    return carouseDdata.data.body 
    
  }
  render() {
    let {history, mapCity} = this.props
    return(
      <div className="home">
        {/* 1.轮播图 */}
        <div className={HomeScss.carousel}>
          {this.state.carouseDdata.length !==0 && <Carousel
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
          {/* 5.搜索框 */}
        <div className={HomeScss.search}>
          <div className={HomeScss.searchMain}>
            <div className={HomeScss.searchMainAddress} onClick={()=>history.push('/citylist')}>
              <span>{mapCity}</span>
              <span className="iconfont icon-icon-test3"></span>
            </div>
            <div className={HomeScss.searchMainSearch} onClick={()=>history.push('/search')}>
              <span className="iconfont icon-sousuo"></span>
              <span>请输入小区或地址</span>
            </div>
          </div>
          <div className={HomeScss.searchIco} onClick={()=>history.push('/map')}>
            <span className="iconfont icon-ditu"></span>
          </div>
        </div>
        </div>
        {/* 2.导航栏 */}
        <nav className={HomeScss.nav}>
          {this.state.navImg.map(v => <div onClick={()=>history.push(v.path)} className={HomeScss.navOne} key={v.id}>
            <img src={v.name} alt={v.alt}></img>
            <span>{v.alt}</span>
          </div>)}
        </nav>
        {/* 3.租房小组展示栏 */}
        <div className={HomeScss.groups}>
          <div className={HomeScss.groupsTitle}>
            <span>租房小组</span>
            <span>更多</span>
          </div>
          <div className={HomeScss.groupsMain}>
          {this.state.groupsDdata.map(v => <div className={HomeScss.groupsOne} key={v.id}>
            <div>
              <div  className={HomeScss.groupsOneTitle}>
                <span>{v.title}</span>
                <span>{v.desc}</span>
              </div>
              <div>
                <img src={baseURL + v.imgSrc} alt=""></img>
              </div>
            </div>
          </div>)}
          </div>
        </div>
        {/* 4.最新资讯展示栏 */}
        <div className={HomeScss.news}>
          <div className={HomeScss.newsTitle}>
            最新资讯
          </div>
          <div className={HomeScss.newsMain}>
            {this.state.newsDdata.map(v => <div key={v.id} className={HomeScss.newsMainOne}>
              <div>
                <img src={baseURL + v.imgSrc} alt=""/>
              </div>
              <div className={HomeScss.newsMainOneMsg}>
                <div>{v.title}</div>
                <div className={HomeScss.newsMainOneMsgDate}>
                  <span>{v.from}</span>
                  <span>{v.date}</span>
                </div>
              </div>
            </div>)}
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
export default connect(mapStateToProps)(Home)
import React, { Component } from 'react';
import { Card, Table, Tabs, Button } from 'antd';
import { Link } from 'react-router-dom';
import Charts from 'ant-design-pro/lib/Charts';
import style from './location.css';
import history from '../../history';

const { TimelineChart } = Charts
const TabPane = Tabs.TabPane;
const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 10),
  });
}
class Location extends Component{
  render(){
    return(
      <div style={{width:'100%',height:'100%'}}>
        <div>GPS</div>
        <div id='gps' 
            style={{
            width: '100%',
            height: 600
        }}></div>
        <div>
          <Card bodyStyle={{ padding: '0 0 32px 0' }}>
            <div className={style.chartsCard}>
              <Tabs size='small' style={{paddingLeft: 16}}>
                <TabPane tab="铁塔1" key="1">
                  <div>倾角变化图</div>
                  <div style={{ padding: '0 24px', marginTop: -30 }}>
                    <TimelineChart
                      height={190}
                      data={chartData}
                      titleMap={{ y1: '倾角' }}
                    />
                  </div>
                </TabPane>
                <TabPane tab="铁塔2" key="2">                  <div>倾角变化图</div>
                  <div style={{ padding: '0 24px', marginTop: -30 }}>
                    <TimelineChart
                      height={190}
                      data={chartData}
                      titleMap={{ y1: '倾角' }}
                    />
                  </div></TabPane>
                <TabPane tab="铁塔3" key="3">                  <div>倾角变化图</div>
                  <div style={{ padding: '0 24px', marginTop: -30 }}>
                    <TimelineChart
                      height={190}
                      data={chartData}
                      titleMap={{ y1: '倾角' }}
                    />
                  </div></TabPane>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
    )
  }
      goMonitor = (e) =>{
    e.preventDefault();
    history.push('/monitor');
  }
  componentDidMount(){

    let BMap = window.BMap;
    let map = new BMap.Map('gps');                // 创建地图实例  
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]
    }));	  
    var point = new BMap.Point(113.07812534, 22.57511678);  // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中  
    // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var opts = {
      width: 200,     // 信息窗口宽度
      height: 150,     // 信息窗口高度
      title: "铁塔1", // 信息窗口标题
      enableMessage: true,//设置允许信息窗发送短息
    }
    var infoWindow = new BMap.InfoWindow(
      "地址：江门市蓬江区永盛路<br/>"+
      "纬度：22.57511678<br/>"+
      "经度：113.07812534"
    , opts);  // 创建信息窗口对象 
    marker.addEventListener("click", function () {
      map.openInfoWindow(infoWindow, point); //开启信息窗口
    });
  }
}
export default Location
import React, { Component } from 'react';
import { Card, Table, Tabs } from 'antd';
import Charts from 'ant-design-pro/lib/Charts';
import style from './location.css'

const { TimelineChart } = Charts
const TabPane = Tabs.TabPane;
const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
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
                      titleMap={{ y1: '客流量', y2: '支付笔数' }}
                    />
                  </div>
                </TabPane>
                <TabPane tab="铁塔2" key="2">                  <div>倾角变化图</div>
                  <div style={{ padding: '0 24px', marginTop: -30 }}>
                    <TimelineChart
                      height={190}
                      data={chartData}
                      titleMap={{ y1: '客流量', y2: '支付笔数' }}
                    />
                  </div></TabPane>
                <TabPane tab="铁塔3" key="3">                  <div>倾角变化图</div>
                  <div style={{ padding: '0 24px', marginTop: -30 }}>
                    <TimelineChart
                      height={190}
                      data={chartData}
                      titleMap={{ y1: '客流量', y2: '支付笔数' }}
                    />
                  </div></TabPane>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
    )
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
    var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
  }
}
export default Location
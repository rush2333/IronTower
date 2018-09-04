import React, {Component, Fragment} from 'react';
import { Card,Tabs, Breadcrumb } from 'antd';
import moment from 'moment';
import style from './detail.css';
import Charts from 'ant-design-pro/lib/Charts';

const { TimelineChart } = Charts;
const TabPane = Tabs.TabPane;
const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

export default class Detail extends Component {
  render(){
    return(
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item>监控页</Breadcrumb.Item>
          <Breadcrumb.Item>历史工作情况</Breadcrumb.Item>
          <Breadcrumb.Item>详情</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{marginBottom:15}}>
          <div>
            <h2>日期：{moment().format("YYYY年MM月DD日")}</h2>
            <div style={{ marginTop: 15 }}>
              <span className={style.contentBody}>状态：<span className={style.content}></span></span>
              <span className={style.contentBody}>倾角：<span className={style.content}></span></span>
              <span className={style.contentBody}>X轴倾角：<span className={style.content}></span></span>
              <span className={style.contentBody}>Y轴倾角：<span className={style.content}></span></span>
              <span className={style.contentBody}>平均电池电压：<span className={style.content}></span></span>
            </div>
          </div>
        </Card>
        <Card>
          <Tabs size='large'>
            <TabPane tab="倾角图" key="1">
              <div style={{ padding: '0 24px', marginTop: -30 }}>
                <TimelineChart
                  height={300}
                  data={chartData}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />
              </div>
            </TabPane>
            <TabPane tab="电池电压图" key="2">
              <div style={{ padding: '0 24px', marginTop: -30 }}>
                <TimelineChart
                  height={300}
                  data={chartData}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />
              </div></TabPane>
          </Tabs>
        </Card>
      </Fragment>
    )
    }
}
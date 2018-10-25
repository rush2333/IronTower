import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Input,
  Button,
  Breadcrumb,
  Form
} from 'antd';
import EditAlarm from './editAlarm/editAlarm';
import IntializeModal from './initializeDevice/initializeDevice'
import store from './store';
import { observer } from "mobx-react";
import style from './monitor.css';
import Charts from 'ant-design-pro/lib/Charts';
import { Link } from 'react-router-dom';
import request from '../../helpers/request';
import moment from 'moment';

const { TimelineChart } = Charts;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const route = 'http://oil.mengant.cn/api';
const now = new Date();
now.setDate(1);
var startTime = moment(now).format('YYYY-MM-DD');
now.setMonth(now.getMonth() + 1);
now.setDate(now.getDate() - 1);
var endTime = moment(now).format('YYYY-MM-DD');

const chartData = [];
for (let i = 0; i < 10; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 10),
  });
}

const state_type = ['', '正常', '停用']
const tabListNoTitle = [{
  key: '倾角图',
  tab: '倾角图',
}, {
  key: '电池工作图',
  tab: '电池工作图',
},];
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};
const chartsExtra = (
  <div>
    日期：{moment().format('YYYY年MM月DD日')}
  </div>
)

@observer
class Monitor extends React.Component {
  data = [{
    "params": {
      "angleX": 200
    }
  }]
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'IMEI',
      dataIndex: 'imei',
      render: (text, record, index) => {
        return <a href="#" onClick={() => { this.getNowData(text); this.getDeviceData(text); this.getInitData(text); store.basicMsg = record;console.log(store.basicMsg) }}>{text}</a>
      }
    },
    {
      title: '设备名称',
      dataIndex: 'title',
    },
    {
      title: '实时状态',
      dataIndex: 'state',
      render: (text) => (
        <span>{state_type[text]}</span>
      )
    }
  ];
  workColumns = [
    {
      title: 'IMEI',
      dataIndex: 'imei',
      width: 120
    },
    {
      title: '倾角',
      dataIndex: '',
      width: 90,
      render: (text, record, index) => (<span>{this.calAngle(record.angleX, record.angleY)}</span>)

    },
    {
      title: 'x轴倾角',
      dataIndex: 'angleX',
      width: 90

    },
    {
      title: 'y轴倾角',
      dataIndex: 'angleY',
      width: 90

    },
    {
      title: '电池电压',
      dataIndex: 'power',
      width: 90

    },
    {
      title: '状态',
      dataIndex: 'deviceState',
      width: 90

    },
    {
      title: '日期',
      dataIndex: 'create_time',
      width: 150
    },
  ];
  constructor(props) {
    super(props);
  }
  getMachineData = () => {
    request({
      url: `${route}/v1/devices`,
      method: 'GET',
      data: {
        page: 1,
        size: 10
      },
      success: (data) => {
        data = JSON.parse(data)
        store.fetchList = data;
        store.basicMsg = data.data[0]
        let imei = store.fetchList.data[0].imei;
        this.getNowData(imei);
        this.getDeviceData(imei);
        this.getInitData(imei);
      }
    })
  }
  getNowData = (imei) => {
    request({
      url: `${route}/v1/device/current`,
      method: 'GET',
      data: {
        imei: imei
      },
      success: (res) => {
        res = JSON.parse(res);
        let { x, y } = res;
        store.realtimeData = res;
        let { realtimeData, initialParams } = store;
        Object.assign(initialParams, realtimeData, { 'imei': imei })
      }
    })
  }
  getDeviceData = (imei) => {
    request({
      url: `${route}/v1/receive/list`,
      method: 'GET',
      data: {
        imei: imei,
        startTime,
        endTime,
        page: '1',
        size: '1000'
      },
      success: (res) => {
        res = JSON.parse(res);
        let data = res.data;
        data.forEach(e => {
          e.param.forEach(p => {
            let { value_name, value } = p
            let arr = { [value_name]: value };
            Object.assign(e, arr)
          })
        })
        store.months_data = data;
      }
    })
  }
  getInitData = (imei) => {
    request({
      url: '/api/show_adjust_angle',
      data: {
        imei: imei
      },
      success: (res) => {
        res = JSON.parse(res);
        res = JSON.parse(res);
        let data = res.data[0];
        store.initialData = data;
      }
    })
  }
  getIniRes = (id) => {
    var ws = new WebSocket('ws://oil.mengant.cn/api/v1/device/init/res?id=' + id)
    ws.onopen = function (evt) {
      console.log(evt)
      console.log('connection open');
    }
    ws.onerror = function (evt) {
      console.log(evt)
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.getMachineData();
  }
  calAngle = (x, y) => {
    let cosX = Math.cos(x / 180);
    let cosY = Math.cos(y / 180);
    let sinX = Math.sin(x / 180);
    let sinY = Math.sin(y / 180);
    let num_1 = Math.pow(cosX, 2) - Math.pow(sinY, 2);
    let num_2 = Math.pow(cosY, 2) - Math.pow(sinX, 2);
    let sqrt_1 = Math.sqrt(num_1);
    let sqrt_2 = Math.sqrt(num_2);
    let angle;
    if (num_1 > 0) {
      angle = Math.acos(sqrt_1) * Math.PI;
      angle = angle.toFixed(5);
      return angle
    } else {
      angle = Math.acos(sqrt_2) * Math.PI;
      angle = angle.toFixed(5);
      return angle
    }
  }
  render() {
    let { alarm_modal, initialize_modal, realtimeData, basicMsg, initialParams, months_data, fetchList, initialData } = store;
    let { imei, title } = basicMsg;
    let { x, y } = realtimeData;
    let angle = this.calAngle(x, y);
    return (
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item>监控页</Breadcrumb.Item>
        </Breadcrumb>
        {/* <Button onClick={() => { this.calAngle(-0.7,1.39) }}>test</Button>
        <Button onClick={() => { this.initData() }}>初始化</Button>
        <Button onClick={() => { this.getInitData(865820035119960) }}>获取</Button>
        <Button onClick={() => { this.setWarnData() }}>警报</Button> */}
        <Row gutter={12} >
          <Col span={6} style={{ height: 900, zIndex: 5 }}>
            <Card title='工作铁塔' style={{ height: "100%" }}>
              <Search
                onSearch={value => console.log(value)}
                enterButton
                style={{ marginBottom: 5 }}
              />
              <Table dataSource={fetchList.data} columns={this.columns} rowKey={record => record.id} size='small' />
            </Card>
          </Col>
          <Col>
            <Row gutter={12}>
              <Col span={4} style={{ height: 450 }}>
                <Card title='基本信息' style={{ height: "100%" }} extra={<Button size='small' onClick={() => initialize_modal.visible = true}>初始化</Button>}>
                  <h4>IMEI: <span className={style.basicMessage}>{imei}</span></h4>
                  <h4>名称: <span className={style.basicMessage}>{title}</span></h4>
                  {/* <h4>所处地质: <span className={style.basicMessage}>平原</span></h4> */}
                  {/* <h4>地址: <span className={style.basicMessage}></span></h4> */}
                  <h4>启用日期: <span className={style.basicMessage}>{initialData.dateTime}</span></h4>
                  {/* <h4>传感器已使用时长: <span className={style.basicMessage}>127H</span></h4> */}
                  <h4>警报指数:
                    <Button size='small' type='primary' style={{ float: 'right' }} onClick={() => {
                      this.getInitData(imei);
                      alarm_modal.visible = true
                    }}>编辑</Button>
                    <span style={{ fontSize: 18 }}>
                      <br />X轴初始角度:{initialData.angle_x}
                      <br />Y轴初始角度:{initialData.angle_y}
                      <br />初始倾角:{this.calAngle(initialData.angle_x,initialData.angle_y)}
                      <br />X轴报警指数:{initialData.warn_x}
                      <br /> Y轴报警指数:{initialData.warn_y}
                    </span></h4>
                </Card>
              </Col>
              <Col span={14} style={{ marginBottom: 12 }} style={{ height: 180, marginBottom: 10 }}>
                <Card title='实时工作状态' style={{ height: "100%" }}
                  extra={<div><span style={{ color: 'green', fontWeight: 'bold', marginRight: 5 }}>正常</span>  最近一次更新：2018-08-29 </div>}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>倾角</span></div>
                    <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>x轴倾角</span></div>
                    <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>y轴倾角</span></div>
                    {/* <div style={{ flex:1, textAlign:'center', fontWeight:'bold', fontSize:16 }}><span>电池电压</span></div> */}
                  </div>
                  <div style={{ display: 'flex', marginTop: 10 }}>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: 28, color: 'green' }}><span>{angle}</span></div>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: 28, color: 'green' }}><span>{x}</span></div>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: 28, color: 'green' }}><span>{y}</span></div>
                    {/* <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>{power}</span></div> */}
                  </div>
                </Card>
              </Col>
              <Col span={14} style={{ height: 260 }}>
                <Card title='本月工作情况' style={{ height: "100%" }} extra={<Link to='/historyStatus'>历史工作情况</Link>}>
                  <Table columns={this.workColumns} dataSource={months_data} size={"small"} pagination={false} scroll={{ y: 120 }} rowKey={record => record.create_time} />
                </Card>
              </Col>
              <Col span={18} style={{ marginTop: 10, height: 440 }}>
                <Card style={{ height: '100%' }} bordered={false} bodyStyle={{ padding: '0 0 32px 0' }}>
                  <div className={style.chartsCard}>
                    <Tabs size='large' tabBarExtraContent={chartsExtra}>
                      <TabPane tab="倾角图" key="1">
                        <div style={{ padding: '0 24px', marginTop: -30 }}>
                          <TimelineChart
                            height={300}
                            data={chartData}
                            titleMap={{ y1: '倾角' }}
                          />
                        </div>
                      </TabPane>
                      <TabPane tab="电池电压图" key="2">
                        <div style={{ padding: '0 24px', marginTop: -30 }}>
                          <TimelineChart
                            height={300}
                            data={chartData}
                            titleMap={{ y1: '电压', }}
                          />
                        </div></TabPane>
                    </Tabs>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <EditAlarm props={alarm_modal} params={initialParams} initialDatas={initialData} />
        <IntializeModal props={initialize_modal} params={initialParams} />
      </Fragment>)
  }
}

export default Form.create()(Monitor)
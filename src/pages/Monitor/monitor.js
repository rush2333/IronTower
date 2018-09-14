import React, { Fragment }from 'react';
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
  Breadcrumb} from 'antd';
import EditAlarm from './editAlarm';
import store from './store';
import { observer } from "mobx-react";
import style from './monitor.css';
import Charts from 'ant-design-pro/lib/Charts';
import { Link } from 'react-router-dom';
import request from '../../helpers/request';
import moment from 'moment';

const url = 'getCurrentData.shtml?equipmentId=868744034584411';
const url2 = 'getHistoryDataByInterval.shtml';
const { TimelineChart } = Charts;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const startTime = moment().format('2018-09-01');
const endTime = moment().format('YYYY-MM-DD');
const chartData = [];
for (let i = 0; i < 10; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 10),
  });
}

const columns= [
    {
      title:'ID',
      dataIndex:'id',
      key:'id',
    },
    {
      title:'名称',
      dataIndex:'equipmentName',
      key:'equipmentName',
    },
    {
      title:'实时状态',
      dataIndex:'messageType',
      key:'messageType'
    }
  ];
const workColumns = [
    {
      title:'状态',
      dataIndex:'messageType',
      key:'messageType',
    width: 90

    },
    {
      title:'倾角',
      dataIndex:'',
      key:'angle',
      width: 90

    },
    {
      title:'x轴倾角',
      dataIndex:'angleX',
      key:'angleX',
      width: 90

    },
    {
      title:'y轴倾角',
      dataIndex:'angleY',
      key:'angleY',
      width: 90

    },
    {
      title:'平均电池电压',
      dataIndex:'power',
      key:'power',
      width: 90

    },
    {
      title:'日期',
      dataIndex:'eventTime',
      key:'eventTime',
      width: 150
    },
];
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
class Monitor extends React.Component{
  constructor(props) {
    super(props);
  }
  getMachineData = () => {
    request({
      url: `/informationApi/${url}`,
      method: 'GET',
      success: (data) => {
        store.dataSource = [];
        store.dataSource.push(data);
        Object.assign(store.basicMsg,data);
      }
    })
  }
  getMonthData = () => {
    request({
      url: `/informationApi/${url2}?equipmentId=868744034584411&startTime=${startTime}&endTime=${endTime}`,
      method:'GET',
      success:(res)=>{
        store.months_data = res;
      }
    })
  }
  componentDidMount(){
    this.getMachineData();
    this.getMonthData();
  }
  render(){
    let { alarm_modal, dataSource, basicMsg, months_data } = store;
    let { id, equipmentName, alarmX, alarmY, angleX, angleY, power} = basicMsg;
    let angle = Math.atan2(angleX,angleY).toFixed(3);
    return(
    <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item>监控页</Breadcrumb.Item>
        </Breadcrumb>
      <Row gutter={12} >
        <Col span={6} style={{height:900}}>
          <Card title='工作铁塔' style={{height:"100%"}}>
              <Search
                onSearch={value => console.log(value)}
                enterButton
                style={{marginBottom:5}}
              />
              <Table dataSource={dataSource} columns={columns} size='small' />
          </Card>
        </Col>
        <Col>
          <Row gutter={12}>
            <Col span={4} style={{height:450}}>
              <Card title='基本信息' style={{ height:"100%"}}>
                <h4>ID: <span className={style.basicMessage}>{id}</span></h4>
                <h4>名称: <span className={style.basicMessage}>{equipmentName}</span></h4>
                <h4>所处地质: <span className={style.basicMessage}>平原</span></h4>
                <h4>地址: <span className={style.basicMessage}>广东省江门市蓬江区</span></h4>
                <h4>启用日期: <span className={style.basicMessage}>2018-08-28</span></h4>
                <h4>传感器已使用时长: <span className={style.basicMessage}>127H</span></h4>
                <h4>警报指数: <Button size='small' type='primary' style={{float:'right'}} onClick={()=>alarm_modal.visible=true}>编辑</Button></h4>
              </Card>
            </Col>
            <Col span={14} style={{marginBottom: 12}} style={{ height:180, marginBottom:10}}>
              <Card title='实时工作状态' style={{ height: "100%" }}
                  extra={<div><span style={{ color: 'green', fontWeight:'bold', marginRight: 5 }}>正常</span>  最近一次更新：2018-08-29 </div>}>
                  <div style={{display:'flex'}}>
                    <div style={{ flex:1, textAlign:'center', fontWeight:'bold', fontSize:16 }}><span>倾角</span></div>
                    <div style={{ flex:1, textAlign:'center', fontWeight:'bold', fontSize:16 }}><span>x轴倾角</span></div>
                    <div style={{ flex:1, textAlign:'center', fontWeight:'bold', fontSize:16 }}><span>y轴倾角</span></div>
                    <div style={{ flex:1, textAlign:'center', fontWeight:'bold', fontSize:16 }}><span>电池电压</span></div>
                  </div>
                  <div style={{display:'flex',marginTop:10}}>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>{angle}</span></div>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>{angleX}</span></div>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>{angleY}</span></div>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>{power}</span></div>
                  </div>
              </Card>
            </Col>
            <Col span={14} style={{ height: 260 }}>
                <Card title='本月工作情况' style={{ height: "100%" }} extra={<Link to='/historyStatus'>历史工作情况</Link> }>
                  <Table columns={workColumns} dataSource={months_data} size={"small"} pagination={false} scroll={{ y: 120 }}/>
              </Card>
            </Col>
            <Col span={18} style={{marginTop:10, height:440}}>
                <Card style={{ height: '100%' }} bordered={false} bodyStyle={{ padding: '0 0 32px 0' }}>
                  <div className={style.chartsCard}>
                    <Tabs size='large' tabBarExtraContent={chartsExtra}>
                      <TabPane tab="倾角图" key="1">
                        <div style={{ padding: '0 24px',marginTop:-30 }}>
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
      <EditAlarm props={alarm_modal}/>
    </Fragment>)
  }
}

export default Monitor
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
  Button} from 'antd';
import EditAlarm from './editAlarm';
import store from './store';
import { observer } from "mobx-react";
import style from './monitor.css'
import Charts from 'ant-design-pro/lib/Charts';

const { TimelineChart } = Charts
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const columns= [
    {
      title:'ID',
      dataIndex:'equipmentId',
      key:'ID'},
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
      key:'messageType'
    },
    {
      title:'倾角',
      dataIndex:'',
      key:'angle'
    },
    {
      title:'x轴倾角',
      dataIndex:'angleX',
      key:'angleX'
    },
    {
      title:'y轴倾角',
      dataIndex:'angleY',
      key:'angleY'
    },
    {
      title:'平均电池电压',
      dataIndex:'power',
      key:'power'
    },
    {
      title:'平均工作温度',
      dataIndex:'temperature',
      key:'temperature'
    },
    {
      title:'日期',
      dataIndex:'eventTime',
      key:'eventTime'
    },
];
const tabListNoTitle = [{
  key: '倾角图',
  tab: '倾角图',
}, {
  key: '电池工作图',
  tab: '电池工作图',
}, {
  key: '工作温度图',
  tab: '工作温度图',
}];
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

@observer
class Monitor extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    let { alarm_modal } = store;
    const chartsExtra = (
      <div>
        日期：
      </div>
    )
    return(
    <Fragment>
      <Row gutter={12} style={{height:900}}>
        <Col span={5} style={{height:900}}>
          <Card title='工作铁塔' style={{height:"100%"}}>
            <div>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton
                style={{marginBottom:5}}
              />
              <Table columns={columns} size='small' />
            </div>
          </Card>
        </Col>
        <Col>
          <Row gutter={12}>
            <Col span={5} style={{height:450}}>
              <Card title='基本信息' style={{ height:"100%"}}>
                <h3>ID:</h3>
                <h3>名称:</h3>
                <h3>所处地质:</h3>
                <h3>地址:</h3>
                <h3>启用日期:</h3>
                <h3>传感器已使用时长:</h3>
                <h3>警报指数: <Button size='small' type='primary' style={{float:'right'}} onClick={()=>alarm_modal.visible=true}>编辑</Button></h3>
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
                    <div style={{ flex:1, textAlign:'center', fontWeight:'bold', fontSize:16 }}><span>工作温度</span></div>
                  </div>
                  <div style={{display:'flex',marginTop:10}}>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>0</span></div>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>0</span></div>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>0</span></div>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>4.00V</span></div>
                    <div style={{ flex:1, textAlign:'center', fontSize:28, color:'green' }}><span>78℃</span></div>
                  </div>
              </Card>
            </Col>
            <Col span={14} style={{ height: 260 }}>
              <Card title='本月工作情况' style={{ height: "100%" }} extra={<a>历史工作情况</a>}>
                <Table columns={workColumns} size={"small"}/>
              </Card>
            </Col>
            <Col span={19} style={{marginTop:10, height:440}}>
                <Card style={{ height: '100%' }} bordered={false} bodyStyle={{ padding: '0 0 32px 0' }}>
                  <div className={style.chartsCard}>
                    <Tabs size='large' tabBarExtraContent={chartsExtra}>
                      <TabPane tab="Tab 1" key="1">
                        <div style={{ padding: '0 24px',marginTop:-30 }}>
                          <TimelineChart
                            height={300}
                            data={chartData}
                            titleMap={{ y1: '客流量', y2: '支付笔数' }}
                          />
                        </div>
                      </TabPane>
                      <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
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
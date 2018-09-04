import React, {Component, Fragment} from 'react';
import { Card, Table, DatePicker, Button, Breadcrumb } from 'antd';
import request from '../../../helpers/request';
import store from '../store';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const { RangePicker} = DatePicker;
const url = 'getHistoryDataByInterval.shtml?equipmentId=868744034584411&startTime=2018-07-01&endTime=2018-08-31'
const columns = [
  {
    title:'日期',
    dataIndex:'eventTime',
    key:'eventTime',
    sorter: (a, b) => a.date - b.date,
  },
  {
    title:'状态',
    dataIndex:'messageType',
    key:'messageType'
  },
  {
    title:'x轴报警',
    dataIndex:'alarmX',
    key:'alarmX'
  },
  {
    title:'x轴倾角',
    dataIndex:'angleX',
    key:'angleX'
  },
   {
    title: 'y轴报警',
    dataIndex: 'alarmY',
    key:'alarmY'
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
    title:'操作',
    render: () => (
      <Fragment>
        <Link to='/detail'>详情</Link>
      </Fragment>
    )
  }
]

function onChange(pagination, filters, sorter)  {
  console.log('params', pagination, filters, sorter);
}
function getMachineData() {
  request({
    url:`/informationApi/${url}`,
    method:'GET',
    success: (data)=>{
      console.log(data);
      store.history_data = data;
    }
  })
}
@observer
class HistoryStatus extends Component{
  render(){
    let { history_data } = store
    return(
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item> <Link to='/monitor'>监控页</Link> </Breadcrumb.Item>
          <Breadcrumb.Item>历史工作情况</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <div style={{marginBottom:10}} >选择日期：<RangePicker /></div>
          <Table columns={columns} onChange={onChange} dataSource={history_data} rowKey='eventTime'></Table>
        </Card>
      </Fragment>
    )
  }
  componentDidMount(){
    getMachineData();
  }
} 

export default HistoryStatus
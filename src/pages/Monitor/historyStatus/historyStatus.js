import React, {Component} from 'react';
import { Card, Table, DatePicker, Button } from 'antd';
import request from '../../../helpers/request';
import store from '../store';
import { observer } from 'mobx-react';

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
  //  {
  //   title: '平均工作温度',
  //   dataIndex: 'temperature',
  // },
  {
    title:'操作',
    render: () => (
      <React.Fragment>
        <a>详情</a>
      </React.Fragment>
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
      <Card>
        <div style={{marginBottom:10}} >选择日期：<RangePicker /></div>
        <Table columns={columns} onChange={onChange} dataSource={history_data} rowKey='eventTime'></Table>
      </Card>
    )
  }
  componentDidMount(){
    getMachineData();
  }
} 

export default HistoryStatus
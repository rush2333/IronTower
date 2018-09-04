import React, { Component, Fragment } from 'react';
import { Card, DatePicker, Breadcrumb, Input, Table, Tabs } from 'antd';
import data from './data';

const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const tabList = [
  {
    key:'ironTower',
    tab:'铁塔异常'
  },
  {
    key:'sensor',
    tab:'传感器异常'
  }
]
const columns = [
  {
    key:'id',
    title:'铁塔ID',
    dataIndex:'equipmentId'
  },
  {
    key:'equipmentName',
    title:'铁塔名称',
    dataIndex:'equipmentName'
  },
  {
    key:'datails',
    title:'详情',
    dataIndex:'details'
  },
  {
    key:'errorTime',
    title:'异常时间',
    dataIndex:'errorTime'
  },
  {
    key:'status',
    title:'状态',
    dataIndex:'status'
  },
]
class ErrorLog extends Component {
  render(){
    return(
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item>故障记录</Breadcrumb.Item>
        </Breadcrumb>
        <Card tabList={tabList}>
          <div style={{marginBottom: 10}}>选择日期：<RangePicker /> </div>
          <Table columns={columns} dataSource={data}> </Table>
        </Card>
      </Fragment>
      )
  }
}

export default ErrorLog
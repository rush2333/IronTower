import React, { Component } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import CommonModalConfig from '../../../common/common-modal'
import CommonFormConfig from '../../../common/common-form'
import { observer } from 'mobx-react';
import store from '../store';
import request from '../../../helpers/request';
import moment from 'moment';

const FormItem = Form.Item;
const route = 'http://oil.mengant.cn/api';


@observer
class IntializeModal extends Component {
  initData = () => {
    let { getFieldsValue } = this.props.form;
    let values = getFieldsValue();
    let { imei, angle_x, angle_y, alarm_x, alarm_y } = values;
    request({
      url: '/api/adjust_initial_angle',
      data: {
        imei: imei,
        angle_x: angle_x,
        angle_y: angle_y,
        warn_x: alarm_x,
        warn_y: alarm_y,
      },
      success: (res) => {
        res = JSON.parse(res);
        res = JSON.parse(res);
        alert(res.msg)
      }
    })
  }
  deviceInit = () => {                                     /**设备初始化 */
    let { getFieldsValue } = this.props.form;
    let values = getFieldsValue();
    let { imei, angle_x, angle_y, alarm_x, alarm_y } = values;
    request({
      url: `${route}/v1/device/init`,
      method: 'GET',
      data:{
        "imei":imei,
        "X0" : angle_x,
        "Y0": angle_y,
        "X1": alarm_x,
        "Y1": alarm_y
      },
      success: (res) => {
        res = JSON.parse(res);
        let id = res.id;
        console.log(id);
        this.initData()
      },
      complete: () => {
        store.initialize_modal.visible = false
      }
    })
  }
  devInitRes = (id) => {                                      /*获取设备初始化结果*/
    request({
      url:`${route}/v1/device/init/res`,
      method: 'GET',
      data: {
        id
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    let { props, params } = this.props;
    let { visible } = props;
    let { x, y, imei} = params;
    let { initialize_modal } = store
    return (
      <Modal visible={visible} title='初始化' onCancel={() => initialize_modal.visible = false} onOk={() => {this.deviceInit();}} {...CommonModalConfig} >
        <Form>
          <Form.Item label='IMEI' {...CommonFormConfig}>
            {getFieldDecorator('imei',{initialValue:imei})(<Input disabled />)}
          </Form.Item>
          <Form.Item label='X轴初始倾角' {...CommonFormConfig}>
            {getFieldDecorator('angle_x', { initialValue: x })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='Y轴初始倾角' {...CommonFormConfig}>
            {getFieldDecorator('angle_y', { initialValue: y})(<Input disabled />)}
          </Form.Item>
          <Form.Item 
            label='设置X轴警报值' 
            {...CommonFormConfig}>
            {getFieldDecorator('alarm_x', { initialValue: '' }, {
              rules: [{ required: true, message: '请输入X轴警报值' }],
            })(<Input placeholder='2' />)}
          </Form.Item>
          <Form.Item label='设置Y轴警报值' {...CommonFormConfig}>
            {getFieldDecorator('alarm_y', { initialValue: '' }, {
              rules: [{ required: true, message: '请输入Y轴警报值' }],
            })(<Input placeholder='2' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(IntializeModal);

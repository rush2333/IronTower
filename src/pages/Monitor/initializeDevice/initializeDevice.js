import React, { Component } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import CommonModalConfig from '../../../common/common-modal'
import CommonFormConfig from '../../../common/common-form'
import { observer } from 'mobx-react';
import store from '../store';
import request from '../../../helpers/request';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

const FormItem = Form.Item;
const route = 'http://oil.mengant.cn/api';
const { RangePicker } = DatePicker;

@observer
class IntializeModal extends Component {
  deviceInit = () => {                                     /**设备初始化 */
    let { getFieldsValue } = this.props.form;
    let { date } = this.props;
    let { startTime, endTime } = date;
    let values = getFieldsValue();
    let { imei, warn_x, warn_y } = values;
    request({
      url: 'api/adjust_initial_angle',
      data: {
        "imei": imei,
        startTime,
        endTime,
        warn_x,
        warn_y,
      },
      success: (res) => {
        console.log(res);
      },
      complete: () => {
        store.initialize_modal.visible = false
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    let { props, params } = this.props;
    let { visible } = props;
    let { imei } = params;
    let { initialize_modal } = store
    return (
      <Modal visible={visible} title='初始化' onCancel={() => initialize_modal.visible = false} onOk={() => { this.deviceInit(); }} {...CommonModalConfig} >
        <Form>
          <Form.Item label='IMEI' {...CommonFormConfig}>
            {getFieldDecorator('imei', { initialValue: imei })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='角度均值时段：' {...CommonFormConfig}>
            {getFieldDecorator('date')(<RangePicker locale={locale} onChange={(date, dateString) => { store.initialParams.startTime = dateString[0]; store.initialParams.endTime = dateString[1]; }} />)}
          </Form.Item>
          <Form.Item label='设置X轴警报值'  {...CommonFormConfig}>
            {getFieldDecorator('warn_x', { initialValue: '' }, {
              rules: [{ required: true, message: '请输入X轴警报值' }],
            })(<Input placeholder='2' />)}
          </Form.Item>
          <Form.Item label='设置Y轴警报值' {...CommonFormConfig}>
            {getFieldDecorator('warn_y', { initialValue: '' }, {
              rules: [{ required: true, message: '请输入Y轴警报值' }],
            })(<Input placeholder='2' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(IntializeModal);

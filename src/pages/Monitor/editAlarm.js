import React ,{Component} from 'react';
import {Modal, Form, Input} from 'antd';
import CommonModalConfig from '../../common/common-modal'
import CommonFormConfig from '../../common/common-form'
import { observer } from 'mobx-react';
import store from './store';

const FormItem = Form.Item;

@observer
class EditAlarm extends Component{

  render(){
    let { props } = this.props;
    let { visible } = props;
    const { getFieldDecorator } = this.props.form;
    return(
      <Modal visible={visible} title='警报指数设置'{...CommonModalConfig} onCancel={() => store.alarm_modal.visible = false} onOk={() => store.alarm_modal.visible = false}>
        <Form>
          <FormItem label='警报倾斜角值：' {...CommonFormConfig}>
            {
              getFieldDecorator('tilt', {
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input placeholder='大于或等于该倾角值将自动警报'/>
              )
            }
          </FormItem>
          <FormItem label='警报X轴倾斜角值：' {...CommonFormConfig}>
            {
              getFieldDecorator('angleXTilt', {
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input placeholder='大于或等于该倾角值将自动警报'/>
              )
            }
          </FormItem>
          <FormItem label='警报Y轴倾斜角值：' {...CommonFormConfig}>
            {
              getFieldDecorator('angleYTilt', {
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input placeholder='大于或等于该倾角值将自动警报'/>
              )
            }
          </FormItem>
          <FormItem label='危险倾斜角值：' {...CommonFormConfig}>
            {
              getFieldDecorator('warnTilt', {
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input placeholder='大于或等于该倾角值将自动警报'/>
              )
            }
          </FormItem>
          <FormItem label='警报电话：' {...CommonFormConfig}>
            {
              getFieldDecorator('telNum', {
                rules: [{
                  required: true, message: '请输入电话号码',
                }],
              })(
                <Input placeholder='请输入电话号码'/>
              )
            }
          </FormItem>
          <FormItem label='警报电话：' {...CommonFormConfig}>
            {
              getFieldDecorator('phoneNum', {
                rules: [{
                  required: true, message: '请输入手机号码',
                }],
              })(
                <Input placeholder='请输入手机号码'/>
              )
            }
          </FormItem>
          <FormItem label='主要负责人：' {...CommonFormConfig}>
            {
              getFieldDecorator('firstManager', {
                rules: [{
                  required: true, message: '请输入负责人',
                }],
              })(
                <Input placeholder='请输入主要负责人姓名'/>
              )
            }
          </FormItem>
          <FormItem label='负责人：' {...CommonFormConfig}>
            {
              getFieldDecorator('secondManager', {
              })(
                <Input placeholder='请输入负责人姓名'/>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditAlarm);
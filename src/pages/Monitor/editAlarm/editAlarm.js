import React ,{Component} from 'react';
import { Modal, Form, Input, DatePicker} from 'antd';
import CommonModalConfig from '../../../common/common-modal'
import CommonFormConfig from '../../../common/common-form'
import { observer } from 'mobx-react';
import store from '../store';
import request from '../../../helpers/request';
import moment from 'moment';

const FormItem = Form.Item;
const route = 'http://oil.mengant.cn/api';

@observer
class EditAlarm extends Component{
  setWarnData = () => {
    let { getFieldsValue } = this.props.form;
    let values = getFieldsValue();
    let { imei, angle_x, angle_y, alarm_x, alarm_y, phone } = values;
    request({
      url: '/api/Set_warn',
      data: {
        imei: imei,
        Tower_id: 1,
        warn_x: alarm_x,
        warn_y: alarm_y,
        phone: phone
      },
      success: (res) => {
        res = JSON.parse(res)
        res = JSON.parse(res);
        alert(res.msg)
      },
      complete: () => {
        store.alarm_modal.visible = false
      }
    })
    this.deviceInit(imei, angle_x, angle_y, alarm_x, alarm_y)
  }
  deviceInit = (imei,angle_x,angle_y,alarm_x,alarm_y) => {                                     /**设备初始化 */
    request({
      url: `${route}/v1/device/init`,
      method: 'GET',
      data: {
        "imei": imei,
        "X0": angle_x,
        "Y0": angle_y,
        "X1": alarm_x,
        "Y1": alarm_y
      },
      success: (res) => {
        console.log(res);
        // res = JSON.parse(res);
        // let id = res.id;
        // this.initData()
      },
      complete: () => {
        // store.initialize_modal.visible = false
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    let { props, params, initialDatas } = this.props;
    let { visible } = props;
    let { imei } = params
    let {angle_x, angle_y, Tower_id} = initialDatas;
    return(
      <Modal visible={visible} title='警报指数设置'{...CommonModalConfig} onCancel={() => store.alarm_modal.visible = false} onOk={() => {this.setWarnData()}}>
        <Form>
          <FormItem label='传感器IMEI：' {...CommonFormConfig}>
            {
              getFieldDecorator('imei', {initialValue: imei},{
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input disabled/>
              )
            }
          </FormItem>
          <FormItem label='铁塔ID：' {...CommonFormConfig}>
            {
              getFieldDecorator('IronTId', { initialValue: Tower_id },{
                rules: [{
                  required: true, message: '请输入铁塔ID',
                }],
              })(
                <Input disabled placeholder='请输入铁塔ID'/>
              )
            }
          </FormItem>
          <FormItem label='X轴初始角度：' {...CommonFormConfig}>
            {
              getFieldDecorator('angle_x', { initialValue: angle_x },{
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='Y轴初始角度：' {...CommonFormConfig}>
            {
              getFieldDecorator('angle_y', { initialValue: angle_y },{
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input disabled />
              )
            }
          </FormItem>
          {/* <FormItem label='初始倾斜角：' {...CommonFormConfig}>
            {
              getFieldDecorator('initialTilt', {
                rules: [{
                  required: true, message: '请输入倾角值',
                }],
              })(
                <Input disabled />
              )
            }
          </FormItem> */}
          <FormItem label='X轴预警值：' {...CommonFormConfig}>
            {
              getFieldDecorator('warn_x', {
                rules: [{
                  required: true, message: '请输入X轴预警值',
                }],
              })(
                <Input placeholder='大于或等于该倾角值将自动警报'/>
              )
            }
          </FormItem>
          <FormItem label='Y轴预警值：' {...CommonFormConfig}>
            {
              getFieldDecorator('warn_y', {
                rules: [{
                  required: true, message: '请输入Y轴预警值',
                }],
              })(
                <Input placeholder='大于或等于该倾角值将自动警报'/>
              )
            }
          </FormItem>
          <FormItem label='警报电话：' {...CommonFormConfig}>
            {
              getFieldDecorator('phone', {
                rules: [{
                  required: true, message: '请输入电话号码',
                }],
              })(
                <Input placeholder='请输入电话号码'/>
              )
            }
          </FormItem>
          {/* <FormItem label='当前日期：' {...CommonFormConfig}>
            {
              getFieldDecorator('firstManager', {
                rules: [{
                  required: true, message: '请输入负责人',
                }],
              })(
                <DatePicker defaultValue= { moment(now,'YYYY-MM-DD ')} disabled />
              )
            }
          </FormItem> */}
          {/* <FormItem label='负责人：' {...CommonFormConfig}>
            {
              getFieldDecorator('secondManager', {
              })(
                <Input placeholder='请输入负责人姓名'/>
              )
            }
          </FormItem> */}
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditAlarm);
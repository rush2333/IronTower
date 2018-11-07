import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Icon, Spin } from 'antd'
import st from './login.css'
import request from '../../helpers/request'
import store from './store';
import { observer } from 'mobx-react'

const FormItem = Form.Item;
const antIcon = <Icon type="loading" spin />;

@observer
class Login extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  render() {
    let { form, globalStore } = this.props;
    let { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = form;
    let { isLogin } = globalStore;
    let { params, loading } = store;
    let { userRetErr, passwordRetErr } = params;
    let userErr = isFieldTouched('userName') && getFieldError('userName') || userRetErr;
    let passwordErr = isFieldTouched('password') && getFieldError('password') || passwordRetErr;
    let btnErr = this.hasErrors(getFieldsError()) || userErr || passwordErr;
    return (
      <div className={st.container}>
        {isLogin ? <Redirect to='/' /> : 
        <div className={st.form}>
          <Spin spinning={loading} indicator={antIcon} tip='登陆中...'>
            <Form>
              <FormItem
                validateStatus={userErr ? 'error' : ''}
                help={userErr}>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(
                  <Input
                    autoComplete='off'
                    size='large'
                    onChange={() => { store.params.userRetErr = false; }}
                    addonBefore={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名" />
                )}
              </FormItem>
              <FormItem
                validateStatus={passwordErr ? 'error' : ''}
                help={passwordErr}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }]
                })(
                  <Input
                    autoComplete='off'
                    size='large'
                    type='password'
                    onChange={() => { store.params.passwordRetErr = false; }}
                    addonBefore={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='密码' />
                )}
              </FormItem>
              <FormItem>
                <Button
                  size='large'
                  htmlType="submit"
                  type={'primary'}
                  onClick={this.login}
                  disabled={btnErr}
                  className={st.loginBtn}>登录</Button>
              </FormItem>
            </Form>
          </Spin>
        </div>}
      </div>
    )
  }
  login = () => {
    let { getFieldsValue } = this.props.form;
    let { globalStore } = this.props;
    let values = getFieldsValue();
    store.loading = true
    request({
      url: '/api/login',
      data: values,
      success: ({ data }) => {
        sessionStorage.setItem('user', values['userName']);
        globalStore.isLogin =true
      },
      fail: ({code,msg}) => {
        if (code == '1001') {
          store.params.userRetErr = msg;
        } else if (code == '1002') {
          store.params.passwordRetErr = msg;
        } else {

        }
      },
      complete: () => {
        store.loading = false
      }
    })
  }
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
}

export default Form.create()(Login)
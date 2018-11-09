import React from 'react';
import { Layout, Menu, Icon, Dropdown, Tag } from 'antd';
import SideMenu from '../SideMenu/SideMenu'
import style from './Layout.css'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import Routers from '../../routes/routes';
import history from '../../history'
import { observer } from 'mobx-react';

const { Header, Content, Footer, } = Layout;

@observer
class IncludeHeader extends React.Component {
  render() {
    let { globalStore } = this.props;
    let is_login = !!sessionStorage.getItem('user')
    const menu = (
      <Menu selectedKeys={[]}>
        <Menu.Item>
          <a onClick={(e) => { e.preventDefault(); }}><Icon type="user" />个人中心</a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={(e) => { e.preventDefault(); globalStore.isLogin = false; sessionStorage.removeItem('user'); history.push('/login') }}> <Icon type="logout" />退出登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <React.Fragment>
        <div className={style.header}>
          {!is_login ? <div className={style.logo}></div> : null}
          <div className={style.right}>
            <Menu mode='horizontal' className={style.menu}>
              <Menu.Item className={`${style["dropdown-button"]} ${style.action}`}>
                <a onClick={(e)=>{e.preventDefault()}}>首页</a>
              </Menu.Item>
              <Dropdown overlay={menu} trigger={['click']} placement='bottomCenter'>
                <span className={`${style["dropdown-button"]} ${style.action}`}><Icon type='user' />admin</span>
              </Dropdown>
            </Menu>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default IncludeHeader
import React from 'react';
import { Dropdown, Menu, Icon, Tag} from 'antd';
import style from './globalHeader.css'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

const MenuItem = Menu.Item

const data = [{
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: '通知',
},
    {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: '2017-08-08',
        type: '通知',
    },
    {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '这种模板可以区分多种通知类型',
        datetime: '2017-08-07',
        read: true,
        type: '通知',
    },
    {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左侧图标用于区分不同的类型',
        datetime: '2017-08-07',
        type: '通知',
    },
    {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '内容不要超过两行字，超出时自动截断',
        datetime: '2017-08-07',
        type: '通知',
    },
    {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        description: '描述信息描述信息描述信息',
        datetime: '2017-08-07',
        type: '消息',
    },
    {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回复了你',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
    },
    {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '标题',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
    },
    {
        id: '000000009',
        title: '任务名称',
        description: '任务需要在 2017-01-12 20:00 前启动',
        extra: '未开始',
        status: 'todo',
        type: '待办',
    },
    {
        id: '000000010',
        title: '第三方紧急代码变更',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '马上到期',
        status: 'urgent',
        type: '待办',
    },
    {
        id: '000000011',
        title: '信息安全考试',
        description: '指派竹尔于 2017-01-09 前完成更新并发布',
        extra: '已耗时 8 天',
        status: 'doing',
        type: '待办',
    },
    {
        id: '000000012',
        title: 'ABCD 版本发布',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '进行中',
        status: 'processing',
        type: '待办',
    },]

export default class GlobalHeader extends React.Component{
    
    render(){
        function getNoticeData(notices) {
            if (notices.length === 0) {
                return {};
            }
            const newNotices = notices.map((notice) => {
                const newNotice = { ...notice };
                if (newNotice.datetime) {
                    newNotice.datetime = moment(notice.datetime).fromNow();
                }
                // transform id to item key
                if (newNotice.id) {
                    newNotice.key = newNotice.id;
                }
                if (newNotice.extra && newNotice.status) {
                    const color = ({
                        todo: '',
                        processing: 'blue',
                        urgent: 'red',
                        doing: 'gold',
                    })[newNotice.status];
                    newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
                }
                return newNotice;
            });
            return groupBy(newNotices, 'type');
        }

        const noticeData = getNoticeData(data);

        const menu = (
            <Menu selectedKeys={[]}>
                <MenuItem>
                    <Icon type="user" />个人中心
                </MenuItem>
                <MenuItem key='logout'>
                    <Icon type="logout" />退出
                </MenuItem>
            </Menu>
        )
        return(
            <div className={style.header}>
                <div className={style.logo}></div>
                <div className={style.right}>
                    <Menu mode='horizontal' className={style.menu}>
                        <MenuItem>
                            <NoticeIcon
                                className={style.action}
                                count={5}
                                onItemClick={(item, tabProps) => {
                                    console.log(item, tabProps); // eslint-disable-line
                                }}
                                onClear={(TabTitle) => { console.log(TabTitle) }}
                                popupAlign={{ offset: [20, -16] }}
                            >
                                <NoticeIcon.Tab
                                    list={noticeData['通知']}
                                    title="通知"
                                    emptyText="你已查看所有通知"
                                    emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                                />
                                <NoticeIcon.Tab
                                    list={noticeData['消息']}
                                    title="消息"
                                    emptyText="您已读完所有消息"
                                    emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                                />
                                <NoticeIcon.Tab
                                    list={noticeData['待办']}
                                    title="待办"
                                    emptyText="你已完成所有待办"
                                    emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                                />
                            </NoticeIcon>
                        </MenuItem>
                        <MenuItem key='user'>
                            <Dropdown overlay={menu} trigger={['click']} placement='bottomCenter'>
                                <span className={style["dropdown-button"]}><Icon type='user' />admin</span>
                            </Dropdown>
                        </MenuItem>
                    </Menu>
                </div>
            
            </div>
        )
    }
}


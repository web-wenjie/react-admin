import React from "react";
import './aside.scss'
import { Menu} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];

const Aside = () => {
    return (
        <>
          <h1 className="logo">
              <span>LOGO</span>
          </h1>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </>
    )
}


export default Aside
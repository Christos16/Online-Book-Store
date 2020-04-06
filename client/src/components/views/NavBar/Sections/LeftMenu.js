import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key='mail'>
        <a href='/' style={{ fontSize: '15px' }}>
          Home
        </a>
      </Menu.Item>
      <SubMenu title={<span style={{ fontSize: '15px' }}>About</span>}>
        <MenuItemGroup>
          <Menu.Item key='setting:2'>
            <a href='/privacy-policy'>Privacy Policy</a>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;

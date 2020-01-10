import React, { Component } from 'react';
import {  Menu, Icon ,Avatar} from 'antd';
import { Link } from 'react-router-dom';

export default class SideBar_User extends Component {
  
    render() {
        return (
            <div className="SidebarUser">
                <Menu className="SidebarUser_Menu"
                    mode="inline"
                    theme='Light'>

                    <Menu.Item className="SidebarUser_Menu_Item" style={{minHeight:'100px',display:"flex",justifyContent:'center' }}>
						<Avatar style={{ margin:'20px' }} size={(80)} src={require("../../assets/images/logo/UserLogo.jpg")}></Avatar>
					</Menu.Item>
                    <Menu.Item className="Menu_Item" style={{minHeight:'30px' }}>
                        <Link exact to='/user/profile' style={{fontSize: '18px'}}>
                            <Icon  type="contacts"/>Hồ sơ cá nhân
                        </Link>
                    </Menu.Item>
                    <Menu.Item className="Menu_Item" style={{minHeight:'30px' }}>
                        <Link exact to='/user/courselist' style={{fontSize: '18px'}}>
                            <Icon type="appstore" />
                            Danh sách khóa học
                        </Link>
                    </Menu.Item>
                    <Menu.Item className="Menu_Item" style={{minHeight:'30px' }}>
                        <Link exact to='/user/update' style={{fontSize: '18px'}}>
                            <Icon  type="upload" />
                            Cập nhật tài khoản
                        </Link>
                    </Menu.Item>
                </Menu>
           
            </div>
        )
    }
}

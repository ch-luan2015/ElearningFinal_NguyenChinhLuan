import React, { Component } from "react";
import {Link } from "react-router-dom";
import { Menu, Icon ,Avatar} from "antd";
const { SubMenu } = Menu;

export default class SidebarAdmin extends Component {

	render() {
		return (
			<div className="SidebarAdmin">
				
				<Menu className="SidebarAdmin_Menu"
					checkedChildren="Dark" 
					unCheckedChildren="Light"
					theme='dark'
					defaultOpenKeys={["sub1"]}
					mode="inline"
					style={{backgroundColor:'#001429'}}>

					<Menu.Item className="SidebarAdmin_Menu_Item" style={{minHeight:'100px',display:"flex",justifyContent:'center' }}>
						<Avatar style={{ marginTop:'20px', }} size={(80)} src={require("../../assets/images/logo/Admin.jpg")}></Avatar>
					</Menu.Item>
					<Menu.Item style={{color:'#f56a00',fontSize:36,display:"flex",justifyContent:'center',minHeight:'20px'}}>
								Admin
					</Menu.Item>

					<SubMenu key="sub1" className="SidebarAdmin_Menu_SubMenu1"
						title={
							<span>
								<Icon type="book" style={{fontSize: '20px'}} />
								<span>Quản Lý Khoá Học</span>
							</span>
						}>
							<Menu.Item key="1" className="Admin-Menu_Item">
								<Link to="/admin/addcourse">
									<Icon type="plus" style={{fontSize: '20px'}} />Thêm Khoá Học
								</Link>		
							</Menu.Item>
					
						<Menu.Item key="2" className="Admin-Menu_Item">
							<Link to="/admin/listcourse" >
								<Icon type="appstore" style={{fontSize: '20px'}}/>Danh Sách Khoá Học
							</Link>	
						</Menu.Item>

					</SubMenu>

					<SubMenu className="SidebarAdmin_Menu_SubMenu2"
						key="sub2"
						title={
							<span>
								<Icon type="user" style={{fontSize: '20px'}} />
								Quản Lý Người Dùng
							</span>
						}>
						<Menu.Item key="5" className="Admin-Menu_Item">	
							<Link to="/admin/adduser" >
								<Icon type="user-add" style={{fontSize: '20px'}} />Thêm Người Dùng
							</Link>
						</Menu.Item>
						<Menu.Item key="6" className="Admin-Menu_Item">	
							<Link to="/admin/listuser" >
								<Icon type="team" style={{fontSize: '20px'}} />Danh Sách Người Dùng
							</Link>
						</Menu.Item>
						
					</SubMenu>
				
				</Menu>
			</div>
		);
	}
}

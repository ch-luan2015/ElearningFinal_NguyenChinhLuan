import React, { Component } from 'react'
import {Menu,  } from 'antd';
import {Link} from 'react-router-dom';


export default class FooterAdmin extends Component {
  render() {
    return (

      <div className="FooterAdmin" >
        <Menu className="FooterAdmin_Menu"
               mode="horizontal"
				      theme="light">    
         
          <Menu.Item style={{border: "none"}}>
            <Link style={{textDecoration: "none"}}>&copy; {new Date().getFullYear()}Design By E.Learning. Mọi quyền được bảo hộ</Link>
          </Menu.Item >
          <Menu.Item style={{border: "none"}}>
              <Link style={{textDecoration: "none"}}>Blog</Link>
          </Menu.Item>
          <Menu.Item style={{border: "none"}}>
              <Link style={{textDecoration: "none"}}>Thông tin pháp lý</Link>
          </Menu.Item>
          
        </Menu>
      </div>
    );
  }
}

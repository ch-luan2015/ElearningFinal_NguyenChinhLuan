import React,{ Fragment } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { isLoginAdmin } from './isLogin';
import styles from '../AdminTemplate/AdminTemplate.module.css'


import SidebarAdmin from "../../Components/SidebarAdmin/SidebarAdmin"
import HeaderAdmin from "../../Components/HeaderAdmin/HeaderAdmin"
import FooterAdmin from "../../Components/FooterAdmin/FooterAdmin"
import { Layout, Row, Col, Menu } from 'antd';
const AdminLayOut = (props) =>{
    const { Header, Footer, Sider, Content } = Layout;

    return (
    <Fragment>	
	<Layout>
			<HeaderAdmin className= {styles.header}></HeaderAdmin>
			<Layout >
				<Sider className= {styles.sider}>
					<SidebarAdmin></SidebarAdmin>
				</Sider>
				<Layout>	
					<Content>{props.children}</Content>
					<FooterAdmin></FooterAdmin>
				</Layout>
			
			</Layout>
			
	</Layout>

</Fragment>
    )
}

export const PrivateRoute = ({ Component, ...props}) =>(
    <Route {...props} render = {(propComponent)=>(
        isLoginAdmin() ?
        <AdminLayOut>
            <Component {...propComponent} />
        </AdminLayOut>
        : <Redirect to="/" />
    )}/>
)
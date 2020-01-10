import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import SidebarAdmin from "../../Components/SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../../Components/HeaderAdmin/HeaderAdmin";
import FooterAdmin from "../../Components/FooterAdmin/FooterAdmin";
import { Row, Col} from "antd";
import { isLoginAdmin } from "../CheckAndRouter/isLogin";


const AdminLayout = props => {
	return (
		<Fragment>
			<Row>
				<Col span={24}>
					<HeaderAdmin />
				</Col>
				
			</Row>

			<Row className="Admin_Layout_Content">
				<Col span={4} style={{ backgroundColor:'#001429',minHeight: "100vh"}}>
					<div style={{ backgroundColor:'#001429 ' }}>
						<SidebarAdmin />
					</div>	
				</Col>

				<Col span={20}>
					<Row>
						<Col span={24}>
							<div style={{ minHeight: "90vh",marginLeft:"0px" }}>{props.children}</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<FooterAdmin />
						</Col>
					</Row>
				</Col>
			</Row>
		</Fragment>
	);
};

export const AdminTemplate = ({ Component, ...props }) => (
	<Route
		{...props}
		render={propComponent =>
			isLoginAdmin() ? (
				<AdminLayout>
					<Component {...propComponent} />
				</AdminLayout>
			) : (
				<Redirect to='/'/>
			)
		}
	/>
);

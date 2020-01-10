import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoginUser } from "../../templates/CheckAndRouter/isLogin";
import { Row, Col } from "antd";
import FooterAdmin from "../../Components/FooterAdmin/FooterAdmin";
import SideBarUser from "./SideBarUser";
import HeaderAdmin  from "../../Components/HeaderAdmin/HeaderAdmin";

const UserLayout = props => {
	return (
		<Fragment>
			<Row>
				<Col span={24}>
					<HeaderAdmin />
				</Col>
			</Row>
			<Row className="User_Layout-Content">
				<Col span={4} className="User_Layout-SiderBarUser">
					<SideBarUser />
				</Col>

				<Col span={20}>
					<Row>
						<Col span={24} >
							<div style={{ minHeight: "85vh",marginLeft:"0px" }}>{props.children}</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<FooterAdmin className="Footer_Template" />
						</Col>
					</Row>
				</Col>
			</Row>
		</Fragment>
	);
};

//HOC userTemplate
export const UserTemplate = ({ Component, ...props }) => (
	<Route
		{...props}
		render={propComponent =>
			isLoginUser() ? (
				<UserLayout>
					<Component {...propComponent} />
				</UserLayout>
			) : (
				<Redirect to="/" />
			)
		}
	/>
);

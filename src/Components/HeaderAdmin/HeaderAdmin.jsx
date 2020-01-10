import React, { Component } from "react";
import { connect } from "react-redux";
import { settings } from "../../common/Config/settings";
import { isLogin,isLoginAdmin } from "../../templates/CheckAndRouter/isLogin";
import { Link,withRouter } from "react-router-dom";
import { thongTinTaiKhoanAction } from "../../redux/actions/QuanLyNguoiDungAction";
import {  Menu, Avatar, Badge, Icon, Row, Col, Modal, Button } from "antd";
import UserInformation from "../../templates/UserTemplate/UserInformation";


const { SubMenu } = Menu;
export class HeaderAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal3Visible: false,
		};
	}

	

	
	setModal3Visible(modal3Visible) {
		this.setState({
			modal3Visible
		});
	}

	logOut = () => {
		localStorage.removeItem(settings.token);
		localStorage.removeItem(settings.userLogin);
		this.forceUpdate();
		window.location.href = "/";
	};

	checkLogin= () => {
			if (isLogin()===true) {
				let {hoTen}=JSON.parse(localStorage.getItem('userLogin'));
				return (
					<div className="Header_Admin" >
						<Row className="Admin_Logo-Row">
							<Col span={5} className="Admin-Logo">
								<Link to="/">
									<img alt="hinh anh" style={{ width: "70px", height: "70px", margin: "10px 20px", borderRadius: "50%" }}
										src={require("../../assets/images/logo/logo (2).png")}/>
									<span>E.Learning</span>
								</Link>
							</Col>

							<Col span={19} className="Admin-Col_Menu" > 
								<Menu className="Admin_Menu" mode="horizontal" theme="dark">
									<Menu.Item>
										<Badge count={7}>
											<Icon type="global" size="large" style={{fontSize: "24px" }} />
										</Badge>
									</Menu.Item>
									<Menu.Item>
										<Badge count={10}>
											<Icon type="mail" size="large" style={{ fontSize: "24px" }} />
										</Badge>
									</Menu.Item>
									<Menu.Item>
										<Badge count={12}>
											<Icon type="link" size="large" style={{ fontSize: "24px" }} />
										</Badge>
									</Menu.Item>
									<Menu.Item
										key="setting:1"
										data-toggle="modal"
										data-target="#UserInformation"
										onClick={() => {
											this.setModal3Visible(true);
										}}>
										{hoTen}
									</Menu.Item>

									<SubMenu className="Admin_Item" title={<Avatar size={55} src={require("../../assets/images/imghocvien/profile.jpg")} />}>
										<Menu.Item key="setting:2">
											{isLoginAdmin()===true?<Link to="/admin" exact>Trang Quản Lý</Link>:
											<Link to="/user" exact>Trang Quản Lý</Link>}
										</Menu.Item>

										<Menu.Item key="setting:3">
											<Link to="/" onClick={() => this.logOut()}>
												Đăng Xuất
											</Link>
										</Menu.Item>
									</SubMenu>
								</Menu>
							</Col>
						</Row>
					</div>
				);
			} else {
				return (
					<div className="Header_Admin">
						<Row className="Admin_Logo-Row">
							<Col span={5} className="Admin-Logo">
								<Link to="/">
									<img alt="hinh anh"
										src={require("../../assets/images/logo/logo (2).png")}
										style={{ width: "70px", height: "70px", margin: "10px 20px" }}
									/>
									<span>E.Learning</span>
								</Link>
							</Col>

							<Col span={19} className="Admin-Col_Menu" >
								<Menu mode="horizontal"  className="Admin_Menu" theme="dark" >
									<Menu.Item disabled>
										<Button.Group size="large">
											<Link to="/RegisterPage">
												<Button type="dashed">
													<Icon
														type="heart"
														theme="twoTone"
														twoToneColor="#eb2f96"
														style={{ Color: "#FFFFFF", fontSize: "18px" }}
													/>
													<span>Đăng Ký</span>
												</Button>
											</Link>
											<Link to="/Login">
												<Button type="primary">
													<span>Đăng Nhập</span>
													<Icon type="login" style={{ fontSize: "18px" }} />
												</Button>
											</Link>
										</Button.Group>
									</Menu.Item>
								</Menu>
							</Col>
						</Row>
					</div>
				);
			}
		}
	

	render() {

		return (
			<div>
				{this.checkLogin()}
				<Modal
					centered
					width="1280px"
					visible={this.state.modal3Visible}
					data-toggle="modal"
					data-target="#UserInformation"
					onCancel={() => this.setModal3Visible(false)}
					footer={null}>
					<div style={{ padding: "0", margin: "0" }}>
						<UserInformation />
					</div>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	nguoiDungDangNhap: state.QuanLyNguoiDungReducer.nguoiDungDangNhap
});
const mapDispatchToProps = dispatch => ({
	getThongTinTaiKhoan: TTTK => {
		dispatch(thongTinTaiKhoanAction(TTTK));
	}
});

// export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin));

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { dangNhapAction, nguoiDangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { settings } from "../../common/Config/settings";

import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
const { Title } = Typography;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taiKhoan: "",
			matKhau: ""
		};
	}

	//Check Login
	callBack = () => {
		let userLogin = JSON.parse(localStorage.getItem(settings.userLogin));
		let maLoaiNguoiDung = userLogin ? userLogin.maLoaiNguoiDung : "";
		if (maLoaiNguoiDung === "GV") {
			this.props.history.push("/admin");
		} else this.props.history.push("/user");
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log("state", this.state);
		this.props.dangNhap(this.state, this.callBack); // đưa dữ liệu lên action
	};

	handleChange = e => {
		this.props.form.validateFields((err, values) => {
			console.log(".lkji", values);
			if (!err) {
				this.setState({ taiKhoan: values.taiKhoan, matKhau: values.matKhau });
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};
		
		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form" type="horizone">
				<Title className="login-form_title" level={2} code strong>
					Đăng Nhập
				</Title>

				<Form.Item onChange={this.handleChange} label="Tài khoản" className="login-form_item">
					{getFieldDecorator("taiKhoan", {
						rules: [{ required: true, message: "Nhập vào tài khoản của bạn !" }]
					})(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />)}
				</Form.Item>
				<Form.Item onChange={this.handleChange} label="Mật khẩu" className="login-form_item">
					{getFieldDecorator("matKhau", {
						rules: [{ required: true, message: "Nhập vào mật khẩu của bạn !" }]
					})(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />)}
				</Form.Item>


				<Form.Item className="Login-Form_Bottom">
					{getFieldDecorator("remember", {
						valuePropName: "checked",
						initialValue: true
					})(<Checkbox>Remember me</Checkbox>)}
					<h7 className="login-form-forgot" 
						onClick={() => {
							alert("Vui lòng liên hệ Giảng Viên để nhận lại mật khẩu!");
						}}>
						Quên mật Khẩu
					</h7>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Đăng Nhập
						</Button>
						<Button type="default" htmlType="submit" className="login-form-button">
							<Link to="/">Trở Lại</Link>
						</Button>
					</Form.Item>

					<p> hoặc<span className="login-form_button_p">
							<Link to="/RegisterPage">Đăng ký ngay!</Link>
						</span>
					</p>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedLoginForm = Form.create({ name: "normal_login", labelCol: "Đăng Nhập" })(Login);

const mapDispatchToProps = dispatch => {
	return {
		dangNhap: (thongTinNguoiDung, callBack) => {
			dispatch(dangNhapAction(thongTinNguoiDung, callBack));
		},
		nguoiDangNhap: () => {
			dispatch(nguoiDangNhapAction());
		}
	};
};
export default connect(null, mapDispatchToProps)(WrappedLoginForm);

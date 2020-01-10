import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { Typography, Form, Input, Tooltip, Icon, Select, Checkbox, Button} from "antd";
const { Title } = Typography;
const { Option } = Select;

export class RegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nguoiDung: {
				taiKhoan: "",
				matKhau: "",
				hoTen: "",
                soDT: "",
                maNhom:'GP07',
				email: ""
			},
			errors: {
				taiKhoan: "",
				matKhau: "",
				hoTen: "",
                soDT: "",
                maNhom:'GP07',
				email: ""
			},
		};
	}

	
	handleSubmit = e => {
		e.preventDefault();
		
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				let { taiKhoan, matKhau, hoTen, soDT, email } = values;
				
				let nguoiDung={
					taiKhoan:taiKhoan,
					matKhau:matKhau,
					hoTen:hoTen,
					soDT:soDT,
					maNhom:'GP07',
					email:email,
				}
				this.props.dangKy(nguoiDung);
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
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};
		const prefixSelector = getFieldDecorator("prefix", {
			initialValue: "86"
		})(
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		);

		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
				<Title level={2} code strong className="register-form_title">
						Đăng Ký
				</Title>
			
				<Form.Item className="register-form_item"
					label={
						<span>
							Tài Khoản&nbsp;
							<Tooltip title="Bạn muốn người khác gọi bạn là gì ?">
								<Icon type="question-circle-o" />
							</Tooltip>
						</span>
					}>
					{getFieldDecorator("taiKhoan", {
						rules: [{ required: false }]
					})(<Input placeholder={this.state.nguoiDung.taiKhoan} />)}
				</Form.Item>

				<Form.Item label="Mật Khẩu" hasFeedback className="register-form_item">
					{getFieldDecorator("matKhau", {
						rules: [
							{
								required: true,
								message: "Hãy nhập mật khẩu của bạn !"
							},
							{
								validator: this.validateToNextPassword
							}
						]
					})(<Input.Password />)}
				</Form.Item>
			
				<Form.Item className="register-form_item"
					label="Họ và Tên">
					{getFieldDecorator("hoTen", {
						rules: [{ required: true, message: "Please input your nickname!", whitespace: true }]
					})(<Input />)}
				</Form.Item>

				<Form.Item label="E-mail" className="register-form_item"> 
					{getFieldDecorator("email", {
						rules: [
							{
								type: "email",
								message: "Email không đúng!"
							},
							{
								required: true,
								message: "Vui lòng nhập vào Email!"
							}
						]
					})(<Input />)}
				</Form.Item>

				<Form.Item label="Điện thoại" className="register-form_item">
					{getFieldDecorator("soDT", {
						rules: [{ required: false, message: "Vui lòng nhập vào số điện thoại của bạn!" }]
					})(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
				</Form.Item>
			
				
				<Form.Item {...tailFormItemLayout} className="register-form-forgot">
					{getFieldDecorator("agreement", {
						valuePropName: "checked"
					})(
						<Checkbox>
							Tôi đã đọc quy định của khoá học !
						</Checkbox>
					)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}  className="register-form-button"> 
					<Button type="primary" htmlType="submit">Đăng Ký </Button>
					<Button type="default"><Link to="/login" >Trở Lại</Link></Button>
                    
				</Form.Item>
			</Form>
		);
	}
}

const WrappedRegistrationForm = Form.create({ name: "register" })(RegisterPage);

const mapDispatchToProps = dispatch => {
	return {
		dangKy: thongTinHocVien => {
			console.log('dk dispatch',thongTinHocVien);
			dispatch(dangKyAction(thongTinHocVien));
		}
	};
};
export default connect(null, mapDispatchToProps)(WrappedRegistrationForm);

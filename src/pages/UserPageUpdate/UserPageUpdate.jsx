import React from "react";
import { connect } from "react-redux";
import { PageHeader, Form, Input, Tooltip, Icon, Select, Checkbox, Button, Tag } from "antd";
import { capNhatNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { settings } from "../../common/Config/settings";
import styles from './UserPageUpdate.module.css'




class UserPageUpdate extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nguoiDungCapNhat: {
				taiKhoan: "",
				matKhau: "",
				hoTen: "",
				soDT: "",
				maLoaiNguoiDung: "",
				maNhom: "",
				email: ""
			},
			errors: {
				taiKhoan: "",
				matKhau: "",
				hoTen: "",
				soDT: "",
				maLoaiNguoiDung: "",
				maNhom: "",
				email: ""
			},
			nguoiDung: JSON.parse(localStorage.getItem("userLogin")),

			confirmDirty: false,
		};
	}



	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				let { matKhau, hoTen, soDT, email } = values;
				let { taiKhoan, maLoaiNguoiDung } = this.state.nguoiDung;
				let nguoiDungCapNhat = {
					taiKhoan: taiKhoan,
					matKhau: matKhau,
					hoTen: hoTen,
					soDT: soDT,
					maNhom: settings.groupID,
					email: email,
					maLoaiNguoiDung: maLoaiNguoiDung
				};
				console.log('nguoiDungCapNhat', nguoiDungCapNhat)
				this.props.capNhatNguoiDung(nguoiDungCapNhat);
			}
		});
	};


	render() {
		const { Option } = Select;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 }
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
			initialValue: "84"
		})(
			<Select style={{ width: 70 }}>
				<Option value="84">+84</Option>
				<Option value="86">+86</Option>
			</Select>
		);


		return (
			<div className={styles.Formupdate}>
				<PageHeader
					style={{ color:'#E83E8C',
					border: "1px solid rgb(235, 237, 240)",
					backgroundColor:'#F0F0F0',
					marginTop:'0'
				}}
					tags={<Tag color="blue">Updating</Tag>}
					title="Cập Nhật Thông Tin"
				 />
				<Form {...formItemLayout} onSubmit={this.handleSubmit} style={{marginTop:"30px"}}>
					<Form.Item
						label={
							<span>Tài Khoản&nbsp;
								<Tooltip title="Bạn muốn người khác gọi bạn là gì ?">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						} >
						{getFieldDecorator("taiKhoan", {
							rules: [{ required: false }]
						})(<Input disabled placeholder={this.state.nguoiDung.taiKhoan} />)}
					</Form.Item>

					<Form.Item label="Mật Khẩu" hasFeedback>
						{getFieldDecorator("matKhau", {
							rules: [
								{
									required: true,
									message: "Xin hãy nhập vào mật khẩu của bạn!"
								},
							]
						})(<Input.Password />)}
					</Form.Item>

					<Form.Item
						label={
							<span>Họ và Tên&nbsp;</span>
						}>
						{getFieldDecorator("hoTen", {
							rules: [{ required: true, message: "Xin hãy nhập vào họ và tên của bạn!", whitespace: true }]
						})(<Input placeholder={this.state.nguoiDung.hoTen} />)}
					</Form.Item>

					<Form.Item label="E-mail">
						{getFieldDecorator("email", {
							rules: [
								{
									type: "email",
									message: "Email không đúng !"
								},
								{
									required: true,
									message: "Xin hãy nhập vào email của bạn !"
								}
							]
						})(<Input placeholder={this.state.nguoiDung.email} />)}
					</Form.Item>


					<Form.Item label="Phone Number">
						{getFieldDecorator("soDT", {
							rules: [{ required: true, message: "Xin hãy nhập vàp số điện thoại !" }]
						})(<Input addonBefore={prefixSelector} style={{ width: "100%" }} placeholder={this.state.nguoiDung.soDT} />)}
					</Form.Item>

					<Form.Item label="Mã Loại">
						{getFieldDecorator("maLoaiNguoiDung", {
							rules: [{ required: false }]
						})
							(
								<Input disabled={true} placeholder={this.state.nguoiDung.maLoaiNguoiDung}  />
							)}
					</Form.Item>

					<Form.Item label="Group ID"  >
						{getFieldDecorator("maNhom", {

							rules: [{ required: false }]
						})(
							<Input disabled={true} placeholder={this.state.nguoiDung.maNhom} />
						)}
					</Form.Item>



					<Form.Item {...tailFormItemLayout}>
						{getFieldDecorator("agreement", {
							valuePropName: "checked"
						})(
							<Checkbox>
								Đồng ý cập nhật !
						</Checkbox>
						)}
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							Cập Nhật
					</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const WrappedUpdateForm = Form.create({ name: "update" })(UserPageUpdate);

const mapDispatchToProps = dispatch => {
	return {
		capNhatNguoiDung: nguoiDungCapNhat => {
			dispatch(capNhatNguoiDungAction(nguoiDungCapNhat));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(WrappedUpdateForm);

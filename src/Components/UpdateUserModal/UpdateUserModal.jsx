import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Select, Tooltip, Checkbox, Icon, Button, Form, Input, Row, Col, Typography } from "antd";
import { layDanhSachNguoiDungAction, capNhatNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";

const { Text } = Typography;

export class UpdateUserModal extends Component {
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
			confirmDirty: false
		};
	}

	handleSubmitUpdate = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				let { taiKhoan, matKhau, hoTen, soDT, email, maLoaiNguoiDung, maNhom } = values;
				let nguoiDungCapNhat = {
					taiKhoan: taiKhoan,
					matKhau: matKhau,
					hoTen: hoTen,
					soDT: soDT,
					maNhom: maNhom,
					email: email,
					maLoaiNguoiDung: maLoaiNguoiDung
				};
				this.props.capNhatNguoiDung(nguoiDungCapNhat);
			}
		});
	};

	render() {
		let nguoiDung = JSON.parse(localStorage.getItem("userChoose"));

		const { Option } = Select;
		const { visible, onCancel, onCreate } = this.props;
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
					span: 10,
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

		return nguoiDung !== null ? (
			<Modal width="1000px" style={{ top: 80 }} visible={visible} okText="Create" footer={null} onCancel={onCancel} onOk={onCreate}>
				<Form
					layout="horizontal"
					{...formItemLayout}
					onSubmit={this.handleSubmitUpdate}
					style={{ height: "500px", paddingLeft: "100px", fontSize: "16px" }}>
					<Row>
						<Col span={24} style={{ paddingRight: "100px", textAlign: "center", margin: "50px 0" }}>
							<Text code strong style={{ fontSize: "28px" }}>
								Cập Nhật Thông Tin Học Viên
							</Text>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<Form.Item
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
								})(<Input placeholder={nguoiDung.taiKhoan} />)}
							</Form.Item>

							<Form.Item label="Mật Khẩu" hasFeedback>
								{getFieldDecorator("matKhau", {
									rules: [
										{
											required: true,
											message: "Xin hãy nhập vào mật khẩu của bạn!"
										}
									]
								})(<Input.Password />)}
							</Form.Item>

							<Form.Item label={<span>Họ và Tên&nbsp;</span>}>
								{getFieldDecorator("hoTen", {
									rules: [{ required: true, message: "Xin hãy nhập vào họ và tên của bạn!", whitespace: true }]
								})(<Input placeholder={nguoiDung.hoTen} />)}
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
								})(<Input placeholder={nguoiDung.email} />)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Phone Number">
								{getFieldDecorator("soDT", {
									rules: [{ required: true, message: "Xin hãy nhập vàp số điện thoại !" }]
								})(<Input addonBefore={prefixSelector} style={{ width: "100%" }} placeholder={nguoiDung.soDt} />)}
							</Form.Item>

							<Form.Item label="Mã Loại">
								{getFieldDecorator("maLoaiNguoiDung", {
									rules: [{ required: false }]
								})(<Input placeholder={nguoiDung.maLoaiNguoiDung} />)}
							</Form.Item>

							<Form.Item label="Group ID">
								{getFieldDecorator("maNhom", {
									rules: [{ required: false }]
								})(<Input />)}
							</Form.Item>

							<Form.Item {...tailFormItemLayout}>
								{getFieldDecorator("agreement", {
									valuePropName: "checked"
								})(<Checkbox>Đồng ý cập nhật !</Checkbox>)}
							</Form.Item>

							<Form.Item {...tailFormItemLayout}>
								<Button type="primary" htmlType="submit">
									Cập Nhật
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		) : (
			""
		);
	}
}

const WrappedUpdateUserModal = Form.create({ name: "updatmodal" })(UpdateUserModal);

const mapStateToProps = state => {
	return {
		mangNguoiDung: state.QuanLyNguoiDungReducer.mangNguoiDung,
		mangTimKiemNguoiDung: state.QuanLyNguoiDungReducer.mangTimKiemNguoiDung
	};
};

const mapDispatchToProps = dispatch => {
	return {
		layDanhSachNguoiDung: () => {
			dispatch(layDanhSachNguoiDungAction());
		},
		capNhatNguoiDung: nguoiDungCapNhat => {
			dispatch(capNhatNguoiDungAction(nguoiDungCapNhat));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedUpdateUserModal);

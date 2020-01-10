import React, { Component } from "react";
import { connect } from "react-redux";
import { layDanhSachNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";
import { layDanhSachKhoaHocAction,themKhoaHocAction, layDanhMucKhoaHocAction } from "../../../redux/actions/QuanLyKhoaHocAction";
import {  Button, Icon, Input, Select, Row, Col, Upload, message, Form, DatePicker, Typography } from "antd";
import moment from "moment";

const { Text } = Typography;
const { Option } = Select;

export class AddCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			khoaHoc: {
				maKhoaHoc: "",
				biDanh:"",
				tenKhoaHoc: "",
				moTa: "",
				luotXem: 0,
				danhGia: 0,
				hinhAnh: "",
				ngayTao:"",
				taiKhoanNguoiTao: "",
				maDanhMucKhoaHoc: "",
			},
			errors: {
				maKhoaHoc: "",
				biDanh:"",
				tenKhoaHoc: "",
				moTa: "",
				luotXem: 0,
				danhGia: 0,
				hinhAnh: "",
				ngayTao:"",
				taiKhoanNguoiTao: "",
				maDanhMucKhoaHoc: "",
			},
		
			loading: false
		};
	}

	componentDidMount() {
		this.props.layDanhSachNguoiTao();
		this.props.layDanhMucKhoaHoc();
	}

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	beforeUpload = file => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};

	handleChange = e => {
		let { value, name, type } = e.target;

		if (type !== "file") {
			this.setState(
				{
					khoaHoc: { ...this.state.khoaHoc, [name]: value }
				},
				() => {
					console.log(this.state.khoaHoc);
				}
			);
		} else {
			console.log("e.targert.file", e.target.files);
			this.setState(
				{
					khoaHoc: { ...this.state.khoaHoc, [name]: e.target.files[0] }
				},
				() => {
					console.log(this.state.khoaHoc);
				}
			);
		}
	};

	

	onChange = (date, dateString) => {
		console.log("date", dateString);
		this.setState({
			khoaHoc: { ...this.state.khoaHoc, ngayTao: dateString }
		});
	};

	

	handleChange1 = value => {
		this.setState(
			{
				khoaHoc: { ...this.state.khoaHoc, taiKhoanNguoiTao: value }
			},
			() => {
				console.log(this.state.khoaHoc);
			}
		);
	};

	handleChange2 = value => {
		this.setState(
			{
				khoaHoc: { ...this.state.khoaHoc, maDanhMucKhoaHoc: value }
			},
			() => {
				console.log(this.state.khoaHoc);
			}
		);
	};

	handleChangeUpload = info => {
		console.log("info", info);
		if (info.file.status === "uploading") {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			this.getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false
				})
			);
		}

		console.log(info.file);
		this.setState(
			{
				khoaHoc: { ...this.state.khoaHoc, hinhAnh: info.file.originFileObj }
			},
			() => {
				console.log(this.state.khoaHoc);
			}
		);
	};

	renderDanhMucKhoaHoc = () => {
		return this.props.mangDanhMucKhoaHoc.map((dmKhoaHoc, index) => {
			return (
				<Option key={index} size="large" value={dmKhoaHoc.maDanhMuc}>
					{dmKhoaHoc.tenDanhMuc}
				</Option>
			);
		});
	};
	renderNguoiTao = () => {
		return this.props.mangNguoiDung.map((nguoiDung, index) => {
			if (nguoiDung.maLoaiNguoiDung === "GV") {
				return (
					<Option key={index} size="large" value={nguoiDung.taiKhoan}>
						{nguoiDung.hoTen}
					</Option>
				);
			}
		});
	};
	handleSubmit = event => {
		event.preventDefault();
		console.log("khoa hoc cap nhat submit ", this.state.khoaHoc);
		this.props.themKhoaHoc(this.state.khoaHoc);
	};

	render() {
		const { TextArea } = Input;
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? "loading" : "plus"} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const { imageUrl } = this.state;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 12 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};
		

		const dateFormat = "DD/MM/YYYY";

		return (
				<Form
					layout="vertical"
					onSubmit={this.handleSubmit}
					{...formItemLayout}
					style={{ height: "600px", paddingLeft: "100px", fontSize: "16px" }}>
					<Row>
						<Col span={24} style={{ paddingRight: "100px", textAlign: "center", margin: "50px 0" }}>
							<Text code strong style={{ fontSize: "28px" }}>
								Thêm Khoá Học
							</Text>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<Form.Item label="Tên Khóa Học">
								<Input size="large" name="tenKhoaHoc" value={this.state.khoaHoc.tenKhoaHoc} onChange={this.handleChange} />
							</Form.Item>
							<Form.Item label="Mã Khóa Học">
								<Input size="large" name="maKhoaHoc" value={this.state.khoaHoc.maKhoaHoc} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item label="Mã Danh Mục" hasFeedback>
								<Select placeholder="Chọn mã danh mục" size="large" name="maDanhMucKhoaHoc" onChange={this.handleChange2}>
									{this.renderDanhMucKhoaHoc()}
								</Select>
							</Form.Item>
						</Col>

						<Col span={8}>
							<Form.Item label="Bí Danh">
								<Input size="large" name="biDanh" value={this.state.khoaHoc.biDanh} onChange={this.handleChange} />
							</Form.Item>

							<Form.Item label="Giảng Viên" hasFeedback>
								<Select placeholder="Chọn giảng viên " size="large" name="taiKhoanNguoiTao" onChange={this.handleChange1}>
									{this.renderNguoiTao()}
								</Select>
							</Form.Item>

							<Form.Item label="Mã Nhóm">
								<Input size="large" disabled placeholder="GP07" />
							</Form.Item>

							<Form.Item style={{ textAlign: "center" }}>
								<Button type="primary" htmlType="submit" size="large">
									Thêm
								</Button>
							</Form.Item>
						</Col>

						<Col span={8}>
							<Form.Item label="Ngày Tạo">
								<DatePicker
									size="large"
									placeholder="Chọn ngày tạo"
									onChange={this.onChange}
									defaultValue={moment()}
									defaultPickerValue={moment()}
									format={dateFormat}
								/>
							</Form.Item>

							<Form.Item label="Mô Tả">
								<TextArea
									size="large"
									name="moTa"
									onChange={this.handleChange}
									value={this.state.khoaHoc.moTa}
									autoSize={{ minRows: 5, maxRows: 7 }}
								/>
							</Form.Item>
							<Form.Item label="Hình Ảnh ( .jpeg/ .png )">
								<Upload
									name="hinhAnh"
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									beforeUpload={this.beforeUpload}
									onChange={this.handleChangeUpload}>
									{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
								</Upload>
							</Form.Item>
						</Col>
					</Row>
				
				</Form>
			
		);
	}
}

const WrappedAddCourseModal= Form.create({ name: "addCoursemodal" })(AddCourse);

const mapStateToProps = state => {
	return {
		mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
		mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
		mangNguoiDung: state.QuanLyNguoiDungReducer.mangNguoiDung
	};
};

const mapDispatchToProps = dispatch => {
	return {
		layDanhSachKhoaHoc: () => {
			dispatch(layDanhSachKhoaHocAction());
		},
		layDanhMucKhoaHoc: () => {
			dispatch(layDanhMucKhoaHocAction());
		},
		layDanhSachNguoiTao: () => {
			dispatch(layDanhSachNguoiDungAction());
		},
		themKhoaHoc: khoaHoc => {
			console.log("cap nhat khoa hoc dispatch", khoaHoc);
			dispatch(themKhoaHocAction(khoaHoc));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedAddCourseModal);

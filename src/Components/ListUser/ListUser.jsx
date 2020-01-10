import { Table, Tag } from "antd";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PageHeader,Modal, Icon, Button, Form, Input,  Row, Col } from "antd";
import {
	layDanhSachNguoiDungAction,
	xoaNguoiDungAction,
	timKiemNguoiDungAction,
} from "../../redux/actions/QuanLyNguoiDungAction";

import {
	layDSKHChoXetDuyetCuaNguoiDungAction,
	layDSKHDaGhiDanhCuaNguoiDungAction,
	layDSKHChuaGhiDanhAction
} from "../../redux/actions/QuanLyNguoiDungAction";

import styles from "./ListUser.module.css";
import ModalInfoUser from "./ModalInfoUser";
import WrappedUpdateForm from "../UpdateUserModal/UpdateUserModal";

class ListUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputSearch: "",
			modal3Visible: false,
			visible: false,
		};
	}

	setModal3Visible(modal3Visible, taiKhoan) {
		this.setState({
			modal3Visible,
			taiKhoan
		});
	}

	//////////////////////////////
	showModalUpdateUser = () => {
		this.setState({ visible: true });
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	handleCreate = () => {
		const { form } = this.formRef.props;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			console.log("Received values of form: ", values);
			form.resetFields();
			this.setState({ visible: false });
		});
	};

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	////////////////////////////////

	componentDidMount() {
		//Gọi action lấy danh mục khoá học
		this.props.layDanhSachNguoiDung();
	}

	handleSubmit = e => {
		e.preventDefault(); //chặn submit của browser
		this.props.timKiemNguoiDung(this.state.inputSearch); // đưa dữ liệu lên action
	};

	handleChange = e => {
		let { value, name } = e.target;
		// const stateTam = { ...this.state, [name]: value };

		this.setState({ [name]: value });
		if (this.state.inputSearch !== "") {
			this.props.timKiemNguoiDung(this.state.inputSearch);
		} else {
			this.props.layDanhSachNguoiDung();
		}

		// if (name === "tuKhoa") {
		// 	this.props.timKiemNguoiDung(stateTam);
		// }
	};

	saveTaiKhoan = taiKhoan => {
		localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
	};
	saveUser = userChoose => {
		localStorage.setItem("userChoose", JSON.stringify(userChoose));
	};

	render() {
		const columns = [
			{
				title: "STT",
				dataIndex: "STT",
				key: "stt",
				width: 80
			},

			{
				title: "Tài Khoản",
				dataIndex: "taiKhoan",
				key: "taikhoan",
				width: 100,
				render: text => <span>{text}</span>
			},

			{
				title: "Họ Và Tên",
				dataIndex: "hoTen",
				width: 150,
				key: "hoten"
			},

			{
				title: "Email",
				dataIndex: "email",
				width: 300,
				key: "email"
			},

			{
				title: "Số Điện Thoại",
				dataIndex: "soDt",
				key: "sodt",
				width: 140,
				render: text => <span>{text}</span>
			},

			{
				title: "Mã Loại",
				dataIndex: "maLoaiNguoiDung",
				key: "maloainguoidung",
				width: 100,
				render: (text, record) => {
					let loai = record.maLoaiNguoiDung === "GV" ? "GV" : "HV";
					let color = loai === "GV" ? "#f50" : "#2db7f5";
					return (
						<span>
							<Tag color={color} key={loai}>
								{loai.toUpperCase()}
							</Tag>
						</span>
					);
				}
			},

			{
				title: "Thao Tác",
				key: "action",
				width: 180,

				render: (text, record) => (
					<span className="groupIcon">
						<Button style={{marginRight:'10px'}}
							type="default"
							shape="circle"
							icon="profile"
							size="large"
							title="Thông Tin Người Dùng"
							className="buttonIcon"
							data-toggle="modal"
							data-target="#ModalInfo_User"
							onClick={() => {
								this.setModal3Visible(true);
								this.props.layDSKHChoXetDuyetCuaNguoiDung(record.taiKhoan);
								this.props.layDSKHDaGhiDanh(record.taiKhoan);
								this.saveTaiKhoan(record.taiKhoan);
								this.saveUser(record);
								this.props.layDSKHChuaGhiDanh(record.taiKhoan);
							}}
						/>

						<Button style={{marginRight:'10px'}}
							type="primary"
							shape="circle"
							icon="edit"
							size="large"
							className="buttonIcon"
							title="Cập Nhật"
							onClick={() => {
								this.showModalUpdateUser();
								this.saveUser(record);
							}}></Button>

						<WrappedUpdateForm
							wrappedComponentRef={this.saveFormRef}
							visible={this.state.visible}
							onCancel={this.handleCancel}
							onCreate={this.handleCreate}
						/>

						<Button
							type="danger"
							shape="circle"
							icon="delete"
							size="large"
							className="buttonIcon"
							title="Xoá Nguời Dùng"
							onClick={() => {
								this.props.xoaNguoiDung(record.taiKhoan);
							}}
						/>
					</span>
				)
			}
		];

		let data1 = this.props.mangNguoiDung;
		data1 = data1.map((nguoiDung, i) => {
			return { ...nguoiDung, STT: i + 1 };
		});

		let data2 = this.props.mangTimKiemNguoiDung;
		data2 = data2.map((khoaHoc, i) => {
			return { ...khoaHoc, STT: i + 1 };
		});

		let data = this.state.inputSearch !== "" ? data2 : data1;

		return (
			<Fragment>
				<div className="container" style={{ width: "100%", height: "90vh", textalign: "center" ,marginTop:'50px'}} id="content">
					<Row className={styles.title}>
					<Col span={15}>
						<PageHeader
							style={{
								border: "1px solid rgb(235, 237, 240)"
							}}
							tags={<Tag color="blue">Students</Tag>}
							title="Danh Sách Người Dùng"
						 />
					</Col>

						<Col span={9} className={styles.searchBox}>
							<Form className="form-inline" onSubmit={this.handleSubmit}>
								<Input
									suffix={<Icon type="smile" theme="twoTone" twoToneColor="#1990FF" style={{ fontSize: "18px" }} />}
									style={{ width: 300 }}
									onChange={this.handleChange}
									name="inputSearch"
									size="large"
									type="search"
									placeholder="Nhập tên người dùng"
								/>
							</Form>
						</Col>
					</Row>

						<Table
							style={{ textAlign: "justify", marginright: "10px" }}
							className={styles.table}
							rowKey={record => record.id}
							columns={columns}
							bordered="true"
							dataSource={data}
							pagination={{ defaultCurrent: 1, pageSize: 3 }}
							scroll={{ x: 500, y: 350 }}
						/>
		
				</div>

				<div style={{ position: "absolute", bottom: "0", width: "100%" }}></div>

				
				<Modal
					centered
					width="1280px"
					visible={this.state.modal3Visible}
					data-toggle="modal"
					data-target="#ModalInfo_User"
					onCancel={() => this.setModal3Visible(false)}
					footer={null}>
						<div style={{ padding: "0", margin: "0" }}>
							<ModalInfoUser />
						</div>
				</Modal>
		
			</Fragment>
		);
	}
}

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
		xoaNguoiDung: taiKhoan => {
			dispatch(xoaNguoiDungAction(taiKhoan));
		},
		timKiemNguoiDung: tenNguoiDung => {
			dispatch(timKiemNguoiDungAction(tenNguoiDung));
		},
		layDSKHChoXetDuyetCuaNguoiDung: TTTK => {
			dispatch(layDSKHChoXetDuyetCuaNguoiDungAction(TTTK));
		},
		layDSKHDaGhiDanh: TTTK => {
			dispatch(layDSKHDaGhiDanhCuaNguoiDungAction(TTTK));
		},
		layDSKHChuaGhiDanh: TTTK => {
			dispatch(layDSKHChuaGhiDanhAction(TTTK));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ListUser);

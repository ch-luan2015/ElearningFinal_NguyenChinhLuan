import {
	layDanhSachKhoaHocAction,
	xoaKhoaHocAction,
	timKiemKhoaHocAction,
	chinhSuaKhoaHocAction,
	layDSHVKhoaHocAction,
	layDSNDChuaGhiDanhBangKhoaHocAction,
	layDSHVChoXetDuyetAction
} from "../../redux/actions/QuanLyKhoaHocAction";
// ant Design
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {PageHeader,Tag,Table, Form , Modal, Button, Icon, Input,  Row, Col } from "antd";
import styles from "./ListCourse.module.css";
import ModalInfoCourse from "./ModalInfo_Course";
import WrappedUpdateCourseModal from "../UpdateCourseModal/UpdateCourseModal"



export class ListCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputSearch: "",
			modal3Visible: false,
			khoaHoc: "",
			maKhoaHoc: "",
			visible: false,
		};
	}

	
	setModal3Visible(modal3Visible) {
		this.setState({
			modal3Visible
		});
	}

	//////////////////////////////
	showModalUpdateCourse = () => {
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
		this.props.layDanhSachKhoaHoc();
	}

	handleSubmit = e => {
		e.preventDefault(); //chặn submit của browser
		this.props.timKiemKhoaHoc(this.state.inputSearch); // đưa dữ liệu lên action
	};

	handleChange = e => {
		let { value, name } = e.target;
		// const stateTam = { ...this.state, [name]: value };

		this.setState({ [name]: value }, () => {
			if (this.state.inputSearch !== "") {
				this.props.timKiemKhoaHoc(this.state.inputSearch);
			} else {
				this.props.layDanhSachKhoaHoc();
			}
		});

		// if (name === "tuKhoa") {
		// 	this.props.timKiemKhoaHoc(stateTam);
		// }
	};

	saveMaKHoaHoc = maKhoaHoc => {
		localStorage.setItem("maKhoaHoc", JSON.stringify(maKhoaHoc));
	};

	render() {
		const columns = [
			{
				title: "STT",
				dataIndex: "STT",
				key: "id",
				width: 50
			},
			{
				title: "Tên Khoá Học",
				dataIndex: "tenKhoaHoc",
				key: "tenkhoahoc",
				width: 120
			},
			{
				title: "Danh Mục",
				dataIndex: "danhMucKhoaHoc.maDanhMucKhoahoc",
				key: "madanhmuckhoahoc",
				render: text => <span>{text}</span>,
				width: 120,
			},

			{
				title: "Hình Ảnh",
				dataIndex: "hinhAnh",
				key: "hinhanh",
				width: 110,
				render: (text, record) => <img alt="hinh khoa hoc" src={record.hinhAnh} width="80px" height="60px" />
			},
			{
				title: "Học Viên",
				dataIndex: "soLuongHocVien",
				key: "soluonghocvien",
				width: 80
			},
			{
				title: "Lượt Xem",
				dataIndex: "luotXem",
				key: "luotxem",
				width: 80
			},
			{
				title: "Người Tạo",
				dataIndex: "nguoiTao.hoTen",
				key: "nguoitao",
				width: 160
			},

			{
				title: "Thao Tác",
				key: "action",
				width: 160,

				render: (text, record) => (
					<span className="groupIcon">
						<Button style={{marginRight:'10px'}}
							type="default"
							shape="circle"
							icon="profile"
							size="large"
							className="buttonIcon"
							data-toggle="modal"
							data-target="#ModalInfoCourse"
							title="Danh Sách Người Dùng"
							onClick={() => {
								this.setModal3Visible(true);
								this.props.layDSNDChuaGhiDanhBangKhoaHoc(record.maKhoaHoc);
								this.props.layDSHVKhoaHoc(record.maKhoaHoc);
								this.props.layDSHVChoXetDuyet(record.maKhoaHoc);
								this.saveMaKHoaHoc(record.maKhoaHoc);
							}}
						/>

						<Button style={{marginRight:'10px'}}
							type="primary"
							shape="circle"
							icon="edit"
							size="large"
							className="buttonIcon"
							title="Cập Nhật Khoá Học"
							onClick={() => {
								this.showModalUpdateCourse();
							}}></Button>

						<WrappedUpdateCourseModal
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
							title="Xoá Khoá Học"
							onClick={() => {
								this.props.xoaKhoaHoc(record.maKhoaHoc);
							}}
						/>
					</span>
				)
			}
		];

		let data1 = this.props.mangKhoaHoc;
		data1 = data1.map((khoaHoc, i) => {
			return { ...khoaHoc, STT: i + 1 };
		});

		let data2 = this.props.mangTimKiemKhoaHoc;
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
							tags={<Tag color="blue">Course</Tag>}
							title="Danh Sách Khóa Học"
						 />
					</Col>

						<Col span={9} className={styles.searchBox}>
							<Form className="form-inline" onSubmit={this.handleSubmit}>
								<Input
									suffix={<Icon type="book" theme="twoTone" twoToneColor="#1990FF" style={{ fontSize: "18px" }} />}
									style={{ width: 300 }}
									onChange={this.handleChange}
									name="inputSearch"
									size="large"
									type="search"
									placeholder="Nhập tên khoá học"
								/>
							</Form>
						</Col>
					</Row>


						<Table
							style={{ textAlign: "justify", marginright: "10px" }}
							className={styles.table}
							columns={columns}
							rowKey={record => record.id}
							dataSource={data}
							bordered="true"
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
					data-target="#ModalInfoCourse"
					onCancel={() => this.setModal3Visible(false)}
					footer={null}>
					<div style={{ padding: "0", margin: "0" }}>
						<ModalInfoCourse />
					</div>
				</Modal>
		
			</Fragment>
		);
	}
}



const mapStateToProps = state => {
	return {
		mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
		mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
		mangTimKiemKhoaHoc: state.QuanLyKhoaHocReducer.mangTimKiemKhoaHoc,

		// Du lieu dang ky nguoi dung bang khoa hoc
		mangDSNDChuaGhiDanhBangKhoaHoc: state.QuanLyKhoaHocReducer.mangDSNDChuaGhiDanhBangKhoaHoc,
		mangDSHVKhoaHoc: state.QuanLyKhoaHocReducer.mangDSHVKhoaHoc
	};
};

const mapDispatchToProps = dispatch => {
	return {
		layDanhSachKhoaHoc: () => {
			dispatch(layDanhSachKhoaHocAction());
		},
		timKiemKhoaHoc: tenKhoaHoc => {
			dispatch(timKiemKhoaHocAction(tenKhoaHoc));
		},
		xoaKhoaHoc: maKhoaHoc => {
			dispatch(xoaKhoaHocAction(maKhoaHoc));
		},
		chinhSuaKhoaHoc: khoaHocSua => {
			dispatch(chinhSuaKhoaHocAction(khoaHocSua));
		},
		layDSNDChuaGhiDanhBangKhoaHoc: maKhoaHoc => {
			dispatch(layDSNDChuaGhiDanhBangKhoaHocAction(maKhoaHoc));
		},
		layDSHVKhoaHoc: maKhoaHoc => {
			dispatch(layDSHVKhoaHocAction(maKhoaHoc));
		},
		layDSHVChoXetDuyet: maKhoaHoc => {
			dispatch(layDSHVChoXetDuyetAction(maKhoaHoc));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);

import {
	layDanhSachKhoaHocAction,
	xoaKhoaHocAction,
	timKiemKhoaHocAction,
	chinhSuaKhoaHocAction,
	layDSHVKhoaHocAction,
	layDSNDChuaGhiDanhBangKhoaHocAction,
	huyDangKyKhoaHocAction,
	ghiDanhKhoaHocAction
} from "../../redux/actions/QuanLyKhoaHocAction";
import { settings } from "../../common/Config/settings";
// ant Design
import { Table, Form, Select, Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ModalInfo_Course.module.css";

export class ModalInfoCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// modal1Visible: false,
			// modal2Visible: false,
			// modal3Visible: false,
			khoaHoc: "",
			maKhoaHoc: "",
			maKhoaHocNhanDuoc: this.props.maKhoaHoc
		};
	}

	componentDidMount() {
		//Gọi action lấy danh mục khoá học
		this.props.layDanhSachKhoaHoc();
	}

	handleChange = e => {
		let { value, name } = e.target;
		// const stateTam = { ...this.state, [name]: value };
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
	};

	handleSubmitInformation = taiKhoan => {
		if (localStorage.getItem(settings.token)) {
			let TTTK = {
				taiKhoan: taiKhoan,
				maKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc"))
			};
			this.props.postThongTinTaiKhoan(TTTK);
		}
	};

	handleSubmitInformationSelected = () => {
		if (localStorage.getItem(settings.token)) {
			let TTTK = {
				taiKhoan: localStorage.getItem("taiKhoanSelected"),
				maKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc"))
			};
			this.props.postThongTinTaiKhoan(TTTK);
		}
	};

	handleCancleInformation = taiKhoan => {
		//Lay thong tin tai khoan va maKhoaHoc
		if (localStorage.getItem(settings.token)) {
			let TTTK = {
				taiKhoan: taiKhoan,
				maKhoaHoc: JSON.parse(localStorage.getItem("maKhoaHoc"))
			};
			this.props.huyDangKyKhoaHoc(TTTK);
		}
	};

	saveTaiKhoan=(taiKhoan)=>{
		return localStorage.setItem("taiKhoanSelected",taiKhoan);
	}

	render() {
		const { Option } = Select;

		const columnsTableChoXetDuyet = [
			{
				title: "STT",
				dataIndex: "STT",
				width: 100,
				key: "index",
			},
			{
				title: "Tài Khoản",
				dataIndex: "taiKhoan",
				key: "taikhoan",

			},
			{
				title: "Họ Tên",
				dataIndex: "hoTen",
				key: "hoten",

			},

			{
				title: "Bí Danh",
				dataIndex: "biDanh",
				key: "bidanh",

			},

			{
				title: "Chờ Xác Nhận",
				key: "action",
				fixed: "right",
				width: 180,


				render: (text, record) => (
					<span className="groupIcon">
						<Button style={{marginRight:'10px'}}
							type="primary"
							size="large"
							icon="edit"
							title="Xác Thực"
							onClick={() => {
								this.handleSubmitInformation(record.taiKhoan);
							}}></Button>

						<Button style={{marginRight:'10px'}}
							type="danger"
							size="large"
							icon="delete"
							title="Xoá Khoá Học"
							onClick={() => {
								this.handleCancleInformation();
							}}></Button>
					</span>
				)
			}
		];

		const columnsTableHocVienKhoaHoc = [
			{
				title: "STT",
				dataIndex: "STT",
				width: 100,
				key: "id"
			},
			{
				title: "Tài Khoản",
				dataIndex: "taiKhoan",
				key: "taikhoan",

			},
			{
				title: "Họ Tên",
				dataIndex: "hoTen",
				key: "hoten",

			},

			{
				title: "Bí Danh",
				dataIndex: "biDanh",
				key: "bidanh",

			},

			{
				title: "Chờ Xác Nhận",
				key: "action",
				width: 180,
				fixed: "right",

				render: (text, record) => (
					<span className="groupIcon">
						<Button
							type="danger"
							size="large"
							icon="delete"
							title="Xoá Khoá Học"
							onClick={() => {
								this.handleCancleInformation(record.taiKhoan);
							}}></Button>
					</span>
				)
			}
		];

		let data1 = this.props.mangDSHVChoXetDuyet;
		data1 = data1.map((hocVien, i) => {
			return { ...hocVien, STT: i + 1 };
		});

		let data2 = this.props.mangDSHVKhoaHoc;
		data2 = data2.map((hocVien, i) => {
			return { ...hocVien, STT: i + 1 };
		});

		const dataTableChoXetDuyet = data1;
		const dataTableHocVienKhoaHoc = data2;

		return (this.props.mangDSNDChuaGhiDanhBangKhoaHoc?
			<div style={{ width: "100%", textalign: "center" }} id="content">
					<div className={styles.searchBox}>
					<Form className={styles.form_inline} onSubmit={this.handleSubmit}>
						<Form.Item>
							<Select placeholder="Học viên chưa ghi danh" name="taiKhoan" style={{ width: 300 , padding:10}} size="medium">
								{this.props.mangDSNDChuaGhiDanhBangKhoaHoc.map((ND, index) => {
									return (
										<Option key={index} value={ND.taiKhoan} onClick={()=>this.saveTaiKhoan(ND.taiKhoan)}>
											{ND.hoTen}
										</Option>
									);
								})}
							</Select>
							<Button htmltype="submit" type="primary" size="medium"  title="Xác Thực" icon="check-circle"
											onClick={()=>this.handleSubmitInformationSelected()}>
											Xác Thực
							</Button>
						</Form.Item>
					</Form>
					</div>
		
				<div style={{ width: "100%", textalign: "left" }} id="content">
					<div className={styles.quanLyKhoaHoc}>
						<h6 className={styles.title}>Học Viên Chờ Xác Thực</h6>

						<Table size="middle"
							style={{ textAlign: "center", marginright: "10px" }}
							className={styles.table}
							columns={columnsTableChoXetDuyet}
							rowKey={record => record.id}
							dataSource={dataTableChoXetDuyet}
							pagination={{ defaultCurrent: 1, pageSize: 2,size: 'small',total:'20'}}
							scroll={{ x: 500, y: 350 }}
						/>
					</div>
				</div>



				<div style={{ width: "100%", textalign: "center" }} id="content">
					<div className={styles.quanLyKhoaHoc}>
						<h6 className={styles.title}>Học Viên Đã Tham Gia Khoá Học</h6>

						<Table size="middle"
							style={{ textAlign: "justify", marginright: "10px" }}
							className={styles.table}
							columns={columnsTableHocVienKhoaHoc}
							rowKey={record => record.id}
							dataSource={dataTableHocVienKhoaHoc}
							pagination={{ defaultCurrent: 1, pageSize: 2,size: 'small',total:'20', }}
							scroll={{ x: 500, y: 350 }}
						/>
					</div>
				</div>

				{/* <div style={{ position: "absolute", bottom: "0", width: "100%" }}></div> */}
			</div>:"Loading"
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
		mangDSHVKhoaHoc: state.QuanLyKhoaHocReducer.mangDSHVKhoaHoc,
		mangDSHVChoXetDuyet: state.QuanLyKhoaHocReducer.mangDSHVChoXetDuyet
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
		postThongTinTaiKhoan: TTTK => {
			dispatch(ghiDanhKhoaHocAction(TTTK));
		},
		huyDangKyKhoaHoc: TTTK => {
			dispatch(huyDangKyKhoaHocAction(TTTK));
		}
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalInfoCourse);

import { xoaKhoaHocAction, timKiemKhoaHocAction, huyDangKyKhoaHocAction, ghiDanhKhoaHocAction } from "../../redux/actions/QuanLyKhoaHocAction";
import { settings } from "../../common/Config/settings";
// ant Design
import { Table, Select, Button, Form } from "antd";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styles from "./ModalInfoUser.module.css";

export class ModalInfoCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tuKhoa: ""
		};
	}


	handleChange = e => {
		let { value, name } = e.target;
		this.setState({
			khoaHoc: { ...this.state.khoaHoc, [name]: value }
		});
		// const stateTam = { ...this.state, [name]: value };
		// this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault(); //chặn submit của browser
	};

	handleSubmitInformation = maKhoaHoc => {
		//Lay thong tin tai khoan va maKhoaHoc
		if (localStorage.getItem(settings.token)) {
			let TTTK = {
				maKhoaHoc: maKhoaHoc,
				taiKhoan: JSON.parse(localStorage.getItem("taiKhoan"))
			};
			this.props.postThongTinTaiKhoan(TTTK);
		}
	};

	handleSubmitInfoSelected = e => {
		if (localStorage.getItem(settings.token)) {
			let TTTK = {
				maKhoaHoc: localStorage.getItem("maKhoaHoc"),
				taiKhoan: JSON.parse(localStorage.getItem("taiKhoan"))
			};
			this.props.postThongTinTaiKhoan(TTTK);
		}
	};

	handleCancleInformation = maKhoaHoc => {
		//Lay thong tin tai khoan va maKhoaHoc
		if (localStorage.getItem(settings.token)) {
			let TTTK = {
				maKhoaHoc: maKhoaHoc,
				taiKhoan: JSON.parse(localStorage.getItem("taiKhoan"))
			};
			this.props.huyDangKyKhoaHoc(TTTK);
		}
	};

	saveMaKhoaHoc = maKhoaHoc => {
		return localStorage.setItem("maKhoaHoc", maKhoaHoc);
	};

	render() {
		const { Option } = Select;

		const columnsTableChoXetDuyet = [
			{
				title: "STT",
				dataIndex: "STT",
				width: 100,
				key: "index"
			},
			{
				title: "Tên Khoá Học",
				dataIndex: "tenKhoaHoc",
				key: "tenkhoaHoc"
			},

			{
				title: "Chờ Xác Nhận",
				key: "action",
				width: 180,
				fixed: "right",

				render: (text, record) => (
					<span className="groupIcon">
						<Button style={{marginRight:'10px'}}
							type="primary"
							size="large"
							icon="edit"
							title="Xác Thực"
							onClick={() => {
								this.handleSubmitInformation(record.maKhoaHoc);
							}}></Button>

						<Button style={{marginRight:'10px'}}
							type="danger"
							size="large"
							icon="delete"
							title="Xoá Khoá Học"
							onClick={() => {
								this.handleCancleInformation(record.maKhoaHoc);
							}}></Button>
					</span>
				)
			}
		];

		const columnsTableKhoaHoc = [
			{
				title: "STT",
				dataIndex: "STT",
				width: 100,
				key: "index"
			},
			{
				title: "Tên Khoá Học",
				dataIndex: "tenKhoaHoc",
				key: "tenkhoahoc"
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
								this.handleCancleInformation(record.maKhoaHoc);
							}}></Button>
					</span>
				)
			}
		];

		let data1 = this.props.mangDSKHChoXetDuyet;
		data1 = data1.map((khoaHoc, i) => {
			return { ...khoaHoc, STT: i + 1 };
		});

		let data2 = this.props.mangDSKHDaGhiDanh;
		data2 = data2.map((hocVien, i) => {
			return { ...hocVien, STT: i + 1 };
		});

		const dataTableChoXetDuyet = data1;
		const dataTableKhoaHocDaGhiDanh = data2;

		return this.props.mangDSKHChuaGhiDanh ? (
			<Fragment>
				<div style={{ width: "100%", textalign: "left" }} id="content">
					<div className={styles.searchBox}>
						<Form className={styles.form_inline} onSubmit={this.handleSubmitInfoSelected}>
							<Form.Item>
								<Select placeholder="Chọn khóa học" name="maKhoaHoc" style={{ width: 300, padding: 10 }} size="medium">
									{this.props.mangDSKHChuaGhiDanh.map((khoaHoc, index) => {
										return (
											<Option key={index} value={khoaHoc.maKhoaHoc} onClick={() => this.saveMaKhoaHoc(khoaHoc.maKhoaHoc)}>
												{khoaHoc.tenKhoaHoc}
											</Option>
										);
									})}
								</Select>
								<Button
									htmltype="submit"
									type="primary"
									size="medium"
									title="Xác Thực"
									icon="check-circle"
									onClick={() => {
										this.handleSubmitInfoSelected();
									}}>
									Xác Thực
								</Button>
							</Form.Item>
						</Form>
					</div>

					<div style={{ width: "100%", textalign: "center" }} id="content">
						<div className={styles.quanLyNguoiDung}>
							<h6 className={styles.title}>Khoá Học Chờ Xác Thực</h6>

							<Table size="middle"
								style={{ textAlign: "justify", marginright: "10px" }}
								className={styles.table}
								rowKey={record => record.id}
								columns={columnsTableChoXetDuyet}
								dataSource={dataTableChoXetDuyet}
								pagination={{ defaultCurrent: 1, pageSize: 2,size: 'small',total:'20', }}
								scroll={{ x: 500, y: 350 }}
							/>
						</div>
					</div>

					{/* <div style={{ position: "absolute", bottom: "0", width: "100%" }}></div> */}

					<div style={{ width: "100%", textalign: "center" }} id="content">
						<div className={styles.quanLyKhoaHoc}>
							<h6 className={styles.title}>Khóa Học Đã Ghi Danh</h6>

							<Table size="middle"
								style={{ textAlign: "justify", marginright: "10px" }}
								className={styles.table}
								columns={columnsTableKhoaHoc}
								rowKey={record => record.id}
								dataSource={dataTableKhoaHocDaGhiDanh}
								pagination={{ defaultCurrent: 1, pageSize: 2,size: 'small',total:'20', }}
								scroll={{ x: 500, y: 350 }}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		) : (
			"Loading"
		);
	}
}

const mapStateToProps = state => {
	return {
		mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
		mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
		mangTimKiemKhoaHoc: state.QuanLyKhoaHocReducer.mangTimKiemKhoaHoc,

		// Du lieu dang ky khoa hoc bang nguo dung
		mangDSKHChoXetDuyet: state.QuanLyNguoiDungReducer.mangDSKHChoXetDuyet,
		mangDSKHDaGhiDanh: state.QuanLyNguoiDungReducer.mangDSKHDaGhiDanh,
		mangDSKHChuaGhiDanh: state.QuanLyNguoiDungReducer.mangDSKHChuaGhiDanh
	};
};

const mapDispatchToProps = dispatch => {
	return {
		timKiemKhoaHoc: tenKhoaHoc => {
			dispatch(timKiemKhoaHocAction(tenKhoaHoc));
		},
		xoaKhoaHoc: maKhoaHoc => {
			dispatch(xoaKhoaHocAction(maKhoaHoc));
			console.log("makhoahocdispatch", maKhoaHoc);
		},

		postThongTinTaiKhoan: TTTK => {
			dispatch(ghiDanhKhoaHocAction(TTTK));
		},
		huyDangKyKhoaHoc: TTTK => {
			dispatch(huyDangKyKhoaHocAction(TTTK));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalInfoCourse);

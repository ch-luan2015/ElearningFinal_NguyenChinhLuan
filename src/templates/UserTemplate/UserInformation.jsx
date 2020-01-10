import React, { Component, Fragment } from "react";
import { Descriptions, Badge,Tag,PageHeader  } from "antd";
import { connect } from "react-redux";
import { thongTinTaiKhoanAction } from "../../redux/actions/QuanLyNguoiDungAction";

import Swal from "sweetalert2";
import { settings } from "../../common/Config/settings";
import styles from "./UserInformation.module.css";


export class UserInformation extends Component {
	componentDidMount() {
		//lấy giá trị tham số từ url this.props.match.params.tenThamSo
        // let {maKhoaHoc} = this.props.match.params;
        setTimeout(()=>{
            this.props.getThongTinTaiKhoan();
            this.handleSubmitInformation();
        }, 100);
		
	}

	handleSubmitInformation = e => {
		//Lay thong tin tai khoan
		if (localStorage.getItem(settings.token)) {
			let TTTK = {
				taiKhoan: JSON.parse(localStorage.getItem(settings.userLogin)).taiKhoan
			};
			this.props.getThongTinTaiKhoan(TTTK);
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Vui lòng đăng nhập. "
			});
		}
	};

	layChiTietKhoaHocDaGhiDanh = () => {
		return this.props.thongTinTaiKhoan.chiTietKhoaHocGhiDanh.map((khoaHoc, index) => {
			return (
				<li>
					<p>{khoaHoc.tenKhoaHoc}</p>
        </li>
			);
		});
	};

	render() {

		return (this.props.thongTinTaiKhoan.chiTietKhoaHocGhiDanh?
			<Fragment>
				<PageHeader
					style={{ color:'#E83E8C',
							border: "1px solid rgb(235, 237, 240)",
							backgroundColor:'#F0F0F0',
							marginTop:'0'
						}}
							tags={<Tag color="blue">Infomation</Tag>}
							title="Thông Tin Tài Khoản"
						 />
				<Descriptions bordered className={styles.UserInformation_Title}>
						
					<Descriptions.Item label="Trạng Thái" span={1}>
						<Badge status="processing" text="Online" />
					</Descriptions.Item>
					<Descriptions.Item label="Mã Loại" >{this.props.thongTinTaiKhoan.maLoaiNguoiDung}</Descriptions.Item>
					<Descriptions.Item label="Mã Nhóm">{this.props.thongTinTaiKhoan.maNhom}</Descriptions.Item>


					<Descriptions.Item label="Họ Và Tên" span={1}>{this.props.thongTinTaiKhoan.hoTen}</Descriptions.Item>
					<Descriptions.Item label="Số Điện Thoại" span={1}>{this.props.thongTinTaiKhoan.soDT}</Descriptions.Item>
					<Descriptions.Item label="Email">{this.props.thongTinTaiKhoan.email}</Descriptions.Item>

					<Descriptions.Item label="Tài Khoản">{this.props.thongTinTaiKhoan.taiKhoan}</Descriptions.Item>
					<Descriptions.Item label="Mật Khẩu">{this.props.thongTinTaiKhoan.matKhau}</Descriptions.Item>
					<Descriptions.Item label="Khoá Học Đã Ghi Danh">
                        <ul>
                            {this.layChiTietKhoaHocDaGhiDanh()}
                        </ul>
                        </Descriptions.Item>
				</Descriptions>
			</Fragment>:"Loading"
		);
	}
}

const mapStateToProps = state => ({
	thongTinTaiKhoan: state.QuanLyNguoiDungReducer.thongTinTaiKhoan
});
const mapDispatchToProps = dispatch => ({
	getThongTinTaiKhoan: TTTK => {
		dispatch(thongTinTaiKhoanAction(TTTK));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInformation);

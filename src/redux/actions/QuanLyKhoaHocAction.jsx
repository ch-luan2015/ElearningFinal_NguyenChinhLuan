import { actionTypes } from "../constants/QuanLyKhoaHocConstant";
import { settings } from "../../common/Config/settings";
import axios from "axios";
import Swal from "sweetalert2";

//GET
export const layDanhMucKhoaHocAction = () => {
	return dispatch => {
		axios({
			url: settings.domain + "/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
			method: "GET"
		})
			.then(result => {
				dispatch({
					type: actionTypes.LAY_DANH_MUC_KHOA_HOC,
					mangDanhMucKhoaHoc: result.data
				});
			})
			.catch(error => {
				console.log(error.response);
			});
	};
};

export const layKhoaHocTheoDanhMucAction = maDanhMuc => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${settings.groupID}`,
			method: "GET"
		})
			.then(result => {
				dispatch({
					type: actionTypes.LAY_KHOA_HOC_THEO_DANH_MUC,
					mangKhoaHocTheoDanhMuc: result.data
				});
			})
			.catch(error => {
				console.log(error.response);
			});
	};
};

export const timKiemKhoaHocAction = tenKhoaHoc => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=${settings.groupID}`,
			method: "GET"
		})
			.then(result => {
				dispatch({
					type: actionTypes.TIM_KIEM_KHOA_HOC,
					mangTimKiemKhoaHoc: result.data
				});
			})
			.catch(error => {
				console.log(error.response.data);
			});
	};
};

export const layDanhSachKhoaHocAction = () => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${settings.groupID}`,

			method: "GET"
		})
			.then(result => {
				//Sau khi lấy dữ liệu người dùng về từ api => đưa dữ liệu lên reducer
				dispatch({
					type: actionTypes.LAY_DANH_SACH_KHOA_HOC,
					mangKhoaHoc: result.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const layChiTietKhoaHocAction = maKhoaHoc => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
			type: "GET"
		})
			.then(result => {
				dispatch({
					type: actionTypes.LAY_CHI_TIET_KHOA_HOC,
					thongTinKhoaHoc: result.data
				});
			})
			.catch(error => {
				console.log(error.response);
			});
	};
};

//POST
export const themKhoaHocAction = khoaHoc => {
	console.log("them khoa hoc action", khoaHoc);
	//Lay doi tuong file tu thuoc tinh hinh anh
	let file = khoaHoc.hinhAnh;
	khoaHoc.hinhAnh = file.name;
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/ThemKhoaHoc`,
			method: "POST",
			data: { ...khoaHoc, maNhom: settings.groupID},
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			}
		})
			.then(result => {
				console.log(result.data);
				//Sau khi them nguoi dung thanh cong
				//Goi api upload hinh anh
				let frm = new FormData();
				frm.append("file", file);
				frm.append("tenKhoaHoc", khoaHoc.tenKhoaHoc);
				axios({
					url: settings.domain + `/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`,
					method: "POST",
					data: frm
				})
					.then(res => {
						console.log(res);
						Swal.fire("Thêm Khóa Học Thành Công !", " ", "success");
					})
					.catch(error => {
						console.log(error.response.data);
					});
			})
			.catch(error => {
				console.log(error.response.data);
				Swal.fire("Vui lòng kiểm tra lại !", " ", "warning");
			});
	};
};

export const dangKyKhoaHocAction = thongTinDangKy => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/DangKyKhoaHoc`,
			method: "POST",
			data: thongTinDangKy,
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			}
		})
			.then(result => {
				console.log(result.data);
				Swal.fire("Đăng Ký Khóa Học Thành Công !", " ", "success");
			})
			.catch(error => {
				console.log(error.response.data);
				Swal.fire("Xin Hãy Kiểm Tra Lại !", error.response.data, "warning");
			});
	};
};

export const huyDangKyKhoaHocAction = thongTinDangKy => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/HuyGhiDanh`,
			method: "POST",
			data: thongTinDangKy,
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			}
		})
			.then(result => {
				console.log(result.data);
				Swal.fire("Hủy Ghi Danh Thành Công !", " ", "success");
			})
			.catch(error => {
				console.log(error.response.data);
				Swal.fire("Chưa Thể Hủy Ghi Danh !", " ", "warning");
			});
	};
};

export const ghiDanhKhoaHocAction = thongTinDangKy => {
	//Lay doi tuong file tu thuoc tinh hinh anh
	// Xac thuc ghi danh khoa hoc 13.1.4
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyKhoaHoc/GhiDanhKhoaHoc`,
			method: "POST",
			data: thongTinDangKy,
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			}
		})
			.then(result => {
				Swal.fire(" Ghi Danh Khóa Học Thành Công !", " ", "success");

				console.log(result.data);
			})
			.catch(error => {
				console.log(error.response.data);
				Swal.fire(" Chưa Thể Ghi Danh Khóa Học !", " ", "warning");
			});
	};
};

export const layDSNDChuaGhiDanhBangKhoaHocAction = maKhoaHoc => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`,
			method: "POST",
			data: { MaKhoaHoc: maKhoaHoc },
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			}
		})
			.then(result => {
				dispatch({
					type: actionTypes.LAYDSNDCHUAGHIDANHBANGKHOAHOC,
					mangDSNDChuaGhiDanhBangKhoaHoc: result.data
				});
			})
			.catch(error => {
				console.log(error.response.data);
			});
	};
};

export const layDSHVKhoaHocAction = maKhoaHoc => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
			method: "POST",
			data: { MaKhoaHoc: maKhoaHoc },
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			}
		})
			.then(result => {
				dispatch({
					type: actionTypes.LAYDSHVKHOAHOC,
					mangDSHVKhoaHoc: result.data
				});
			})
			.catch(error => {
				console.log(error.response.data);
			});
	};
};

export const layDSHVChoXetDuyetAction = maKhoaHoc => {
	return dispatch => {
		axios({
			url: settings.domain + `/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
			method: "POST",
			data: { MaKhoaHoc: maKhoaHoc },
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			}
		})
			.then(result => {
				console.log("ket qua cho xet duyet", result.data);
				dispatch({
					type: actionTypes.LAYDSHVCHOXETDUYET,
					mangDSHVChoXetDuyet: result.data
				});
			})
			.catch(error => {
				console.log(error.response.data);
			});
	};
};

//PUT
export const capNhatKhoaHocAction = khoaHoc => {
	console.log("cap nhat khoa hoc action", khoaHoc);

	let file = khoaHoc.hinhAnh;
	khoaHoc.hinhAnh = file.name;
	return dispatch => {
		axios({
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			},
			url: settings.domain + `/QuanLyKhoaHoc/CapNhatKhoaHoc`,
			method: "PUT",
			data: khoaHoc
		})
			.then(result => {
				console.log(result.data);
				// Sau khi them nguoi dung thanh cong
				// Goi api upload hinh anh
				let frm = new FormData();
				frm.append("file", file);
				frm.append("tenKhoaHoc", khoaHoc.tenKhoaHoc);
				axios({
					url: settings.domain + `/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`,
					method: "post",
					data: frm
				})
					.then(res => {
						console.log(res);
						Swal.fire(" Cập Nhật Khóa Học Thành Công !", " ", "success");
						dispatch(layDanhSachKhoaHocAction());
						window.location.reload();
					})
					.catch(error => {
						console.log(error.response.data);
					});
			})
			.catch(error => {
				console.log(error.response);
				Swal.fire(" Xin Hãy Kiểm Tra Lại !", " ", "warning");
			});
	};
};
//DELETE

export const xoaKhoaHocAction = maKhoaHoc => {
	return dispatch => {
		axios({
			headers: {
				Authorization: "Bearer " + localStorage.getItem(settings.token)
			},
			url: settings.domain + `/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
			method: `DELETE`
		})
			.then(result => {
				console.log(result.data);
				dispatch(layDanhSachKhoaHocAction());
				Swal.fire(" Xóa Khóa Học Thành Công !", " ", "success");
			})
			.catch(error => {
				console.log(error.response.data);
				Swal.fire(" Xin Hãy Kiểm Tra Lại !", " ", "success");
			});
	};
};

export const loadMangKhoaHocAction = mangKhoaHoc => ({
	type: "LOAD_MANG_KHOA_HOC",
	mangKhoaHoc
});

export const chinhSuaKhoaHocAction = khoaHocSua => ({
	type: "CHINH_SUA_KHOA_HOC",
	khoaHocSua
});

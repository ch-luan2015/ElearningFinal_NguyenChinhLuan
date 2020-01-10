import { actionTypes } from "../constants/QuanLyKhoaHocConstant";
const initialState = {
	mangDanhMucKhoaHoc: [],
	mangTimKiemKhoaHoc: [],
	mangKhoaHoc: [],
	mangKhoaHocTheoDanhMuc:[],
	mangDSNDChuaGhiDanhBangKhoaHoc:[],
	mangDSHVKhoaHoc:[],
	mangDSHVChoXetDuyet:[],
	
	mangXoaKhoaHoc: [],
	mangDangKyKhoaHoc:{},
	mangGhiDanhKhoaHoc:{},
	thongTinKhoaHoc: {},
	themKhoaHoc: {},
	khoaHocSua: {
		maKhoaHoc: "",
		biDanh: "",
		tenKhoaHoc: "",
		moTa: "",
		luotXem: "",
		hinhAnh: "",
		maNhom: "",
		ngayTao: "",
		soLuongHocVien: "",
		nguoiTao: {
				taiKhoan: "",
				hoTen: "",
				maLoaiNguoiDung: "",
				tenLoaiNguoiDung: ""
		},
		danhMucKhoaHoc: {
				maDanhMucKhoahoc: "",
				tenDanhMucKhoaHoc: ""
		}
	}
}
export const QuanLyKhoaHocReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LAY_DANH_MUC_KHOA_HOC: {
			state.mangDanhMucKhoaHoc = action.mangDanhMucKhoaHoc;
			return { ...state };
		}
		case actionTypes.LAY_KHOA_HOC_THEO_DANH_MUC: {
			state.mangKhoaHocTheoDanhMuc = action.mangKhoaHocTheoDanhMuc;
			return { ...state };
		}
		case actionTypes.TIM_KIEM_KHOA_HOC: {
			state.mangTimKiemKhoaHoc = action.mangTimKiemKhoaHoc;
			return { ...state };
		}
		case actionTypes.LAY_DANH_SACH_KHOA_HOC: {
			state.mangKhoaHoc = action.mangKhoaHoc;
			return { ...state };
		}
		case actionTypes.LAY_CHI_TIET_KHOA_HOC: {
			state.thongTinKhoaHoc = action.thongTinKhoaHoc;
			return { ...state };
		}

		case actionTypes.THEM_KHOA_HOC: {
			state.themKhoaHoc = action.themKhoaHoc;
			return { ...state };
		}

		case actionTypes.LOAD_MANG_KHOA_HOC: {
			state.mangKhoaHoc = action.mangKhoaHoc;
			return { ...state };
		}
		case actionTypes.XOA_KHOA_HOC: {
			let mangXoaKhoaHoc = [...state.mangKhoaHoc];
			let index = mangXoaKhoaHoc.findIndex(khoaHoc => khoaHoc.maKhoaHoc === action.maKhoaHoc);
			if (index !== -1) {
				mangXoaKhoaHoc.splice(index, 1);
			}
			state.mangKhoaHoc = mangXoaKhoaHoc;
			return { ...state };
		}
		case actionTypes.CHINH_SUA_KHOA_HOC: {
			state.khoaHocSua = action.khoaHocSua;
			return { ...state };
		}
		case actionTypes.CAP_NHAT_KHOA_HOC: {
			let mangCapNhatKhoaHoc = [...state.mangKhoaHoc];
			let index = mangCapNhatKhoaHoc.findIndex(khoaHoc => khoaHoc.maKhoaHoc === action.khoaHoc.maKhoaHoc);
			if (index !== -1) {
				mangCapNhatKhoaHoc[index] = action.khoaHoc;
			}
			state.mangKhoaHoc = mangCapNhatKhoaHoc;
			return { ...state };
		}

		case actionTypes.GHI_DANH_KHOA_HOC:{
			state.mangGhiDanhKhoaHoc=action.mangGhiDanhKhoaHoc;
			return { ...state };
		}

		case actionTypes.DANG_KY_KHOA_HOC:{
			state.mangDangKyKhoaHoc=action.mangDangKyKhoaHoc;
			return { ...state };
		}

		case actionTypes.HUY_GHI_DANH:{

			return { ...state };
		}

		case actionTypes.LAYDSNDCHUAGHIDANHBANGKHOAHOC:{
			state.mangDSNDChuaGhiDanhBangKhoaHoc=action.mangDSNDChuaGhiDanhBangKhoaHoc;
			return { ...state };
		}

		case actionTypes.LAYDSHVKHOAHOC:{
			state.mangDSHVKhoaHoc=action.mangDSHVKhoaHoc;
			return { ...state };
		}

		case actionTypes.LAYDSHVCHOXETDUYET:{
			state.mangDSHVChoXetDuyet=action.mangDSHVChoXetDuyet;
			return { ...state };
		}

		default:
			return state;
	}
};

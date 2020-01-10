import { actionType } from '../constants/QuanLyNguoiDungConstant';
const initialState = {
    mangNguoiDung: [],
    mangLoaiNguoiDung: [],
    mangTimKiemNguoiDung: [],
    nguoiDungSua: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maLoaiNguoiDung: "",
        maNhom: "",
        email: ""
    },
    nguoiDung:{},
    thongTinTaiKhoan:{},
    mangDSKHChoXetDuyet:[],
    mangDSKHDaGhiDanh:[],
    mangDSKHChuaGhiDanh:[],
    nguoiDungDangNhap:{}
    

}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LAY_DANH_SACH_NGUOI_DUNG:
            {
                state.mangNguoiDung = action.mangNguoiDung;
                return { ...state }
            }

        case actionType.LAY_DANH_SACH_LOAI_NGUOI_DUNG:
            {
                state.mangLoaiNguoiDung = action.mangLoaiNguoiDung;
                return { ...state }
            }
        case actionType.THONG_TIN_TAI_KHOAN:
            {
                return { ...state, thongTinTaiKhoan:action.thongTinTaiKhoan }
            }

        case actionType.TIM_KIEM_NGUOI_DUNG: 
        {
            state.mangTimKiemNguoiDung = action.mangTimKiemNguoiDung;
            return { ...state }
        }

        case actionType.DANG_KY: {

            return { ...state }
        }

        case actionType.THEM_NGUOI_DUNG: {
            return { ...state }
        }

        case actionType.LOAD_MANG_NGUOI_DUNG: {
            state.mangNguoiDung = action.mangNguoiDung;
            return { ...state };
        }

        case actionType.XOA_NGUOI_DUNG: {
            let mangXoaNguoiDung = [...state.mangNguoiDung];
            let index = mangXoaNguoiDung.findIndex(nguoiDung => nguoiDung.taiKhoan === action.taiKhoan);
            if (index !== -1) {
                mangXoaNguoiDung.splice(index, 1)
            }
            state.mangNguoiDung = mangXoaNguoiDung;
            return { ...state }
        }
        case actionType.CHINH_SUA_NGUOI_DUNG: {
            state.nguoiDungSua = action.nguoiDungSua;
            return { ...state };
        }

        case actionType.FETCH_USER_LOGIN: {
            state.nguoiDung = action.payload;  
            return { ...state };
        }

        case actionType.CAP_NHAT_THONG_TIN_NGUOI_DUNG: {
            let mangCapNhatNguoiDung = [...state.mangNguoiDung];
            let index = mangCapNhatNguoiDung.findIndex(nguoiDung => nguoiDung.taiKhoan === action.nguoiDung.taiKhoan);
            if (index !== -1) {
                mangCapNhatNguoiDung[index] = action.nguoiDung;
            }
            state.mangNguoiDung = mangCapNhatNguoiDung;
            return { ...state }
        }

        case actionType.LAYDSKHCHOXETDUYETCUANGUOIDUNG: {
            state.mangDSKHChoXetDuyet = action.mangDSKHChoXetDuyet;  
            return { ...state };
        }
        case actionType.LAYDSKHDAGHIDANHCUANGUOIDUNG: {
            state.mangDSKHDaGhiDanh = action.mangDSKHDaGhiDanh;  
            return { ...state };
        }

        case actionType.LAYDSKHCHUAGHIDANHCUANGUOIDUNG: {
            state.mangDSKHChuaGhiDanh = action.mangDSKHChuaGhiDanh;  
            return { ...state };
        }
        case actionType.LUU_THONG_TIN_DANG_NHAP: {
            state.nguoiDungDangNhap = action.nguoiDungDangNhap;  
            return { ...state };
        }
        default: return { ...state }
        
    }
    
}

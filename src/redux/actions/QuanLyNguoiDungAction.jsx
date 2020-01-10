import { actionType } from '../constants/QuanLyNguoiDungConstant';
import { settings } from '../../common/Config/settings';
import axios from 'axios';
import swal from 'sweetalert2';



//GET x3 danh sach, danh sach loai nguoi dung, tim kiem
export const layDanhSachNguoiDungAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${settings.groupID}`,
            method: 'GET',
        }).then(result => {
            //Sau khi lấy dữ liệu người dùng về từ api => đưa dữ liệu lên reducer
            dispatch({
                type: actionType.LAY_DANH_SACH_NGUOI_DUNG,
                mangNguoiDung: result.data
            }, localStorage.setItem('mangNguoiDung', JSON.stringify(result.data)))

        }).catch(error => {
            console.log(error.response);
        })
    }
}




export const layDanhSachLoaiNguoiDungAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
            method: 'GET',
        }).then(result => {
            //Sau khi lấy dữ liệu người dùng về từ api => đưa dữ liệu lên reducer
            dispatch({
                type: actionType.LAY_DANH_SACH_LOAI_NGUOI_DUNG,
                mangLoaiNguoiDung: result.data
                // .filter(nd => nd.maLoaiNguoiDung === 'HV')
            })

        }).catch(error => {
            console.log(error.response.data);
        })
    }
}

export const timKiemNguoiDungAction = (tenNguoiDung) => {
    console.log('timkiem action',tenNguoiDung)
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP07&tuKhoa=${tenNguoiDung}`,
            method: 'GET',
        }).then(result => {
            //Sau khi lấy dữ liệu người dùng về từ api => đưa dữ liệu lên reducer
            dispatch({
                type: actionType.TIM_KIEM_NGUOI_DUNG,
                mangTimKiemNguoiDung: result.data
            })
        }).catch(error => {
            console.log(error.response.data);
        })
    }
}



//POST :dn ,dk, thong tin tai khoan, them nguoi dung
export const dangNhapAction = (thongTinNguoiDung, callBack,) => {
    console.log(thongTinNguoiDung)
    return dispatch => {
        axios({
            url: `http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap`,
            method: 'POST',
            data: thongTinNguoiDung
            
        }).then(result => {
            localStorage.setItem(settings.userLogin, JSON.stringify(result.data));
            localStorage.setItem(settings.token, result.data.accessToken);
            swal.fire('Chào', thongTinNguoiDung.taiKhoan, 'success');
            callBack();
            dispatch({
                type: actionType.LUU_THONG_TIN_DANG_NHAP,
                nguoiDungDangNhap: result.data
            })

            
        }).catch(error => {
            swal.fire('Thông báo đăng nhập', error.response, 'error');
        })
    }
}
export const actFetchLoginUser = user => ({
    type: actionType.FETCH_USER_LOGIN,
    payload: user
  });

export const dangKyAction = (thongTinHocVien) => {
    console.log(thongTinHocVien)
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/DangKy`,
            method: 'POST',
            data: { ...thongTinHocVien, maNhom: 'GP07' }
        }).then(result => {
            console.log(result.data)
            swal.fire('Đăng Ký Thành Công !',result.status, 'success');

        }).catch(error => {
            console.log(error.response);
            swal.fire('Vui Lòng Kiểm Tra Lại!',error.status, 'success');
        })
    }
}

export const themNguoiDungAction = (thongTinNguoiDung) => {
    return dispatch => {
        axios({
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            },
            url: settings.domain+`/QuanLyNguoiDung/ThemNguoiDung`,
            method: 'POST',
            data: { ...thongTinNguoiDung, maNhom: 'GP07' }
            
        }).then(result => {
            console.log(result.data);
            swal.fire('Thêm Người Dùng Thành Công !',result.status, 'success');
        }).catch(error => {
            console.log(error.response);
            swal.fire('Xin Hãy Kiểm Tra Lại !',error.response, 'error');
        })
    }
}

export const thongTinTaiKhoanAction = (TTTK) => {
    return dispatch => {
        axios({
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            },
            url: settings.domain+`/QuanLyNguoiDung/ThongTinTaiKhoan`,
            method: 'POST',
            data: TTTK,
        }).then(result => {
            dispatch({
                type: actionType.THONG_TIN_TAI_KHOAN,
                thongTinTaiKhoan: result.data
            })

        }).catch(error => {
           console.log(error.response)
        })
    }
}


export const layDSKHChoXetDuyetCuaNguoiDungAction = (TTTK) => {
    return dispatch => {
        axios({
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            },
            url: settings.domain+`/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
            method: 'POST',
            data: {taiKhoan:TTTK},
            
        }).then(result => {
            dispatch({
                type: actionType.LAYDSKHCHOXETDUYETCUANGUOIDUNG,
                mangDSKHChoXetDuyet:result.data,
            })
        }).catch(error => {
            console.log(error.response);
            // swal.fire('Xin Hãy Kiểm Tra Lại !',error.response, 'error');
        })
    }
}

export const layDSKHDaGhiDanhCuaNguoiDungAction = (TTTK) => {
    return dispatch => {
        axios({
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            },
            url: settings.domain+`/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
            method: 'POST',
            data: {taiKhoan:TTTK},
            
        }).then(result => {
            dispatch({
                type: actionType.LAYDSKHDAGHIDANHCUANGUOIDUNG,
                mangDSKHDaGhiDanh:result.data,
            })
        }).catch(error => {
            console.log(error.response);
            // swal.fire('Xin Hãy Kiểm Tra Lại !',error.response, 'error');
        })
    }
}


export const layDSKHChuaGhiDanhAction = (TTTK) => {
    console.log('layDSKHChuaGhiDanhAction',layDSKHChuaGhiDanhAction)
    return dispatch => {
        axios({
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            },
            url: settings.domain+`/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh`,
            method: 'POST',
            data: {taiKhoan:TTTK},
            
        }).then(result => {

            dispatch({
                type: actionType.LAYDSKHCHUAGHIDANHCUANGUOIDUNG,
                mangDSKHChuaGhiDanh:result.data,
            })
        }).catch(error => {
            console.log(error.response);
            // swal.fire('Xin Hãy Kiểm Tra Lại !',error.response, 'error');
        })
    }
}

//DELETE

export const xoaNguoiDungAction = (taiKhoan) => {
    return dispatch => {
        axios({
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            },
            url: settings.domain + `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
            method: `DELETE`,
            data: taiKhoan
        }).then(result => {
            dispatch(layDanhSachNguoiDungAction())
            console.log(result.data)
            swal.fire('',result.response.data, 'success');
        }).catch(error => {
            console.log(error.response);
            swal.fire('',error.response.data, 'error');
        })
    }
}


//PUT

export const capNhatNguoiDungAction = (thongTinNguoiDung) => {
    console.log('thong tin nguoi dung cap nhat: ',thongTinNguoiDung)
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method: 'PUT',
            data: thongTinNguoiDung,

            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            },
           
        }).then(result => {
                swal.fire('Cập Nhật Thành Công !',result.status, 'success')
                .then(result => {
                    window.location.reload()
                });
                }).catch(errors => {
                swal.fire('Lỗi Cập Nhật !',errors.data, 'danger')
            })
        }
}



export const loadMangNguoiDungAction = (mangNguoiDung) => ({
    type: 'LOAD_MANG_NGUOI_DUNG',
    mangNguoiDung
});

export const chinhSuaNguoiDungAction = (nguoiDungSua) => ({
    type: 'CHINH_SUA_NGUOI_DUNG',
    nguoiDungSua
});

export const nguoiDangNhapAction = () => ({
    type: 'NGUOI_DANG_NHAP',
})
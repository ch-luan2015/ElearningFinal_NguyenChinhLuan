import {settings} from '../../common/Config/settings';

export const logout = () => {
    localStorage.removeItem(settings.token);
    localStorage.removeItem(settings.userLogin);
}
export const isLogin = () => {
    const userLogin=JSON.parse(localStorage.getItem(settings.userLogin));
    if(userLogin === null){
        return false;
    }else if(userLogin.maLoaiNguoiDung === "GV" || userLogin.maLoaiNguoiDung === "HV"){
        return true
    }
    return false;
}

export const isLoginAdmin = () => {
    const userLogin=JSON.parse(localStorage.getItem(settings.userLogin));
    if(userLogin === null){
        return false;
    }else if(userLogin.maLoaiNguoiDung === "GV"){
        return true
    }
    return false

 
}
export const isLoginUser = () => {
    const userLogin=JSON.parse(localStorage.getItem(settings.userLogin));
    if(userLogin === null){
        return false;
    }else if(userLogin.maLoaiNguoiDung === "HV"){
        return true
    }
    return false
    
}


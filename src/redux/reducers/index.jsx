import {combineReducers} from 'redux';
import {QuanLyKhoaHocReducer} from './QuanLyKhoaHocReducer';
import {QuanLyNguoiDungReducer} from './QuanLyNguoiDungReducer';
export const rootReducer = combineReducers({
  //Chứa reducer theo từng nghiệp vụ
  QuanLyKhoaHocReducer,
  QuanLyNguoiDungReducer
});

import React, { Fragment } from "react";
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate"; //com AdminTemplate (không đổi tên được vì export)
import {UserTemplate} from "./templates/UserTemplate/UserTemplate"
import HomePage from "./pages/HomePage/HomePage";
import AddCourse from "./pages/Admin/AddCourse/AddCourse";
import CourseDetail from "./pages/CourseDetail/CourseDetail";
import WrappedLoginForm  from "./pages/Login/Login";
import WrappedRegistrationForm from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from './pages/NotFound/NotFoundPage';
import AdminIndex from "./pages/Admin/AdminIndex"; //admin của page (export default)
import WrappedUpdateForm from './pages/UserPageUpdate/UserPageUpdate'
import UserInformation from './templates/UserTemplate/UserInformation'
import ListCourse from "./Components/ListCourse/ListCourse";
import ListUser from "./Components/ListUser/ListUser";
import UserIndex from "./templates/UserTemplate/UserIndex";
import CourseList  from "./Components/CourseList/CourseList";
import AddUser  from "./pages/Admin/AddUser/AddUser";
import '../src/styles.css'
import { createBrowserHistory as createHistory } from 'history'

const history = createHistory()
function App() {
	return (
		<Fragment>
			<BrowserRouter history={history}>

				<Switch>
					{/* TrangHome All */}
					<HomeTemplate exact path="/" Component={HomePage} />
					<HomeTemplate exact path="/courselist/" Component={CourseList} />
					<HomeTemplate exact path="/coursedetail/:maKhoaHoc" Component={CourseDetail} />


					{/* TrangHome Admin :  */}
					<AdminTemplate exact path="/admin" Component={AdminIndex} />
					<AdminTemplate exact path="/admin/listuser" Component={ListUser} />
					<AdminTemplate exact path="/admin/adduser" Component={AddUser} />
					<AdminTemplate exact path="/admin/addcourse" Component={AddCourse} />
					<AdminTemplate exact path="/admin/listcourse" Component={ListCourse} />


					{/* TrangHome User :  */}
					<UserTemplate exact path="/user" Component={UserIndex}/>
					<UserTemplate exact path='/user/profile' Component={UserInformation} />
					<UserTemplate exact path='/user/update' Component={WrappedUpdateForm} />
					<UserTemplate exact path='/user/courselist' Component={CourseList} />
					<UserTemplate exact path="/user/coursedetail/:maKhoaHoc" Component={CourseDetail}/>
					
					{/*Sử dụng route để không kế thừa từ template home hoặc tự định nghĩa ra template riêng cho login */}
					<Route path="/login" exact component={WrappedLoginForm} />
					<Route path="/registerpage" exact component={WrappedRegistrationForm} />
					<Route path="*" component={NotFoundPage} />


				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;

import React, { Component } from "react";
import { connect } from "react-redux";
import { layChiTietKhoaHocAction, dangKyKhoaHocAction, huyDangKyKhoaHocAction } from "../../redux/actions/QuanLyKhoaHocAction";
import Swal from "sweetalert2";
import { Comment, Avatar, Row, Col, Tabs, Button,Card,List  } from "antd";
import { settings } from "../../common/Config/settings";
import styles from './CourseDetail.module.css'



const { TabPane } = Tabs;
const { Meta } = Card;
const ExampleComment = ({ children }) => (
	<Comment
		actions={[<span key="comment-nested-reply-to">Reply to</span>]}
		author={<h6 >Tim Cookie</h6>}
		avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
		content={<p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>}>
		{children}
	</Comment>
);

class CourseDetail extends Component {

	componentDidMount() {
		//lấy giá trị tham số từ url this.props.match.params.tenThamSo
		let { maKhoaHoc } = this.props.match.params;
		this.props.layChiTietKhoaHoc(maKhoaHoc);
	}

	handleOnSubmit = e => {
		e.preventDefault();

		//Dang ky khoa hoc
		if (localStorage.getItem(settings.token)) {
			let TTDK = {
				maKhoaHoc: this.props.match.params.maKhoaHoc,
				taiKhoan: JSON.parse(localStorage.getItem(settings.userLogin)).taiKhoan
			};
			this.props.dangKyKhoaHoc(TTDK);
		} else {
			Swal.fire({
				icon: "error",
				title: "Bạn phải là học viên",
				text: " Vui lòng đăng ký!"
			});
		}
	};

	handleDelete = e => {
		e.preventDefault();
		if (localStorage.getItem(settings.token)) {
			let TTDK = {
				maKhoaHoc: this.props.match.params.maKhoaHoc,
				taiKhoan: JSON.parse(localStorage.getItem(settings.userLogin)).taiKhoan
			};
			this.props.huyDangKyKhoaHoc(TTDK);
		} else {
			Swal.fire({
				icon: "error",
				title: "Bạn phải là học viên !",
				text: " Vui lòng đăng ký."
			});
		}
	};

	render() {
		let { thongTinKhoaHoc } = this.props;
		
		const data = [
			{
			  title: 'Title 1',
			  src:require('../../assets/images/imgKhoaHoc/1.jpg')
			  
			},
			{
			  title: 'Title 2',
			  src:require('../../assets/images/imgKhoaHoc/2.jpg')
			},
			{
			  title: 'Title 3',
			  src:require('../../assets/images/imgKhoaHoc/3.jpg')
			},
			{
				title: 'Title 1',
				src:require('../../assets/images/imgKhoaHoc/4.jpg')
				
			  },
			  {
				title: 'Title 3',
				src:require('../../assets/images/imgKhoaHoc/5.jpg')
			  },
			  {
				title: 'Title 4',
				src:require('../../assets/images/imgKhoaHoc/avatar_5.jpg')
			  },
			];
			

			
		return (
			(this.props.thongTinKhoaHoc===null)?
			"Loading":
			<div className={styles.course_details}>
					<Row className={styles.title}>
						<Col span={15} >
							<Tabs defaultActiveKey="2">
								<TabPane tab="Nội dung khóa học" key="1">
									{thongTinKhoaHoc.moTa}
								</TabPane>
								
								<TabPane tab="Hình ảnh khóa học" key="2">
								<List
									grid={{ gutter: 16, column: 3 }}
									dataSource={data}
									renderItem={item => (
									<List.Item>
										<Card bordered hoverable>
										<img alt="hinh anh khoa hoc" src={item.src} style={{ width:210, height:200 }}/>
										</Card>
									</List.Item>
									)}
								/>
								</TabPane>
								<TabPane tab="Cảm nhận học viên" key="3">
									<ExampleComment>
										<ExampleComment>
											<ExampleComment />
											<ExampleComment />
										</ExampleComment>
									</ExampleComment>
								</TabPane>
							</Tabs>
						</Col>


						<Col span={9}>
							
							<Card bordered hoverable
								style={{ width: 360,height: 500 ,margin:60 }}
								cover={
								<img alt="example" src={thongTinKhoaHoc.hinhAnh} style={{ width: 350, height:235 }}/>
								}
								actions={[
								<Button type="primary" icon="check" onClick={this.handleOnSubmit}>Đăng ký</Button>,
								<Button type="danger" icon="delete" onClick={this.handleDelete}>Hủy đăng ký</Button>,
								
								]}>
								<Meta title="Mã Khóa Học" description={thongTinKhoaHoc.maKhoaHoc} />
								<Meta title="Tên Khóa Học" description={thongTinKhoaHoc.tenKhoaHoc}/>
								<Meta title="Lượt Xem" description={thongTinKhoaHoc.luotXem} />
								<Meta title="Ngày Tạo" description={thongTinKhoaHoc.ngayTao} />
								
							</Card>
					
						</Col>
					</Row>
				</div>
		
		);
	}
}

const mapState = state => ({
	thongTinKhoaHoc: state.QuanLyKhoaHocReducer.thongTinKhoaHoc
});
const mapDispatch = dispatch => ({
	layChiTietKhoaHoc: maKhoaHoc => {
		dispatch(layChiTietKhoaHocAction(maKhoaHoc));
	},
	dangKyKhoaHoc: TTDK => {
		dispatch(dangKyKhoaHocAction(TTDK));
		console.log("TTDK", TTDK);
	},
	huyDangKyKhoaHoc: TTDK => {
		dispatch(huyDangKyKhoaHocAction(TTDK));
		console.log("huy TTDK", TTDK);
	}
});

export default connect(
	mapState,
	mapDispatch
)(CourseDetail);

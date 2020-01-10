import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PageHeader, Tag, List, Card, Icon, Input, Rate, Button, Row, Col } from "antd";
import { timKiemKhoaHocAction, layDanhSachKhoaHocAction, dangKyKhoaHocAction } from "../../redux/actions/QuanLyKhoaHocAction";
import styles from "./CourseList.module.css";
import {isLogin} from '../../templates/CheckAndRouter/isLogin'
const { Meta } = Card;

export class CourseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputSearch: "",
		};
	}
	componentDidMount() {
		//Gọi action lấy danh mục khoá học
		this.props.layDanhSachKhoaHoc();
		this.props.timKiemKhoaHoc();
	}

	handleSubmit = e => {
		e.preventDefault(); //chặn submit của browser
		this.props.timKiemKhoaHoc(this.state.inputSearch); // đưa dữ liệu lên action
	};

	handleChange = e => {
		let { value, name } = e.target;

		this.setState({ [name]: value }, () => {
			if (this.state.inputSearch !== "") {
				this.props.timKiemKhoaHoc(this.state.inputSearch);
			} else {
				this.props.layDanhSachKhoaHoc();
			}
		});
	};

	
	chooseData=(data1,data2,data3)=>{
		if(data3.length!==0){
			return data3;
		}else if(data2.length!==0){
			return data2;
		} else return data1;
	}
	

	render() {
		let data1 = this.props.mangKhoaHoc;
	
		let data2 = this.props.mangTimKiemKhoaHoc;

		let data3= this.props.mangKhoaHocTheoDanhMuc;

		
	

		return (
			<div onSubmit={this.handleSubmit} >
				<Row className={styles.title} >
					<Col span={15}>
						<PageHeader
							style={{
								border: "1px solid rgb(235, 237, 240)"
							}}
							tags={<Tag color="blue">Learning</Tag>}
							title="Danh Sách Khóa Học"
						 />
					</Col>

					<Col span={9}  className={styles.searchBox}>
						<Input
							suffix={<Icon type="book" theme="twoTone" twoToneColor="#1990FF" style={{ fontSize: "18px" ,}} />}
							style={{ width: 500 }}
							onChange={this.handleChange}
							name="inputSearch"
							size="large"
							type="search"
							placeholder="Nhập tên khoá học"
							defaultValue={this.state.inputSearch}
						/>
					</Col>
				</Row>

				<List className={styles.courselist}
					onSubmit={this.handleSubmit}
					grid={{ gutter: 16, column: 4 }}
					dataSource={this.chooseData(data1,data2,data3)}
					renderItem={item => (
						<List.Item>
							<Card hoverable
								style={{ width: 280, margin: 10 }}
								cover={<img alt="hinhAnh" src={item.hinhAnh} width={240} height={200} padding={10} />}
								actions={[
									<Rate disabled defaultValue={4} />,
									(isLogin()===true)?
									<Link to={`/user/coursedetail/${item.maKhoaHoc}`}>
										<Button type="primary">Chi Tiết >></Button>
									</Link>:
									<Link to={`/coursedetail/${item.maKhoaHoc}`}>
										<Button type="primary">Chi Tiết >></Button>
									</Link>
								]}>
								<Meta
									avatar={<Icon type="sketch" style={{ fontSize: "20px" }} />}
									title={item.tenKhoaHoc}
									description={item.soLuongHocVien}
								/>
							</Card>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
		mangKhoaHocTheoDanhMuc: state.QuanLyKhoaHocReducer.mangKhoaHocTheoDanhMuc,
		mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
		mangTimKiemKhoaHoc: state.QuanLyKhoaHocReducer.mangTimKiemKhoaHoc,
		thongTinKhoaHoc: state.QuanLyKhoaHocReducer.thongTinKhoaHoc
	};
};

const mapDispatchToProps = dispatch => {
	return {
		layDanhSachKhoaHoc: () => {
			dispatch(layDanhSachKhoaHocAction());
		},
		timKiemKhoaHoc: tenKhoaHoc => {
			dispatch(timKiemKhoaHocAction(tenKhoaHoc));
		},
		dangKyKhoaHoc: TTDK => {
			dispatch(dangKyKhoaHocAction(TTDK));
			console.log("ttdk courselist", TTDK);
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseList);


import React, { Component } from 'react'
import CarouselHome from '../../Components/Carousel/CarouselHome';
import { Tabs,  Row, Col,BackTop ,  Avatar, Card, List } from 'antd';
import NavBar from '../../Components/NavBar/NavBar'

const { TabPane } = Tabs;



export default class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			current: 'mail',
		}
	}

	handleClick = e => {
		console.log('click ', e);
		this.setState({
			current: e.key,
		});
	};

	callback = (key) => {
		console.log(key);
	}
	render() {
		const data1 = [
			{
				title: 'Title 1',
				src: require('../../assets/images/imgKhoaHoc/1.jpg')

			},
			{
				title: 'Title 2',
				src: require('../../assets/images/imgKhoaHoc/2.jpg')
			},
			{
				title: 'Title 3',
				src: require('../../assets/images/imgKhoaHoc/3.jpg')
			},
			{
				title: 'Title 1',
				src: require('../../assets/images/imgKhoaHoc/4.jpg')

			},
			{
				title: 'Title 3',
				src: require('../../assets/images/imgKhoaHoc/5.jpg')
			},
			{
				title: 'Title 4',
				src: require('../../assets/images/imgKhoaHoc/avatar_5.jpg')
			},
		];

		const dataCamNhanHocVien = [
			{
				title: 'Title 1',
				src: require('../../assets/images/camNhan/28.jpg')

			},
			{
				title: 'Title 2',
				src: require('../../assets/images/camNhan/29.jpg')
			},
			{
				title: 'Title 3',
				src: require('../../assets/images/camNhan/30.jpg')
			},
			{
				title: 'Title 1',
				src: require('../../assets/images/camNhan/31.jpg')

			},
			{
				title: 'Title 3',
				src: require('../../assets/images/camNhan/32.jpg')
			},
			{
				title: 'Title 4',
				src: require('../../assets/images/camNhan/33.jpg')
			},
			{
				title: 'Title 1',
				src: require('../../assets/images/camNhan/34.jpg')

			},
			{
				title: 'Title 3',
				src: require('../../assets/images/camNhan/35.jpg')
			},
			{
				title: 'Title 4',
				src: require('../../assets/images/camNhan/37.jpg')
			},
		];

		return (
			<div className="homepage">
				<div className="clearfix"></div>
				<NavBar/>
				<div className="clearfix"></div>

				<CarouselHome />
				<div className="clearfix"></div>

				<section className="tabHocVien" id="tabHocVien">
					<Tabs className="tab" defaultActiveKey="1" onChange={() => this.callback()} >
						<TabPane className="tabPane" tab="E.Learning là ai?" key="1" >
							<Row type="flex" justify="space-around" align="middle">
								<Col span={10}>
									<h3>Chúng tôi tin vào tiềm năng của con người</h3>
									<p>E.Learning được thành lập dựa trên niềm tin rằng bất cứ ai cũng có thể học lập trình.</p>
									<p>Bất kể ai cũng có thể là một lập trình, tham gia trong đội ngữ Tech, bất kể tuổi tác, nền tảng, giới tính hoặc tình trạng tài chính. Chúng tôi không bỏ qua những người mới bắt đầu hoặc chưa có kinh nghiệm theo đuổi đam mê lập trình. Thay vào đó, chúng tôi chào đón học viên của tất cả các cấp độ kinh nghiệm.</p>
								</Col>
								<Col span={14}>
									<iframe title="hoc vien" width="800" height="450" src="https://www.youtube.com/embed/kcSEsljlges" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
								</Col>
							</Row>

						</TabPane>
						<TabPane tab="Học Tập tại E.Learning" key="2" className="tabPane2">
							<Row>
								<Col span={10}>
									<div className="tabPane2_avatar">
									<Avatar src={require('../../assets/images/logo/le-quang-song-avatar-min-60x60_c.jpg')} /><span>Thầy Lê Quang Song-15 năm kinh nghiệm Code, Quản lý, Đào tạo & Khởi nghiệp</span>
									<p>Bạn có thể dành nhiều tháng thậm chí cả năm để cố gắng tự học những thứ này và không có định hướng hoặc bạn có thể đến đây và lấy nó ngay.</p>
									</div>
								</Col>
								<Col span={14}>
									<iframe title="hoc vien" width="800" height="450" src="https://www.youtube.com/embed/686mNAJVXzA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
								</Col>
							</Row>
						</TabPane>
						<TabPane tab="Cựu học viên" key="3" className="tabPane">
							<List
								grid={{ gutter:12, column: 3 }}
								dataSource={data1}
								renderItem={item => (
									<List.Item  className="card" >
										<Card bordered hoverables style={{ padding:0 }} className="list">
											<img alt="cuu hoc vien" src={item.src} style={{ width: 400, height: 300  }}/>
										</Card>
									</List.Item>
								)}
							/>
						</TabPane>
					</Tabs>
				</section>
				<div className="clearfix"></div>


				<section className="company">
					<h3>CÁC CÔNG TY CỰU HỌC VIÊN E.LEARNING ĐANG LÀM VIỆC</h3>
					<h4>100% học viên sau khi hoàn thành dự án đều có công việc như mong đợi tại các tập đoàn phần mềm, 
						các công ty phần mềm đa quốc gia, các công ty khởi nghiệp....với thu nhập từ 90~140 triệu/1 năm.</h4>
					<img src={require('../../assets/images/imgKhoaHoc/cuuthanhvien.png')} alt="Lê Quang Song" />
				</section>
				<div className="clearfix"></div>

				<section className="reviewHocVien">
					<h3>HỌC VIÊN ĐÃ NÓI GÌ VỀ E.LEARNING ?</h3>
					<List
						grid={{ gutter: 16, column: 3 }}
						dataSource={dataCamNhanHocVien}
						renderItem={item => (
							<List.Item>
								<Card bordered hoverable>
									<img alt="hoc vien" src={item.src} style={{ width: 400, height: 600 }} />
								</Card>
							</List.Item>
						)}
					/>
				</section>
				<section className="academy">
					<h3> “E.Learning Academy là học viện tiên phong tại Việt Nam áp dụng phương pháp đào tạo Active Learning và Flipped Learning thông qua các dự án thực tiễn trong lĩnh vực đào tạo CNTT.
						 Học viên sẽ đóng vai trò là một Scrum member trong mô hình Agile để trở thành một lập trình chuyên nghiệp, đáp ứng mọi nhu cầu tuyển dụng của Doanh nghiệp.”</h3>
					<h4> – E.Learning CEO</h4>
				</section>
				<div>
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
				</div>
			</div>
		)
	}
}




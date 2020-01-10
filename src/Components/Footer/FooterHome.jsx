import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {  Icon, Row, Col, Form, Input,  Button, List, } from "antd";


// import styles from './FooterHome.module.css'
// const { Option } = Select;
const { Search } = Input;
const lienHe = [
	"Cơ sở 1: 376 Võ Văn Tần – Quận 3",
	"Cơ sở 2: 459 Sư Vạn Hạnh – Quận 10",
	"Cơ sở 3: 82 Ung Văn Khiêm – Bình Thạnh",
	"Cơ sở 4: Đà Nẵng – Quận Hải Châu",
	"Điện Thoại : 096.105.1014 – 098.407.5835"
];

export default class FooterHome extends Component {
	render() {
		return (
			
                <div className="footer" id="lienHe">
				<Row className="footer_top">
					<Col span={12} className="event">
						<div>
							<h3>NHẬN TIN SỰ KIỆN & KHUYẾN MÃI</h3>
							<p>
								CyberSoft sẽ gởi các khóa học trực tuyến & các chương trình CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp
								dẫn đến các bạn.
							</p>

							<Search placeholder="your.address@email.com" enterButton="Đăng Ký" size="large" style={{ width: "500px",marginTop:"20px" }}/>
						</div>
					</Col>

					<Col span={12}>
						<Form className="formDangKy">
							<h3>ĐĂNG KÍ TƯ VẤN</h3>
							<Form.Item>
								<Input placeholder="Họ và Tên *" size="large" style={{ width: "500px" }}/>
							</Form.Item>

							<Form.Item>
								<Input style={{ width: "500px" }} placeholder="Điện thoại liên hệ *" size="large" />
							</Form.Item>

							<Form.Item>
								<Input placeholder="Email liên hệ *" style={{ width: "500px" }} size="large"/>
							</Form.Item>

							<Form.Item >
								<Button type="primary" htmlType="submit"  size="large" >
									Đăng Ký Tư Vấn
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>

				<Row className="footer_bottom">
					<Col span={10} className="footer_address">
						<h3>Liên Hệ</h3>
						<List
							dataSource={lienHe}
							renderItem={item => (
								<List.Item style={{borderBottom:0,fontSize:"16px"}}>
									<Icon type="dingding" /> {item}
								</List.Item>
							)}
						/>
					</Col>

					<Col span={14} className="footer_map">
						<div className="footer_grids">
							<iframe title="map"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5013714898746!2d106.6668640145634!3d10.772859292323977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edc3f3043a7%3A0xb490b64157cb9dc1!2sCybersoft!5e0!3m2!1svi!2s!4v1577066240758!5m2!1svi!2s"
								width="800"
								height="450"
								frameBorder="0"
								allowFullScreen=""></iframe>
						</div>
					</Col>
				</Row>
				<Row className="footer_banQuyen">
					<Col>
			
							<p>© Bản quyền <Link to="/">E.Learning-Nguyễn Chính Luận</Link> 2019-2020</p>
					
					</Col>
				</Row>
      </div>
		
		);
	}
}


import React, { Component, Fragment } from 'react'
import { Carousel,Icon } from 'antd';

export default class CarouselHome extends Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
      }
      next() {
        this.carousel.next();
      }
      previous() {
        this.carousel.prev();
      }


    render() {

        const props = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          };
        return (
            <Fragment>
            <Carousel style={{ width: "100%", height: "650px",position:"relative" }} autoplay ref={node => (this.carousel = node)} {...props}>
                <div >
                    <img style={{ width: "100%", height: '650px' }} src={require("../../assets/images/slider/banner4.jpg")} alt="" />
                </div>
                <div>
                    <img style={{ width: "100%", height: '650px' }} src={require("../../assets/images/slider/banner1.jpg")} alt="" />

                </div>

                <div>
                    <img style={{ width: "100%", height: '650px' }} src={require("../../assets/images/slider/banner2.jpg")} alt="" />
                </div>
                <div>
                    <img style={{ width: "100%", height: '650px' }} src={require("../../assets/images/slider/banner3.jpg")} alt="" />

                </div>
               
                <div >
                    <img style={{ width: "100%", height: '650px' }} src={require("../../assets/images/slider/banner5.jpg")} alt="" />

                </div>
            </Carousel>
            <Icon  type="left" onClick={this.previous} style={{position:"absolute",bottom:"250px",left:"40px",fontSize:"40px",color:"#424244" }} />
            <Icon  type="right" onClick={this.next} style={{position:"absolute", bottom:"250px",right:"40px",fontSize:"40px",color:"#424244"  }} />
            </Fragment>
        );
    }
}

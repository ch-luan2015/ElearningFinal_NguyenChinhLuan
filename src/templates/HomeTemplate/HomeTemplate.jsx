import './HomeTemplate.less';
import React, { Fragment} from 'react';
import { Route} from 'react-router-dom';
import FooterHome from '../../Components/Footer/FooterHome';
import HeaderAdmin from '../../Components/HeaderAdmin/HeaderAdmin'




  
const HomeLayout = (props) => {
 
  return <Fragment>
    <HeaderAdmin/>
    {props.children}
    <FooterHome/>

  </Fragment>
}

export const HomeTemplate = ({ Component, ...props }) => (
  <Route {...props} render={(propComponent) => (
    <HomeLayout>
      <Component {...propComponent} />
     
    </HomeLayout>
  )} />
)
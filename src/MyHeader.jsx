
import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';

const { Header, Content, Sider } = Layout;
const MyHeader = () => {

  const item_navs = [
    {
      label: '3D产品展示',
      key: '1'
    }, 
    // {
    //   label: 
    //   <>
    //     {/* <p>234234</p> */}
    //     <Slider defaultValue={30} 
    //       onChange={(value) => {
    //         console.log(value);
    //         setComponent_pos([value, 0]);
    //       }}
    //     />
    //   </>,
    //   key: 'slider'
    // }
  ]

  return (
    <Header className='header'>
    <Menu 
        mode="horizontal" 
        defaultSelectedKeys={['1']} items={item_navs}/>
    </Header>
  )
}

export default MyHeader;
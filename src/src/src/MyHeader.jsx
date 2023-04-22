
import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';

const { Header, Content, Sider } = Layout;
const MyHeader = () => {

  const item_navs = [
    {
      // label: <img src="favicon.ico" height='64px'></img>,
      label: 'logo',
      label: <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />,
      key: '0'
    }, 
    {
      label: '3D产品展示',
      key: '1'
    }, 
    {
      label: '生成图片',
      key: '2'
    }, 
    {
      label: '拓扑设计界面',
      key: '3'
    }, 
    {
      label: '其他设置',
      key: '4'
    }, 
    {
      label: '帮助',
      key: '5'
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
import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';

const Control_sider = (props) => {
  return (
    <>
    调节xyz
    <Slider defaultValue={0} 
      min={-100}
      max={100}
      onChange={(value) => {
        // console.log(value);
        props.set_pos([value, props.component_pos[1]]);
        // setComponent_pos([value, component_pos[1]]);
      }}
    />
    <Slider defaultValue={0} 
      min={-100}
      max={100}
      onChange={(value) => {
        // console.log(value);
        props.set_pos([props.component_pos[0], value]);
      }}
    />
    </>
  )
}

export default Control_sider;
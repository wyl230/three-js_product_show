import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Property_sider = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const item = [
    {
      name: '名称',
      description: '描述...'
    },
    {
      name: 
        <ol>
          <li>
            360°旋转，支持拖动；
          </li>
          <li>
            支持关键属性点击查看。 机箱功率；机箱槽位个数及排布；机箱 VPX/LAM 布局方式；
          </li>
          <li>
            支持关键属性修改，如机箱布局，横插/竖插方式。
          </li>
        </ol>
    }
  ];
  // console.log(list);
  return (
    <List
      className="property-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      // dataSource={list}
      dataSource={item}
      renderItem={(item) => (
        <List.Item
          actions={[
          <a key="list-loadmore-edit">edit</a>, 
          // <a key="list-loadmore-more">more</a>
        ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://localhost:9999">{item.name}</a>}
              description={item.description}
            />
            {/* <div>content</div> */}
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Property_sider;




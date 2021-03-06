import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Index.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search, TextArea } = Input;

@connect(({ group, loading }) => ({
  group,
  loading: loading.models.group,
}))
@Form.create()
class GroupList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'group/fetch',
      payload: {
        count: 25,//获取个数
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'group/fetch',
      payload: {
        count: 25,
      },
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : 0;

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      //this.setState({
      //  done: true,
      //});
      dispatch({
        type: 'group/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'group/remove',
      payload: { ids: [id] },
    });
  };

  render() {
    const {
      group,
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除团队',
          content: '确定删除该团队吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { userId, createdDate, users, projects } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{userId}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>用户</span>
          <p>{users}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>团队</span>
          <p>{projects}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>创建时间</span>
          <p>{moment(createdDate).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="你已经成功添加了团队。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="团队名称" {...this.formLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入团队名称' }],
              initialValue: current.name,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="别名（唯一键）" {...this.formLayout}>
            {getFieldDecorator('key', {
              rules: [{ pattern: /[a-z0-9\-]+/ig, required: true, message: '请输入别名（唯一键）' }],
              initialValue: current.key,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="图标" {...this.formLayout}>
            {getFieldDecorator('iconUrl', {
              initialValue: current.iconUrl,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="标签" {...this.formLayout}>
            {getFieldDecorator('tags', {
              initialValue: current.tags,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="描述">
            {getFieldDecorator('description', {
              initialValue: current.description,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个团队" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周团队平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成团队数" value="24个团队" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="标准列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={group.list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn current={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.iconUrl} shape="square" size="large" />}
                    title={<a href={item.href}>{item.name}</a>}
                    description={item.description}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `团队${current.id ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default GroupList;

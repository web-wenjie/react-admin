import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const loginForm = (props) => {
   const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const togglefrom = ()=>{
        props.switchform('register')
    }

    return (
        <div className="form-wrap">
            <div>
                <div className="form-header">
                    <h4 className="column">登录</h4><span onClick={togglefrom}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    pattern: /^[1]([3-9])[0-9]{9}$/,
                                    required: true,
                                    message: '请输入正确的手机号码',
                                },
                            ]}
                        >
                            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                                    required: true,
                                    message: '密码至少包含 数字和英文，长度6-20',
                                },
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item
                            name="verifyCode"
                            rules={[
                                {
                                    required: true,
                                    message: '验证码错误',
                                },
                            ]}
                        >
                            <Row gutter={13}>
                                <Col span={16}>
                                    <Input size="large" placeholder="验证码" />
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" block size="large" >
                                        获取验证码
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button" block >
                                登录
                            </Button>

                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    )
}


export default loginForm
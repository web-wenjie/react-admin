import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { validate_pwd, validate_email } from '../../utils/validate'
import {  addUser } from '../../api/userAPI';
import BowCode from '../../components/BowCode';

const Register = (props) => {
    const [form] = Form.useForm();

  

    const onFinish = async ({ verifyCode, username, password }) => {
        
        var res = await addUser({
            code: verifyCode,
            username,
            password
        })
        console.log(res);
        if (res.resCode === 0) {
            message.success('注册成功,即将跳转到登录界面')
            setTimeout(() => {
                props.switchform('login')
            }, 500)
        }else{
            message.error(res.message);
        }
    };

    const togglefrom = () => {
        props.switchform('login')
    };



    return (
        <div className="form-wrap">
            <div>
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={togglefrom} >账号登录</span>
                </div>
                <div className="form-content">
                    <Form
                        form={form}
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
                                    pattern: validate_email,
                                    required: true,
                                    message: '请输入正确的邮箱',
                                },
                            ]}
                        >
                            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入手机号码" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {

                                    required: true,
                                    message: '密码不能为空',
                                },
                                {
                                    pattern: validate_pwd,
                                    message: '密码至少包含 数字和英文，长度6-20',
                                }
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>

                        <Form.Item
                            name="passwords"
                            rules={[
                                {

                                    required: true,
                                    message: '不能为空',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不相同 '));
                                    },
                                })
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请重新输入密码" />
                        </Form.Item>

                        <Form.Item
                            name="verifyCode"

                        >

                            <Row gutter={13}>
                                <Col span={16}>
                                    <Input size="large" placeholder="验证码" />
                                </Col>
                                <Col span={8}>
                                    <BowCode fromv={async () => { return await form.validateFields(['username', 'password', 'passwords']) }}  module='register' />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button" block >
                                注册
                            </Button>

                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    )
}


export default Register
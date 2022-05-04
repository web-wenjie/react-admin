import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { validate_pwd, validate_email } from '../../utils/validate';
import BowCode from '../../components/BowCode';
import { Login  } from '../../api/userAPI';
import { useLocation, useNavigate } from "react-router-dom"


const loginForm = (props) => {
     // eslint-disable-next-line
    const nav = useNavigate()
    // eslint-disable-next-line
    const [form] = Form.useForm();
    const onFinish = async ({ verifyCode, username, password }) => {
        console.log();
       const res = await Login({
        code: verifyCode,
        username,
        password
       })
        console.log(res);
       if (res.resCode === 0) {
        message.success('登录成功,即将进入首页')
        setTimeout(() => {
            //路由跳转
           
            nav('/index',{state:{a:1,b:2}})
        }, 500)
    }else{
        message.error(res.message);
    }
    };
    const togglefrom = () => {
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
                            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    pattern: validate_pwd,
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
                                    <BowCode fromv={async () => { return await form.validateFields(['username', 'password',]) }} module='login' />
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
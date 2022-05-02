import { useState, useEffect} from 'react';
import { Form, Input, Button, Row, Col ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { validate_pwd, validate_email } from '../../utils/validate'
import { getSms,addUser} from '../../api/userAPI';

const Register = (props) => {
    const [loading, setLoading] = useState(false)
    const [codeText, setCodeText] = useState('获取验证码')
    const [disabled, setDis] = useState(false)
    const [form] = Form.useForm();
    const [codeTime, setCt] = useState(0)
/* eslint-disable */
  useEffect(()=>{
      
      return ()=>{
        clearInterval(codeTime)
      }
  },[])

    const onFinish = async ({verifyCode,username,password}) => {
       
      var res = await addUser({
         code:verifyCode,
         username,
         password
      })
      console.log(res);
      if(res.resCode===0){
        message.success('注册成功,即将跳转到登录界面')
       setTimeout(()=>{
        props.switchform('login')
       },500)
      }
    };

    const togglefrom = () => {
        props.switchform('login')
    };

    const getCode = () => {
        //点击获取验证码判断username/password/passwords 是否符合规则
        form.validateFields(['username', 'password', 'passwords'],)
            .then(async (res) => {
                console.log(res);
                setLoading(true)
                setCodeText('loading...')
                var code = await getSms({
                    username: res.username,
                    module: 'register'
                })
                console.log(code);
                if (code.resCode === 0) {
                    setLoading(false)
                    setCodeText("发送成功")
                    setTimeout(() => {

                        setCodeText(3)
                    }, 1000)
                    setDis(true)
                } else {
                    setCodeText("发送失败")
                }
            })


    }
    useEffect(() => {

        if (codeText === 3) {
            var n1 = codeText
            var n2 = setInterval(() => {
                n1 = n1 - 1
                setCodeText(n1)
                console.log(1);
            }, 1000);
            setCt(n2)
        }
        if (codeText <= 0) {
            clearInterval(codeTime)
            setDis(false)
            setCodeText('重新获取')
        }
    }, [codeText])

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
                            rules={[
                                {
                                    required: true,
                                    message: '验证码有误',
                                },
                            ]}
                        >
                            <Row gutter={13}>
                                <Col span={16}>
                                    <Input size="large" placeholder="验证码" />
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" block size="large" onClick={getCode} loading={loading} disabled={disabled} style={{ borderColor: "#40A9FF", backgroundColor: "#40A9FF", color: "#fff" }} >
                                        {codeText}
                                    </Button>
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
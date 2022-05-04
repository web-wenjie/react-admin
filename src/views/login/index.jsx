//------------ 登录注册需要加上清除定时器------------暂时完成不了
import { Component } from "react";
import "./index.scss"
import LoginForm from "./loginForm";
import Register from "./Register";
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formType: 'login'
        }
    }
    switchform = (val) => {
        this.setState({
            formType: val
        })
    }

    render() {
        const { formType } = this.state
    
        return (
            <>
                <h1 className="heading">人事后台管理系统</h1>
                {
                formType === 'login' 
                ? <LoginForm switchform={this.switchform}  /> 
                : <Register switchform={this.switchform} />
                }
            </>
        )
    }
}


export default Login
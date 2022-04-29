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
                {
                formType === 'login' 
                ? <LoginForm switchform={this.switchform} /> 
                : <Register switchform={this.switchform} />
                }
            </>
        )
    }
}


export default Login
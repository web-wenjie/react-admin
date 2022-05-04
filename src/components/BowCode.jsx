import { useState, useEffect } from "react";
import { Button } from 'antd'
import { getSms } from '../api/userAPI';


const BowCode = (props) => {
    const [codeText, setCodeText] = useState('获取验证码');
    const [disabled, setDis] = useState(false);
    var [codeTime, setCt] = useState(null);
    const [loading, setLoading] = useState(false);
  

    const getCode = () => {

        //点击获取验证码判断username/password/passwords 是否符合规则
        props.fromv().then(async (res) => {

            console.log(res);
            setLoading(true)
            setCodeText('loading...')
            var code = await getSms({
                username: res.username,
                module: props.module
            })
            console.log(code);
            if (code.resCode === 0) {
                setLoading(false)
                setCodeText("发送成功")
                setTimeout(() => {
                    setCodeText(30)
                }, 1000)
                setDis(true)
            }
        })
    }
    //设置定时器 起到节流效果
    // eslint-disable-next-line
    useEffect(() => {
        if (codeText === 30) {
            var n1 = codeText
            var n2 = setInterval(() => {
                n1 = n1 - 1
                setCodeText(n1)
                console.log(1);
            }, 1000);
            console.log(n2);
            setCt(n2)
        }
        if (codeText <= 0) {
            clearInterval(codeTime)
            setDis(false)
            setCodeText('重新获取')
        }
        // eslint-disable-next-line
    }, [codeText]);
    //销毁组件时清除定时器
    // eslint-disable-next-line
    useEffect(()=>{
        return ()=>{ console.log(codeText); clearInterval(codeTime) ;console.log(codeTime);} 
        // eslint-disable-next-line
    },[])

    return (
        <Button type="primary" block size="large" onClick={getCode} loading={loading} disabled={disabled} style={{ borderColor: "#40A9FF", backgroundColor: "#40A9FF", color: "#fff" }} >
            {codeText}
        </Button>
    )
}

export default BowCode
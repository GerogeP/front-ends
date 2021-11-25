import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import { LoginState } from '../App'
import * as Axios from './Axios'
import * as Staff from './Staff'
const ariaLabel = { 'aria-label': 'description' };

export interface ILogin {
    login_name: string;
    password: string;
};
export interface ILogout {
    staff: number;
};
/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
export const Login = (params: ILogin): Promise<any> => {
    return Axios.axiosInstance.post('yaoe_admin/token/', params).then(
        res => res
        // res => console.log(res)

    );
};

// const props:
/**
 * @description: 用户退出登录
 * @params {ILogout} params
 * @return {Promise}
 */
export const Logout = (params: ILogout): Promise<Axios.IResponse> => {
    return Axios.axiosInstance.post('yaoe_admin/logout/', params).then(res => res.data);
};


export default function Header() {
    const [open, setOpen] = React.useState(false);
    const [loginPromp, setLoginPromp] = React.useState('')
    const [messageLogin, setMessageLogin] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [forget, setForget] = React.useState('忘记密码')
    const [loginName, setLoginName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const loginState = React.useContext(LoginState)
    const handleLoginName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginName(e.currentTarget.value)
        // console.log(e.target.value)
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        // console.log(e.target.value)
    };

    const preHandleLogin = () => {
        //login the user
        if (loginName !== null && password !== null) {
            handleLogin({ login_name: loginName, password: password })
        }
    };

    // 登录按钮逻辑
    const handleLogin = async (login: ILogin) => {
        // 调用登录Api，获取结果
        let res: any = await Login(login);
        if (res.status === 200) {
            let data = res.data;
            if (data.error) {
                setMessageLogin(data.error)
            }
            if (data.detail) {
                setMessageLogin(data.detail)
            }
            if (data.staff) {
                // 提示登录成功
                localStorage.setItem('user_id', data.staff);
                loginState.toggleState(true, Number(data.staff));

                console.log('----just logined=====', localStorage.getItem('user_id'), loginState);

                setOpen(false)

            }

        }
        // 提示登录失败
        if (res.status === 401) {
            setMessageLogin('账号密码错误！')
        }

    };
    const handleLogout = async (logout: ILogout) => {
        return await Logout(logout);
    };

    const handleClickOpen = () => {
        // pre- logout
        // console.log('---prelogout---', loginState.isLogined, loginState.staff)
        if (loginState.isLogined) {
            let logout: ILogout = {
                staff: Number(localStorage.getItem('user_id')),
            }
            handleLogout(logout).then((res) => {
                loginState.toggleState(false, 0);
            }
            ).catch((error) => {
                console.log(error)
            }
            )
        }
        else {
            if (!open) {
                setMessage('')
                setOpen(true);
            }
        }

    };

    const handleForget = () => {
        if (forget == '忘记密码') {
            setForget('收起')
            setMessage('请联系本店店长或者打客服电话0103332322')
        } else {
            setForget('忘记密码')
            setMessage('')
        }
    }
    React.useEffect(() => {
        // console.log('=======useEffect======')
        if (loginState.isLogined) {
            let staff = localStorage.getItem('user_id')
            Staff.getUserInfo(Number(staff)).then((res) => {
                setLoginPromp("欢迎您，" + res.data.username + "! 退出");
            });
        } else {
            setLoginPromp("登录")
        }

    }, [open, message, loginState.isLogined])

    return (

        <AppBar position="static">
            {/* {{ props }} */}
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, flexGrow: 1 }}
                >
                    <DehazeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    网站建设中，有任何问题请打客服电话: 18513731889
                </Typography>
                <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
                    {loginPromp}
                </Button>
                <Dialog
                    sx={{ '& .MuiDialog-paper': { width: '60%', height: '45%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', paddingTop: 1, paddingBottom: 3 } }}
                    maxWidth="sm"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            药E+后台管理系统
                        </Typography>
                    </DialogTitle>
                    <DialogContent sx={{ fontSize: 20, maxHeight: '30%', overflow: 'hidden', justifyContent: 'space-around' }}>

                        <Box sx={{ fontSize: 30 }}>
                            <Input

                                id="loginName"
                                placeholder="账号"
                                inputProps={ariaLabel}
                                onChange={handleLoginName}
                            />
                        </Box>
                        <Box sx={{ fontSize: 30 }}>
                            <Input
                                id="password"
                                placeholder="密码"
                                inputProps={ariaLabel}
                                onChange={handlePassword}
                            />
                        </Box>

                    </DialogContent>
                    <Typography sx={{ fontSize: 12 }} color="#f00" gutterBottom>
                        {messageLogin}
                    </Typography>
                    <DialogActions sx={{ fontSize: 20, flexDirection: 'column' }}>
                        <Button color="primary" variant="contained" size="large" onClick={preHandleLogin}>
                            <Typography sx={{ fontSize: 16 }} color="#fff" gutterBottom>
                                登录
                            </Typography>
                        </Button>
                        <Button size="small" onClick={handleForget} sx={{ right: 0, justifyContent: 'flex-end' }}>
                            <Typography sx={{ fontSize: 10, }} color="text.primary" gutterBottom>
                                {forget}
                            </Typography>
                        </Button>
                    </DialogActions>
                    <DialogContentText sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        {message}
                    </DialogContentText>
                </Dialog>


            </Toolbar>
        </AppBar >
    );
}
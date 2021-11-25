import * as React from 'react';
import { NavLink } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { LoginState } from '../App'

// interface IProps {
//     isLogined: boolean;
// }
export default function Navigator() {
    const loginState = React.useContext(LoginState)

    const checked: boolean = loginState.isLogined
    return (
        <Collapse orientation="horizontal" in={checked} sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>


            <NavLink to="/">

            </NavLink>

            <NavLink to="/upload" >
                <Typography variant="h5" component="h5" gutterBottom>上传数据</Typography>
            </NavLink>

            <NavLink to="/pharmacy">
                <Typography variant="h5" component="h5" gutterBottom>门店管理</Typography></NavLink>

            <NavLink to="/accounts">
                <Typography variant="h5" component="h5" gutterBottom>分配账号</Typography></NavLink>

        </Collapse>

    )
}

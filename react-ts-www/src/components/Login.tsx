import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';


interface IProps {
    isLogined: boolean;
    onChangeIsLogined: () => void;
}

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const ariaLabel = { 'aria-label': 'description' };

export default function Login(props: IProps) {

    return (

        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            width: 400,
            height: 300,
            padding: 3,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'primary.paper',
            color: '#000'
            // '&:hover': {
            //     backgroundColor: 'primary.main',
            //     opacity: [0.9, 0.8, 0.7],
            // },
        }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                药E+后台管理系统
            </Typography>
            <Input placeholder="账号" inputProps={ariaLabel} />
            <Input placeholder="密码" inputProps={ariaLabel} />
            <Button size="large" onClick={() => props.onChangeIsLogined}>
                {/* <Button size="large" onClick={() => alert("login")}> */}
                登录
            </Button>
            <Typography variant="body2">忘记密码</Typography>

        </Paper>

    )
}

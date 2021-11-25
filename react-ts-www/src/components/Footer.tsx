import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Modal from '@mui/material/Modal';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            <Link color="inherit" href="http://www.yybzn.cn/">
                药E+
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

export default function Footer() {
    return (


        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, flexGrow: 1 }}
                >
                    {/* <IconButton /> */}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    京ICP备2021019385号
                </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    技术支持：药E家  客服电话: 18513731889
                </Typography>
                <Copyright />
            </Toolbar>
        </AppBar>
    )
}
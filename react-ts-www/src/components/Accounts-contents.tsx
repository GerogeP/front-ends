


import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import YaOEPlus_Icon from '../asserts/appLogo_about.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DehazeIcon from '@material-ui/icons/Dehaze';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function createData(name: string, calories: number, fat: number, carbs: number, protein: number, operation: string[]) {
    return { name, calories, fat, carbs, protein, operation };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, ['修改', '强制登出', '清空数']),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, ['修改', '强制登出', '清空数']),
    createData('Eclair', 262, 16.0, 24, 6.0, ['修改', '强制登出', '清空数']),
    createData('Cupcake', 305, 3.7, 67, 4.3, ['修改', '强制登出', '清空数']),
    createData('Gingerbread', 356, 16.0, 49, 3.9, ['修改', '强制登出', '清空数']),
];
export default function App() {
    return (

        <div style={{ margin: 10, border: 'red' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                分配账号
            </Typography>

            <div style={{ width: '100vw', height: 20 }}></div>
            <Stack direction="row" spacing={4}>
                <DehazeIcon />
                <Button variant="contained">推广人员列表</Button>
                <Button variant="contained" disabled>新增账号</Button>
                <Button variant="contained" href="#contained-buttons">申请更多账号</Button>
            </Stack>
            <div style={{ width: '100vw', height: 20 }}></div>
            <TableContainer component={Paper}>
                <Typography variant="h5" component="h5" gutterBottom align="left">列表信息</Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">姓名</TableCell>
                            <TableCell align="right">登录用户名&nbsp;(g)</TableCell>
                            <TableCell align="right">密码&nbsp;(g)</TableCell>
                            <TableCell align="right">职位&nbsp;(g)</TableCell>
                            <TableCell align="right">操作&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.operation}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}




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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function App() {
    const [download, setDownload] = React.useState(false)
    const [formUrl, setFormUrl] = React.useState(location.origin + '/static/药品数据模板.xlsx')
    const [fileName, setFileName] = React.useState('药品数据模板')
    const handleDownload = () => {
        setFormUrl(process.env.NODE_ENV === "development" ?
            'http://127.0.0.1:8000' + '/static/药品数据模板.xlsx'
            :
            location.origin + '/static/药品数据模板.xlsx');
        console.log(formUrl)
        setDownload(!download)
    }
    React.useEffect(() => {
        if (download) {
            let d = new Date()
            setFileName("药品数据模板_" + d.getFullYear() + d.getMonth() + d.getDate() + ".xlsx")
        }
    }, [download])

    return (

        <div style={{ margin: 10, border: 'red' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                上传药品数据
            </Typography>
            <div>
                <Typography variant="h5" component="h5" gutterBottom align="left">
                    说明
                </Typography>

                <Typography variant="h5" component="h5" gutterBottom align="left">                    1、请点击下载模板，按照数据模板的格式准备上传数据，模板中的表头名称不可更改，表头行不能删除，单次导入的数据不超过10000条。
                </Typography>

                <Typography variant="h5" component="h5" gutterBottom align="left">
                    2、全部更新：上传的数据，会全部覆盖系统已有数据
                </Typography>

                <Typography variant="h5" component="h5" gutterBottom align="left">
                    3、局部更新：上传的数据，只会更新excel表里的数据（包括替换和新增）
                </Typography>
            </div>
            <div style={{ width: '100vw', height: 20 }}></div>
            <Stack direction="row" spacing={4}>
                <Button variant="contained" onClick={handleDownload}>下载模板</Button>

                <Dialog
                    open={download}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDownload}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>点击下方文件名按钮下载</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Button variant="contained">
                                <a href={formUrl} download={fileName}>
                                    <Typography variant="h5" component="h5" color="white" gutterBottom >
                                        {fileName}
                                    </Typography>
                                </a>
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDownload}>取消本次下载</Button>
                        {/* <Button onClick={handleDownload}>Agree</Button> */}
                    </DialogActions>
                </Dialog>
                <Button variant="contained" disabled>全部更新</Button>
                <Button variant="contained" href="#contained-buttons">局部更新</Button>
            </Stack>
            <div style={{ width: '100vw', height: 20 }}></div>
            <TableContainer component={Paper}>
                <Typography variant="h5" component="h5" gutterBottom align="left">上传记录</Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>上传文件名</TableCell>
                            <TableCell align="right">上传时间</TableCell>
                            <TableCell align="right">上传人&nbsp;(g)</TableCell>
                            <TableCell align="right">更新类型&nbsp;(g)</TableCell>
                            <TableCell align="right">上传状态&nbsp;(g)</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

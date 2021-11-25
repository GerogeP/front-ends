import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import YaOEPlus_Icon from '../asserts/appLogo_about.png'
import Table from '@mui/material/Table';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Box from '@mui/material/Box';

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
                门店管理
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom align="left">
                门店ID
            </Typography>

            <Typography variant="h5" component="h5" gutterBottom align="left">
                门店名称
            </Typography>

            <Typography variant="h5" component="h5" gutterBottom align="left">
                门店照片
            </Typography>
            <Box sx={{ width: 160, height: 160, border: 'red solid' }} >
                <img src={YaOEPlus_Icon} style={{ width: '100%', height: '100%' }} />;
            </Box>
            <Typography variant="h5" component="h5" gutterBottom align="left">
                轮播图
            </Typography>
            <ImageList sx={{ width: 200, height: 450 }} cols={1} rowHeight={164}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            style={{ width: '100%', height: '100%' }}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <div style={{ width: '100vw', height: 20 }}></div>


        </div>
    );
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from './components/Header'
import Footer from './components/Footer'
import Navigator from './components/Navigator';
import Pharmacy_contents from './components/Pharmacy-contents'
import { LoginState } from './App'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100%',
  backgroundColor: '#acf',
  color: theme.palette.text.secondary,
}));


export default function Pharmacy() {

  const loginState = React.useContext(LoginState)
  const isLogined = loginState.isLogined
  React.useEffect(() => {
    if (!isLogined) {
      const location_origin = window.location.origin
      console.log(window.location)
      window.location.href = location_origin
    }
  }, [loginState])
  return (

    <div>
      <Header
      // isLogined={isLogined}
      // onChangeIsLogined={() => setIsLogined(!isLogined)}
      />

      <Box style={{ flexDirection: 'column', flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={3} md={2}>
            <Item>
              <Navigator
              />
            </Item>
          </Grid>
          <Grid item sm={9} md={10} style={{ paddingLeft: 0, }}>
            <Item>
              <Pharmacy_contents />;
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </div >
  );
}

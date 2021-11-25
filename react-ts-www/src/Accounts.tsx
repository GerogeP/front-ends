import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import YaOEPlus_Icon from './asserts/appLogo_about.png'
import Header from './components/Header'
import Footer from './components/Footer'
import Navigator from './components/Navigator';
import Accounts_contents from './components/Accounts-contents'
import { LoginState } from './App'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: '100%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#acf',
}));


export default function Accounts() {
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
              // isLogined={isLogined}
              />
            </Item>
          </Grid>
          <Grid item sm={9} md={10} style={{ paddingLeft: 0, }}>
            <Item>
              <Accounts_contents />;
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div >
  );
}

import React, { FC, useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import YaOEPlus_Icon from './asserts/appLogo_about.png'
import Header from './components/Header'
import Footer from './components/Footer'
import Navigator from './components/Navigator';
import Box from '@mui/material/Box';
import { LoginState } from './App'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  paddingLeft: 0,
  paddingRight: 0,
  marginLeft: 0,
  marginRight: 0,
  textAlign: 'center',
  height: '100%',
  backgroundColor: '#acf',
  color: theme.palette.text.secondary,
}));


const Home = () => {
  const [homeBox, setHomeBox] = useState(() => {
    return (
      <Box style={{ flexDirection: 'column', flexGrow: 1 }}>
        <Grid item sm={12} md={12}>
          <Item>
            <img src={YaOEPlus_Icon} />;
          </Item>
        </Grid>
      </Box>
    )
  })
  const loginState = useContext(LoginState)
  console.log('Home.tsx : isLogined ? ', loginState.isLogined)

  useEffect(() => {
    console.log('=======useEffect======')
    if (loginState.isLogined) {
      setHomeBox(() => {
        return (
          <Box style={{ flexDirection: 'column', flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item sm={3} md={2} >
                <Item>
                  <Navigator
                  />
                </Item>
              </Grid>
              <Grid item sm={9} md={10} style={{ paddingLeft: 0 }}>
                <Item >
                  <div >
                    <img src={YaOEPlus_Icon} />
                  </div>
                </Item>
              </Grid>
            </Grid>
          </Box>)
      });
    } else {
      setHomeBox(() => {
        return (
          <Box style={{ flexDirection: 'column', flexGrow: 1 }}>
            <Grid item sm={12} md={12}>
              <Item sx={{ padding: 0 }}>
                <img src={YaOEPlus_Icon} />;
              </Item>
            </Grid>
          </Box>
        )
      });
    }
  }, [loginState.isLogined]);

  return (

    <div >

      <Header />

      {homeBox}

      <Footer />

    </div >
  );
}
export default Home
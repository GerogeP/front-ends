import * as React from 'react';
import Container from '@mui/material/Container';
import Home from './Home';
import Upload from './Upload';
import Accounts from './Accounts';
import Pharmacy from './Pharmacy';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export interface ILoginState {
  isLogined: boolean,
  staff: number,
  toggleState: (isLogin: boolean, staff: number) => {} | void,
}

export const LoginState = React.createContext({
  isLogined: false,
  staff: 0,
  toggleState: (isLogin: boolean, staff: number) => { },
});

export default function App() {
  const [isLogined, setIsLogined] = React.useState(false);
  const [staff, setStaff] = React.useState(0);


  const log_state: ILoginState = {
    isLogined: isLogined,
    staff: staff,
    toggleState: (isLogin: boolean, staff_id: number) => { setIsLogined(isLogin); setStaff(staff_id); }
  }
  React.useEffect(() => {
    setIsLogined(log_state.isLogined)
    setStaff(log_state.staff)
    console.log('this is APP : ', isLogined, staff)
  }, [isLogined])

  return (
    <LoginState.Provider value={log_state} >
      <Router>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/" element={<Home />} />
        </Routes>
        {/* </div> */}
      </Router >
    </LoginState.Provider>
  );
}

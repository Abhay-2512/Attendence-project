import {useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import SignUpPage from './Components/SignUpPage';
import LogInPage from './Components/LogInPage';
import HomePage from './Components/HomePage';
import AttendenceAccountPage from './Components/AttendenceAccountPage';
import LeaveApplicationPage from './Components/LeaveApplicationPage';
import { Switch, Redirect, Route} from 'react-router-dom';



function App() {
  const [UserCheck,setUserCheck]=useState({
    UserID: "",
    Password: "",
    UserCheckError: false
  })
  const myHandlerUsercheck = (e) => {
    setUserCheck({...UserCheck,[e.target.name]: e.target.value })
  }
  return (
    
    <Switch>
    <Route exact path="/HomePage" component={HomePage} />
    <Route exact path="/SignUpPage" component={SignUpPage} />
    <Route exact path="/LogInPage" render={()=>{return <LogInPage myHandlerUsercheck={myHandlerUsercheck} UserCheck={UserCheck} />}} />
    <Route exact path="/AttendenceAccountPage"  render={()=>{return <AttendenceAccountPage  UserCheck={UserCheck} />}}  />
    <Route exact path="/LeaveApplicationPage" component={LeaveApplicationPage} />
    <Redirect to="/HomePage" />
    </Switch>
  );
}

export default App;

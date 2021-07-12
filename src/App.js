import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import SignUpPage from './Components/SignUpPage';
import LogInPage from './Components/LogInPage';
import HomePage from './Components/HomePage';
import AttendenceAccountPage from './Components/AttendenceAccountPage';
import LeaveApplicationPage from './Components/LeaveApplicationPage';
import { Switch, Redirect, Route} from 'react-router-dom';



function App() {
  return (
    <div>
    
    <Switch>
    <Route exact path="/HomePage" component={HomePage} />
    <Route exact path="/SignUpPage" component={SignUpPage} />
    <Route exact path="/LogInPage" component={LogInPage} />
    <Route exact path="/AttendenceAccountPage" component={AttendenceAccountPage} />
    <Route exact path="/LeaveApplicationPage" component={LeaveApplicationPage} />
    <Redirect to="/HomePage" />
    </Switch>
    </div>
  );
}

export default App;

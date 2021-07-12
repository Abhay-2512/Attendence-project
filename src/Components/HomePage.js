import React from 'react'
import LogInPage from './LogInPage'
import SignUpPage from './SignUpPage';
import {useHistory} from 'react-router-dom';

function HomePage() {

    const history=useHistory();
    const openSignUp=()=>{
        history.push("/SignUpPage")
    }
    const OpenLogIn=()=>{
        history.push("/LogInPage")
    }
    return (
        <div className="w-100 d-flex my- justify-content-center align-items-center"style={{height:"500px"}}>
            <div className="w-50 border border-3 border-dark">
                <div className="my-5 w-25 mx-auto text-center"><button type="botton" onClick={openSignUp}>SignUpPage</button></div>
                <div className="my-5 w-25 mx-auto text-center"><button type="botton" onClick={OpenLogIn}>LogInPage</button></div>
                {/* <div><LogInPage /></div> */}
            </div>
        </div>
    )
}

export default HomePage

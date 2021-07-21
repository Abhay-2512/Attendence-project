import React,{useState,useEffect} from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';


function LogInPage(props) {
    const [AllData,setAllData]=useState([])
    
    const history=useHistory();
      useEffect(()=>{
        axios.get("http://localhost:3007/medxpertEmpDetails").then((res)=>{
            console.log(res.data)
            setAllData(res.data)
        })
      },[])
   
    const {myHandlerUsercheck,UserCheck} = props;
    console.log('i am LogInCandidate');
    
    
    const UserVerification=()=>{
        let counter=1;
        AllData.map((ele)=>{
            if((ele.UserID===UserCheck.UserID) && (ele.Password===UserCheck.Password)){
                history.push("/AttendenceAccountPage")
                counter=0;
            }
            return null;
        })
        if(counter){
            alert("Please Enter Valid Details")
        }
        
    }

    

   
    return (
        <div className="w-100 text-capitalize ">
        {(UserCheck.UserCheckError)?<p className="text-center text-white fw-bold p-1 w-50 mx-auto " style={{backgroundColor:'red',borderRadius:'15px'}}> Please Enter Valid Info Or Check Status </p>:null}
            <h2 className="w-75 mx-auto my-2 text-capitalize text-center">LogIn Page</h2>
            <form onSubmit={UserVerification} id="LogInCandidate" className="w-75 mx-auto border border-1 border-black p-3">
                <div>
                    <label className="form-label my-1" htmlFor="loguserId">UserID : </label>
                    <input type="text" className="form-control my-1" name="UserID" value={UserCheck.UserID} id="loguserId" onChange={myHandlerUsercheck} ></input>
                </div>
                <div>
                    <label className="form-label my-1" htmlFor="loguserPwd">Password : </label>
                    <input type="password" value={UserCheck.Password} name="Password" className="form-control my-1" id="loguserPwd" onChange={myHandlerUsercheck}></input>
                </div>
                
                <div className="w-100 text-center">
                    <input type="submit" value="Submit" className="btn btn-success btn-sm my-2"></input>
                </div>
            </form>
            
            <div className="w-75 mx-auto">
                <Link to="/HomePage"><button className="btn btn-success float-end my-2" >Back To home</button></Link>
            </div>
            

        </div>
    )
}

export default LogInPage

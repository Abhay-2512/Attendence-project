import React,{useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';

let URL2 = "http://localhost:3006/CandidateRegInfo";


let myReg = {
    Username: "",
    Email: "",
    Password: "",
    UserID: "",
    Mobile: "",
    gender: "",
    Position: "",
    Error: {
      Username: "",
      Email: "",
      Password: "",
      UserID: "",
      Mobile: "",
      gender: "",
      Position: ""
    },
    successMsg: "",
    Status:false
  }

function SignUpPage() {
    // State To Store the User Info For LogIn Examination
  const [RegData, setRegData] = useState(myReg);
  const history=useHistory();

    
  // All Input Fields HAndler

  const handleInputFields = (e) => {
    let name = e.target.name;
    let val = (name === "gender") ? e.target.id : e.target.value;
    setRegData({ ...RegData, [name]: val });
  }

  // Check Email Pattern callback

  const isEmail = (val) => {
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(val)) {
      return true;
    }
  }

  // All Field Validation function

  const formValidation = () => {
    let Errors = RegData.Error;
    let Obj = RegData;
    let isFormValid = true;
    const { Username, Password, Email, UserID, Mobile, Position, gender } = RegData;
    if (Username && Password && Email && UserID && Mobile && Position && gender) {
      if (isEmail(Email)) {

        isFormValid = isEmail(Email)
      } else {
        toast.warn("Please Enter Valid Email !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        document.getElementById("userEmail").focus();

        isFormValid = false;
      }
    } else {
      
      //Iterate the State Object Keys

      let ObjKeys = Object.keys(Obj);
      ObjKeys.map((ele) => {
        if (Obj[ele] === "") {
          Errors[ele] = `Please Enter Valid ${ele} ?`
          setRegData({...RegData,Error:Errors});

        }
        return null;
      })

      isFormValid = false;
    }

    return isFormValid;
  }


   // function for hide Error when focus on Input

   const hideError = (e) => {
    let Errors = RegData.Error;
    // Errors[e.target.name] = "";
    setRegData({...RegData,
      // Errors: RegData.Error,
      Error:{...Errors,[e.target.name]:""}
    })
  }

  // function for hide Error when blur on Input


  const showError = (e) => {
    // let Errors=this.state.Error;
    if (e.target.value === "") {
      formValidation()
    }
  }


  // Send Registered Data to Server and LOgIn pag Open

  const accountOpen = (e) => {
    e.preventDefault();
    if (formValidation()===true) {
      history.push("/AttendenceAccountPage")
      let mydata = {
        id:"",
        Username: RegData.Username,
        Email: RegData.Email,
        UserID: RegData.UserID,
        Password: RegData.Password,
        gender: RegData.gender,
        Position: RegData.Position,
        Status:RegData.Status
      }

      axios.post(URL2, mydata)
        .then((res) => {
          setRegData({...RegData,
            Username: "",
            Email: "",
            Password: "",
            UserID: "",
            Mobile: "",
            gender: "",
            Position: "",
            successMsg: "Account created successfully."
          })
          console.log(res)
          
        })
        .catch((err) => {
          toast.error("something went wrong !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            
          console.log(err);
        });
    }
  }
  console.log('i am Register1');


    return (
        <> 
            
            <div className="w-100 text-capitalize my-5 text-center fs-1 fw-bold">Employee SignUpPage</div>
            {/* <div className="d-flex justify-content-center text-center my-3 ">
                <Link to="/logInCandidate"><button className="btn btn-success mx-1 mb-3" >Employee Log In</button></Link>
            </div> */}
            {RegData.successMsg ? <div className="p-1 text-blue text-center border border-1 w-50 mx-auto" style={{backgroundColor:"lightgreen",borderRadius:"20px"}}>{RegData.successMsg}</div> : null}
            <div className="w-100 my-2">
                <form onSubmit={accountOpen} className="w-75 m-2 border border-1 border-blue mx-auto p-2">
                    <div>
                        <label className="form-label pt-3" htmlFor="username">Employee Name : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Username" value={RegData.Username} id="username" onChange={handleInputFields} ></input>
                        {RegData.Error.Username ? <span className="text-danger">{RegData.Error.Username}</span> : null}
                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userId">Employee ID : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="UserID" id="userId" value={RegData.UserId} onChange={handleInputFields}></input>
                        {(RegData.Error.UserID) ? <span className="text-danger">{RegData.Error.UserID}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userPwd">Password : </label>
                        <input type="password" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Password" id="userPwd" value={RegData.Password} onChange={handleInputFields}></input>
                        {(RegData.Error.Password) ? <span className="text-danger">{RegData.Error.Password}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userEmail">Email : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Email" id="userEmail" value={RegData.Email} onChange={handleInputFields}></input>
                        {(RegData.Error.Email) ? <span className="text-danger">{RegData.Error.Email}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userMobile">Mobile : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Mobile" id="userMobile" value={RegData.Mobile} onChange={handleInputFields}></input>
                        {RegData.Error.Mobile ? <span className="text-danger">{RegData.Error.Mobile}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3 py2" htmlFor="userGender">Gender : </label>
                        <div className="d-flex align-item-center">
                            <input type="radio" onFocus={hideError} onBlur={showError} className="radio-light m-1 mx-2" id="Male" name="gender" onChange={handleInputFields}></input><label className="fs-5 mx-2" htmlFor="Male">Male</label>
                            <input type="radio" onFocus={hideError} onBlur={showError} className="radio-light m-1 mx-2" id="FeMale" name="gender" onChange={handleInputFields}></input><label className="fs-5 mx-2" htmlFor="FeMale">FeMale</label>
                        </div>
                        {(RegData.Error.gender) ? <span className="text-danger">{RegData.Error.gender}</span> : null}

                    </div>
                    <div className="w-100">
                        <label>Select Designation/Position :</label>
                        <div className="text-center w-25 mx-auto">
                            <select name="Position" onFocus={hideError} onBlur={showError} className="mx-auto w-100" value={RegData.Exam} onChange={handleInputFields}>
                                <option value="">SELECT POSITION</option>
                                <option value="TRAINEE">TRAINEE</option>
                                <option value="INTERNSHIP">INTERNSHIP</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="SOFTWARE DEVELOPER">SOFTWARE DEVELOPER</option>
                                <option value="H.R.">H.R.</option>
                                <option value="DESIGNER">DESIGNER</option>
                                <option value="SR. SOFTWARE DEVELOPER">SR. SOFTWARE DEVELOPER</option>
                                <option value="DIGITAL MARKETING">DIGITAL MARKETING</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>
                        {(RegData.Error.Position) ? <span className="text-danger">{RegData.Error.Position}</span> : null}

                    </div>
                    <div className="w-100 text-center">
                        <input type="submit" value="Submit" className="btn btn-success btn-sm my-3"></input>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )

}

export default SignUpPage

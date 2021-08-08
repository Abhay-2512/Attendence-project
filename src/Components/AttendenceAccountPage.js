import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function AttendenceAccountPage(props) {
    const [startDate, setStartDate] = useState(null);
    const [EmpData,setEmpData]=useState({})
    const [Attendence, setAttendence] = useState({})
    const [monthlyPresentee, setMonthlyPresentee] = useState([]);
    let currMonth = new Date().getMonth();
    const addData = "0" + (currMonth + 1);
    const [viewmonth, setViewmonth] = useState(addData);
    const {UserCheck}=props;

    useEffect(() => {
        axios.get("http://localhost:3007/medxpertEmpDetails").then(res => {
            const myData=(res.data).filter((ele)=>{
                if((UserCheck.UserID===ele.UserID)&&(UserCheck.Password===ele.Password)){
                    return ele;
                }else{
                    return ele;
                } 
            })
            let monthly = myData;
            console.log(monthly)
            console.log(monthly[0].Attendencee)
            setAttendence(monthly[0].Attendencee)
            console.log(monthly[0])
            setEmpData(monthly[0])
            setMonthlyPresentee(monthly[0].Attendencee[viewmonth])
        })
        
    }, [viewmonth,UserCheck.UserID,UserCheck.Password])
    const AddPresentee = (e) => {
        if (e.target.innerHTML === "OK") {
            e.target.innerHTML = "Present"
            e.target.style.backgroundColor = "green";

        } else {
            e.target.innerHTML = "OK"
            e.target.style.backgroundColor = "blue";
            let currDate = new Date().getDate();
            let newOne = [...monthlyPresentee];
            console.log(newOne);
            let newDate =currDate-1;
            if(newOne[newDate].leave===true||newOne[newDate].status===true){
                alert("You already Taken for Today !")
            }else{
                newOne.splice(currDate - 1, 1, { "date": currDate, "status": true,"leave":false })
            setMonthlyPresentee(newOne)
            console.log(Attendence);
            
            let mergeAttendence = { ...Attendence, [viewmonth]: newOne }
            console.log(mergeAttendence)
            //  let num=Number(EmpData.id)
            axios.put(`http://localhost:3007/medxpertEmpDetails/${1}`, { ...EmpData, "Attendencee": mergeAttendence }).then((res) => {
                console.log("data put ok")
                alert("Done")
            })
            }
            
        }
    }

    const ViewMonthlyAttencence = (e) => {
        setViewmonth(e.target.value)
        setMonthlyPresentee(Attendence[e.target.value])
        console.log(Attendence[e.target.value])
        // console.log(AllData.Attendencee[e.target.value]);
        if (e.target.value === addData) {
            document.getElementById("hidePresenteeBtn").style.display = "block";
            document.getElementById("hideLeaveBtn").style.display = "block";
        } else {
            document.getElementById("hidePresenteeBtn").style.display = "none";
            document.getElementById("hideLeaveBtn").style.display = "none";
        }
    }


    return (
        <div className="w-100">
            <div className="my-2 w-100 p-3">
                <div className="topPart w-100 d-flex justify-content-between align-items-center px-3" style={{ height: "80px",backgroundColor:"bisque" }}>
                    <div><img src="./medxpert.png" alt="logo" width="150px" height="auto" /></div>
                    <Link to="/LeaveApplicationPage"><button type="button" className="btn btn-sm btn-success">Leave</button></Link>
                </div>
                <div className="middlePart mx-auto my-2 d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                    <div><h4>Employee Name : {EmpData.Username}</h4>
                        <p>Employee ID : {EmpData.UserID}</p>
                    </div>
                    {/* <div className="fw-bold fs-4">{new Date().toLocaleDateString()}</div> */}

                    <div><span>Select Month:</span>
                        <select  onChange={ViewMonthlyAttencence}>
                            <option value="">Select Month</option>
                            <option value="01">January</option>
                            <option value="02">Feb</option>
                            <option value="03">Mar</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">Octomber</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
                <div className="bottomPart d-flex flex-column justify-content-center align-items-center">
                    <div className="fw-bold fs-4">
                        <DatePicker className="text-center"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            includeDates={[new Date()]}
                            placeholderText="Present Day"
                        /></div>
                    <div className="w-75 my-5 mx-auto d-flex flex-wrap justify-content-start align-items-center" style={{ boxShadow: "5px 5px 15px 5px grey" }}>
                        {monthlyPresentee.map((ele, ind) => {
                            return (
                                <div key={ind} className="d-flex flex-column m-2"><span className="p-0 text-center">{ele.date}</span>
                                    {ele.leave?<input type="checkbox"  checked={ele.leave}  disabled/>:<input type="checkbox" checked={ele.status} readOnly />}
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-50 mx-auto my-2 d-flex justify-content-between align-items-center">
                        <button type="button" id="hidePresenteeBtn" className="btn btn-sm m-1 text-white btn-success" onClick={AddPresentee} style={{ width: "120px" }}>Present</button>
                        <Link to="/LeaveApplicationPage" className="btn m-1 btn-sm text-white btn-info" id="hideLeaveBtn" style={{ width: "120px" }}>Absent</Link>
                    </div>
                    <div className="w-25 mx-auto my-5 d-flex justify-content-center align-items-center">
                        <Link to="/HomePage" className="btn btn-sm text-white btn-info" style={{ width: "120px" }}>go to Home</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AttendenceAccountPage;

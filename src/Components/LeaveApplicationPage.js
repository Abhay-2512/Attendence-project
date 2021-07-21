import React, { useState, useEffect } from 'react';
import { useHistory,Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function LeaveApplicationPage() {
    const [startDate, setStartDate] = useState(null);
    const [Attendence, setAttendence] = useState({});
    const [AllData, setAllData] = useState([]);
    const [monthlyPresentee, setMonthlyPresentee] = useState([]);
    const [startDate01, setStartDate01] = useState(null);
    const history = useHistory();
    let currMonth = new Date().getMonth();
    const addData = "0" + (currMonth + 1);
    let LeaveFrom = Number(new Date(startDate).getDate());
    let LeaveTo = Number(new Date(startDate01).getDate());

    useEffect(() => {
        axios.get("http://localhost:3007/medxpertEmpDetails").then(res => {
            // console.log(res.data)
            let monthly = res.data[0];
            setAllData(monthly)
            setAttendence(monthly.Attendencee)
            setMonthlyPresentee(monthly.Attendencee[addData])
            // console.log(monthly.Attendencee[viewmonth]);
        })
    }, [addData])
    const SubmitLeave = () => {
        let i, mergeAttendence;
        let newOne = [...monthlyPresentee];
        for (i = LeaveFrom; i <= LeaveTo; i++) {
            newOne.splice(i - 1, 1, { "date": i, "status": false, "leave": true })
            setMonthlyPresentee(newOne)
            mergeAttendence = { ...Attendence, "07": newOne }
            console.log(mergeAttendence)

        }
        console.log(i)
        if (i === LeaveTo + 1) {
            axios.put(`http://localhost:3007/medxpertEmpDetails/${1}`, { ...AllData, "Attendencee": mergeAttendence }).then((res) => {
                console.log(res.data)
            })
            history.push("/AttendenceAccountPage")
        }

    }

    return (
        <div className="w-100">
            <div className="mx-auto" style={{ width: "90%" }}>
                <h1 className="text-center my-5">Leave Application</h1>
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div className="text-center">
                        <p>Start Date:</p>
                        <div className="p-2">
                            <DatePicker className="text-center"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="FROM"
                                minDate={new Date()}
                                showDisabledMonthNavigation
                            />
                        </div>
                    </div>
                    <div className="border border-1 py-3 px-4">
                        {(LeaveTo - LeaveFrom) + 1}
                    </div>
                    <div className="text-center">
                        <p>To Date:</p>
                        <div className="p-2">
                            <DatePicker className="text-center"
                                selected={startDate01}
                                onChange={(date) => setStartDate01(date)}
                                placeholderText="TO"
                                minDate={new Date()}
                                showDisabledMonthNavigation
                            />
                        </div>
                    </div>
                </div>
                <div className="my-5 text-center w-75 mx-auto">
                    <span className="fs-5">Subject</span> : <input type="text" className="w-75" />
                </div>
                <div className="my-5 text-center w-100 mx-auto">
                    <textarea className="w-100" placeholder="body of the application-letter"></textarea>
                    <input type="submit" value="submit" onClick={SubmitLeave} className="btn btn-success btn-sm my-5 mx-auto" style={{ width: "120px" }} />
                </div>
            </div>
            <div className="w-25 mx-auto my-5 d-flex justify-content-center align-items-center">
                <Link to="/HomePage" className="btn btn-sm text-white btn-info" style={{ width: "120px" }}>go to Home</Link>
            </div>
        </div>
    )
}

export default LeaveApplicationPage

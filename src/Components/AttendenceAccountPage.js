import React from 'react'

function AttendenceAccountPage() {
    return (
        <div className="w-100">
        <div className="my-2 w-100">
            <div className="topPart w-100 d-flex justify-content-between align-items-center" style={{height:"80px"}}>
                <div><img src="" alt="logo" width="150px" height="60px" /></div>
                <div><button type="button" className="btn btn-sm btn-success" >Leave</button></div>
            </div>
            <div className="middlePart mx-auto my-2 d-flex justify-content-between align-items-center" style={{width:"90%"}}>
            <div><h4>Employee Name : xxxxxx</h4>
                <p>Employee ID : yyyyy</p>
            </div>
            <div>Select Month: xx/yy/yyyy</div>
            </div>
            <div className="bottomPart d-flex flex-column justify-content-between align-items-center">
            <div className="w-75 my-5 mx-auto d-flex flex-wrap justify-content-start align-items-center">
            <input type="checkbox" className="m-2" />
            <input type="checkbox" className="m-2" />
            <input type="checkbox" className="m-2" />
            <input type="checkbox" className="m-2" />
            <input type="checkbox" className="m-2" />
            <input type="checkbox" className="m-2" />
            
            </div>
            <div className="w-25 mx-auto my-2 text-center">
                <button type="button" className="btn btn-sm btn-success" style={{width:"120px"}}>Present</button>
            </div>
            </div>
        </div>
            
        </div>
    )
}

export default AttendenceAccountPage

import React from 'react'

function LeaveApplicationPage() {
    return (
        <div className="w-100">
            <div className="mx-auto" style={{width:"90%"}}>
                <h1 className="text-center my-5">Leave Application</h1>
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div className="text-center">
                        <p>Start Date:</p>
                        <div className="border border-3 p-2 border-dark">12/12/1212</div>
                    </div>
                    <div className="border border-3 py-3 px-4 border-dark">2</div>
                    <div className="text-center">
                        <p>To Date:</p>
                        <div className="border border-3 p-2 border-dark">12/12/1212</div>
                    </div>
                </div>
                <div className="my-5 text-center">
                    <span className="fs-5">Subject</span> : <input type="text" className="w-75" />
                </div>
                <div className="my-5 text-center">
                    <textarea className="w-100" placeholder="body of the application-letter"></textarea>
                    <input type="submit" value="submit" className="btn btn-success btn-sm my-5 mx-auto" style={{width:"120px"}} />
                </div>
            </div>
        </div>
    )
}

export default LeaveApplicationPage

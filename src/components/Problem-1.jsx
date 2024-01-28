import React, {useState} from 'react';
import ErrorComponent from './ErrorComponent';

const Problem1 = () => {

    const [show, setShow] = useState("All");
    const [taskData, setTaskData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')

    
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value.trim();
        const status = form.status.value.trim();

        if (name === '' || status === '') {
            setErrorMessage('Input field(s) cannot be empty!');
            return;
        }
        setTaskData([...taskData, { name, status}]);
        form.reset;
        setErrorMessage('')
    };
    
    const filterTask = () => {
        if (show === "All") return taskData.sort((taskA, taskB) => {
            const order = { 'Active': 1, 'Completed': 2 };
            if (taskA.status === taskB.status) {
                return 0;
            }
            return (order[taskA.status] || 3) - (order[taskB.status] || 3);
        });
        else return taskData.filter((task) => task.status === show);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center justify-content-center mb-4">
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" name='name'/>
                        </div>
                        <div className="col-auto">
                            <select className="form-select form-control" name="status">
                                <option value="" disabled selected>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="Archive">Archive</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    { errorMessage && <ErrorComponent message={errorMessage}/>}
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`btn ${show==='All' ? 'btn-info' : ''}`} type="button" onClick={()=>setShow('All')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`btn ${show==='Active' ? 'btn-info' : ''}`} type="button" onClick={()=>setShow('Active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`btn ${show==='Completed' ? 'btn-info' : ''}`} type="button" onClick={()=>setShow('Completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            filterTask().map((task, taskIdx) => (
                                <tr key={taskIdx}>
                                    <td scope="col">{ task.name }</td>
                                    <td scope="col">{ task.status }</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
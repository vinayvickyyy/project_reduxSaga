import React, { useEffect } from 'react';
import { Button, Table, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiTypes } from '../../../redux/action_types/api_types';
import ModalAdd from "../../../Shared/ModalAdd";
function Dashboard() {
    const apiReduxData = useSelector((state) => state.FetchData.userList);
    // console.log("list", apiReduxData);
    // const list = apiReduxData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getData = () => {
        dispatch({
            type: ApiTypes.API_REQUEST,

        })
    }

    // <Button onClick={getData}>fetch</Button>

    useEffect(() => {
        getData();
    }

        , [])


    const deleteFn = (each) => {
        const list = [...apiReduxData]
        // const newList = list.filter(user => user.id !== each.id);

        let getIndex = list.indexOf(each);
        console.log("getIndex", getIndex)
        list.splice(getIndex, 1);
        console.log(list)
        dispatch({
            type: ApiTypes.DELETE_REQUEST,
            payload: list,
            // callback: () => {
            //     navigate('/dashboard')
            // // }
        })

    }


    // const [show, setShow] = usestate(false)

    // const handleShow = () => {
    //     setShow(true)
    // }

    // const handleClose = () => {
    //     setShow(false)
    // }

    // const editFn = (each) => {
    //     setShow()

    // }






    return (
        <div>
            <ModalAdd   buttonname="Add" title="Add Users" buttoncolor="success" />
            <Table>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        apiReduxData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.email}</td>
                                    {/* <td><Button variant='primary' onClick={() => editFn(data)}>Edit</Button></td> */}
                                    <td><ModalAdd  buttonname={"edit"} title={"Edit Users"} buttoncolor={"primary"} /></td>
                                    <td><Button variant='danger' onClick={() => deleteFn(data)}>Delete</Button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            this is Dashboard page
            <Button variant="primary">Logout</Button>
        </div>
    )
}
export default Dashboard;
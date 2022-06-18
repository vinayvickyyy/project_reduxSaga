import { list } from 'postcss';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ApiTypes } from '../../../redux/action_types/api_types';
// import ModalAdd from "../../../Shared/ModalAdd";
function Dashboard() {
    const apiReduxData = useSelector((state) => state.FetchData.userList);
    // console.log("list", apiReduxData);
    // const list = apiReduxData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        const obj = {
            profile: '',
            first_name: '',
            last_name: '',
            email: '',
        }
        setIsAdd(true)
        setState({ ...state, login: obj })
        setShow(true);
    }


    const getData = () => {
        dispatch({
            type: ApiTypes.API_REQUEST,

        })
    }



    useEffect(() => {
        getData();
    }

        , [])


    const [isAdd, setIsAdd] = useState(false);


    const editFn = (data) => {
        setIsAdd(false)
        setShow(true)

        const login = data;
        setState({ ...state, login: login })

    }






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







    const [state, setState] = useState({
        login: {
            avatar: '',
            first_name: '',
            last_name: '',
            email: '',
        },
        errors: {

            first_nameError: false,
            last_nameError: false,
            emailError: false,
            first_nameMessage: '',
            last_nameMessage: '',
            emailMessage: '',

        }
    })

    const { login } = state
    const handleLogin = (e) => {
        login[e.target.name] = e.target.value;
        setState({ ...state, login: login })

    }


    console.log("login", login);
    const submitFn = (e) => {
        if (isAdd) {


            e.preventDefault();
            const { errors } = state;
            const { login } = state;


            //validation for firstname
            if (!login.first_name) {
                errors.first_nameError = true;
                errors.first_nameMessage = "please enter firstname";
            }
            else {
                errors.first_nameError = false;
                errors.first_nameMessage = "";
            }
            //validation for secondname
            if (!login.last_name) {
                errors.last_nameError = true;
                errors.last_nameMessage = "please enter lastname";
            }
            else {
                errors.last_nameError = false;
                errors.last_nameMessage = "";
            }
            //validation for email
            if (!login.email) {
                errors.email_nameError = true;
                errors.email_nameMessage = "please enter email";
            }
            else if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(login.email))) {
                errors.email_nameError = true;
                errors.email_nameMessage = "please enter valid email";
            }
            else {
                errors.email_nameError = false;
                errors.email_nameMessage = " ";
            }

            // setState({ ...state, errors: errors })
            if (login.first_name && login.last_name && login.email && !errors.first_nameError && !errors.last_nameError && !errors.email_nameError) {
                dispatch({
                    type: ApiTypes.POST_REQUEST,
                    payload: login,
                    callback: () => {
                        // const obj = {
                        //     first_name: '',
                        //     last_name: '',
                        //     email: '',

                        // }
                        // setState({ ...state, login: obj })
                        navigate('/dashboard');
                    }


                });
                setState({ ...state, errors: errors });
            }

            handleClose(true);

        }

        else {
            const { errors } = state;
            if (login.first_name && login.last_name && login.email && !errors.first_nameError && !errors.last_nameError && !errors.email_nameError) {

                const { login } = state;

                const list = [...apiReduxData]

                const getIndex = list.findIndex((each) => each.id === login.id)
                // console.log("each", data)

                list[getIndex] = login;
                dispatch({

                    type: ApiTypes.EDIT_REQUEST,
                    payload: list,

                })

                setState({ ...state, errors: errors })
            }

            handleClose(true);

        }




    }













    return (
        <div>

            <Button variant="primary" onClick={handleShow}>
                ADD DETAILS
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Profile</th>
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
                                    <td><img src={data.avatar} alt="profiles" /></td>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.email}</td>

                                    <td><Button variant='primary' onClick={() => editFn(data)}>Edit</Button></td>
                                    <td><Button variant='danger' onClick={() => deleteFn(data)}>Delete</Button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>







            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isAdd ? "ADD" : "EDIT"}  DETAILS</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Profile</Form.Label>
                            <Form.Control
                                type="file" placeholder="name@example.com" name="avatar" autoFocus value={login.profile} onChange={handleLogin}
                            />

                        </Form.Group>


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="enter firstname" name="first_name" autoFocus value={login.first_name} onChange={handleLogin}

                            />
                            {
                                state.errors.first_nameError &&
                                <div className="main">{state.errors.first_nameMessage}</div>
                            }

                        </Form.Group>
                        {
                            (!login.first_name && state.errors.first_nameError) &&
                            <div>{state.errors.first_nameMessage}</div>
                        }
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="enter lastname" name="last_name" autoFocus value={login.last_name} onChange={handleLogin}
                            />
                            {
                                state.errors.last_nameError &&
                                <div className="main">{state.errors.last_nameMessage}</div>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text" placeholder="name@example.com" name="email" autoFocus value={login.email} onChange={handleLogin}
                            />
                            {
                                state.errors.email_nameError &&
                                <div className="main">{state.errors.email_nameMessage}</div>
                            }
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitFn}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>







        </div >
    )
}
export default Dashboard;
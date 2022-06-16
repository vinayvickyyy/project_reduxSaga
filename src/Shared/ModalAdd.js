import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { ApiTypes } from "../redux/action_types/api_types";

// import {EMAIL_REGEX} from "../Shared/Constant";
function ModalAdd(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, setState] = useState({
        login: {
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
        if (login.first_name && login.last_name && login.email) {
            dispatch({
                type: ApiTypes.POST_REQUEST,
                payload: login,
                callback: () => {
                    const obj = {
                        first_name: '',
                        last_name: '',
                        email: '',

                    }
                    setState({ ...state, login: obj })
                    navigate('/dashboard');
                }
            })
            handleClose(true)

        }
        setState({ ...state, errors: errors });
    }







    return (

        <>



            <Button variant={props.buttoncolor} onClick={handleShow}>
                {props.buttonname}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
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
                        {/* {
                            (!login.first_name &&  state.errors.first_nameError) &&
                            <div>{state.errors.first_nameMessage}</div>
                        } */}
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
        </>
    );
}

export default ModalAdd;
import React from 'react';
import { useMemo, useState, useContext } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
// import MyVerticallyCenteredModal from './notification';
import { requestOtpUrl, validateOtpUrl } from '../env/configuration.jsx'
import axios from 'axios';
import { AppContext } from '../App.js'
import Modal from 'react-bootstrap/Modal';



let otp = ''
let userName = ''

function LoginForm() {

    const [cartItems, setCartItems, menuItems, setMenuItems, wishList, setWishList, loggedInUser, setLoggedInUser, renderer, setRenderer] = useContext(AppContext);

    const [loginMessage, setLoginMessage] = useState('');

    const [loginBtnText, setLoginBtnText] = useState('Generate OTP');

    const [modalShow, setModalShow] = React.useState(false);

    const closeLoginForm = () => {
        const object = document.getElementById('email-input')
        if (object)
            object.value = null;
        let objects = document.getElementsByClassName('otp')
        if (objects)
            Array.from(objects).forEach(obj => obj.value = null)
        objects = document.getElementsByClassName('otp-input')
        if (objects)
            Array.from(objects).forEach(obj => obj.style.display = 'none')


        const e = document.getElementById('login-form')
        if (e) {
            if (e.style.display != 'none')
                e.style.display = 'none'
        }
    }

    const requestOtpService = async () => {
        let status;
        let params = new FormData();
        params.append('username', userName)
        await axios.post(requestOtpUrl, params)
            .then(response => status = response.status)
            .catch(e => console.log(e))
        return status;
    }

    const validateOtpService = async (otp) => {
        let status;
        let params = new FormData();
        params.append('username', userName)
        params.append('otp', otp)
        console.log('userName', userName);

        await axios.post(validateOtpUrl, params)
            .then(response => status = response.status)
            .catch(e => console.log(e))
        return status;
    }


    const handleLoginEvent = () => {

        const f = document.getElementsByName('spinner')
        const userNameEntered = document.getElementById('email-input').value
        if (userNameEntered === '') {
            f[0].id = null
            f[0].className = 'login-progress fa fa-hourglass-half invisible'
            setLoginMessage('Please enter your email address')
        }
        else {
            f[0].id = 'rotate'
            f[0].className = 'login-progress fa fa-hourglass-half visible'

            requestOtpService(userNameEntered).then(status => {
                if (status == 202) {
                    const e = document.getElementsByClassName('otp')
                    if (e) {
                        if (e[0].style.display == 'none' || !(e[0].style.display)) {
                            e[0].style.display = 'grid'
                            e[1].style.display = 'block'
                            e[2].style.display = 'block'
                            setLoginBtnText('Resend OTP')
                            document.getElementById('otp-input-1').focus()
                            setLoginMessage('')
                        }
                        f[0].id = null
                        f[0].className = 'login-progress fa fa-hourglass-half invisible'
                    }
                }
                else {
                    f[0].id = null
                    setLoginMessage('Please a valid email address')
                }
            })
        }


    }

    const validateEmail = (e) => {
        let value = e.target.value
        userName = e.target.value
        const pattern = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
        if (!value.match(pattern))
            setLoginMessage('Please enter a valid email address!!')
        else
            setLoginMessage('')
    }


    const handleSubmitOtp = () => {

        const otpDigit1 = document.getElementById('otp-input-1')
        const otpDigit2 = document.getElementById('otp-input-2')
        const otpDigit3 = document.getElementById('otp-input-3')
        const otpDigit4 = document.getElementById('otp-input-4')

        if (otpDigit1.value && otpDigit2.value && otpDigit3.value && otpDigit4.value) {
            otp = otpDigit1.value + otpDigit2.value + otpDigit3.value + otpDigit4.value
            setLoginMessage('')
            validateOtpService(otp).then(status => {
                if (status == 202) {
                    setLoginMessage('Login successful!')
                    localStorage.setItem('user', userName)
                    setLoggedInUser(userName)
                    setTimeout(() => {
                        closeLoginForm()
                    }, 400);
                }
                else {
                    setLoginMessage('Invalid OTP! Please Try Again!')
                }
            })
        }
        else {
            setLoginMessage('Please enter valid otp!')
            otpDigit1.focus()
        }
    }


    const displayModal = () => {
        setModalShow(true)
        setTimeout(() => {
            setModalShow(false)
        }, 1000);
    }



    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                        <MDBCardBody className='p-4 w-100 d-flex flex-column'>

                            <h2 className='fw-bold mb-2 text-center'>Sign in</h2>
                            <p className='text-50 mb-1 mt-4 ' style={{ color: 'red' }}>{loginMessage}</p>

                            <label htmlFor='email-input'>Enter email address</label>
                            <input id='email-input' className='email-input mb-1 mt-1 p-1 w-100' onKeyDown={e => (e.key == 'Enter' && loginMessage === '') ? document.getElementById('login-btn').focus() : null} onInput={e => validateEmail(e)} type='email' />


                            <div className='otp otp-container' id='otp-container'>
                                <input type='number' maxLength={1} onFocus={e => e.target.value = null} onInput={e => document.getElementById('otp-input-2').focus()} className='otp-input' id='otp-input-1' />
                                <input type='number' maxLength={1} onFocus={e => e.target.value = null} onInput={e => document.getElementById('otp-input-3').focus()} className='otp-input' id='otp-input-2' />
                                <input type='number' maxLength={1} onFocus={e => e.target.value = null} onInput={e => document.getElementById('otp-input-4').focus()} className='otp-input' id='otp-input-3' />
                                <input type='number' maxLength={1} onFocus={e => e.target.value = null} onInput={e => document.getElementById('otp-submit-btn').focus()} className='otp-input' id='otp-input-4' />
                            </div>

                            <center>
                                <h5 className='otp' style={{ color: 'red', display: 'none' }}>ENTER OTP</h5>
                            </center>

                            <div className='button-container '>
                                <button onClick={e => handleLoginEvent()} className='btn btn-primary login-btn mt-3' id='login-btn'>
                                    {loginBtnText}
                                    <i className='login-progress invisible fa fa-hourglass-half' name='spinner' ></i>
                                </button>
                                <button onClick={e => handleSubmitOtp()} style={{ display: 'none' }} className='otp btn btn-primary otp-submit-btn mt-3' id='otp-submit-btn'>
                                    Submit OTP
                                    <i className='login-progress invisible fa fa-hourglass-half' name='spinner' ></i>
                                </button>
                            </div>

                            <hr className='my-5' />

                            <button onClick={() => displayModal()} className='mb-2 w-100 btn btn-secondary' style={{ backgroundColor: '#dd4b39' }}>
                                <i className='fa fa-google'>&nbsp;&nbsp;Sign in with google</i>
                            </button>
                            <button onClick={() => displayModal()} className='mb-4 w-100 btn btn-secondary' style={{ backgroundColor: '#3b5998' }}>
                                <i className='fa fa-facebook'>&nbsp;&nbsp;Sign in with facebook</i>
                            </button>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                message={'This feature will be available soon!!'}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                fullscreen='sm-down'
                keyboard
            />

        </MDBContainer>
    );
}

export default LoginForm;

const MyVerticallyCenteredModal = (props) => {
    return (
        <Modal
            {...props}

        >
            <Modal.Body>
                {props.message || ``}
            </Modal.Body>
        </Modal>
    );
}

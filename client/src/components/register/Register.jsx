import { useState, useRef } from 'react';
import './Register.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Cancel from '@material-ui/icons/Cancel';
import { axiosInstance } from '../../config';

function Register({ setShowRegister }) {
    const [sucess, setSucess] = useState(false);
    const [error, setError] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            await axiosInstance.post('/users/register', user);
            setError(false);
            setSucess(true);
        } catch (err) {
            setError(true);
        }
    }
    return (
        <div className="container">
            <div className="logo">
                <LocationOnIcon />
                awais.fullstack
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="email" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button type='submit' className='registerButton'>Register</button>
            </form>
            {sucess &&
                <span className='success'>You can login now!</span>
            }
            {error &&
                <span className='error'>Something went wrong!</span>
            }
            <Cancel className='cancel' onClick={() => setShowRegister(false)} />
        </div>
    );
}

export default Register;
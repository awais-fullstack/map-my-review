import { useState, useRef } from "react";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Cancel from "@material-ui/icons/Cancel";
import { axiosInstance } from "../../config";
import Styles from './Login.module.css';
function Login({ setShowLogin, myStorage, setCurrentUser }) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        try {
            const res = await axiosInstance.post('/users/login', loginData);
            myStorage.setItem('user', res.data.username);
            setCurrentUser(res.data.username);
            setError(false);
            setShowLogin(false)
        } catch (err) {
            setError(true);
        }

    }
    return (
        <div className={Styles.container}>
            <div className={Styles.logo}>
                <LocationOnIcon />
                awais.fullstack
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter username" ref={usernameRef} />
                <input type="password" placeholder="Enter password" ref={passwordRef} />
                <button className={Styles.button}>Login</button>
            </form>
            {error &&
                <span className={Styles.error}>Something went wrong!</span>
            }
            <Cancel className={Styles.cancel} onClick={() => setShowLogin(false)} />
        </div>
    )
}

export default Login;
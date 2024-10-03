import { useState } from 'react';
import Register from '../register/Register';
import Login from '../login/Login';
import './Buttons.css';

function Buttons({ currentUser, setCurrentUser, myStorage }) {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const handleLogout = () => {
        myStorage.removeItem('user');
        setCurrentUser(null);
    }
    return (
        <>
            {currentUser ? (
                <button className='button logout' onClick={handleLogout}>Log Out</button>
            ) : (
                <div className='buttons'>
                    <button className='button login' onClick={() => setShowLogin(true)}>Login</button>
                    <button className='button register' onClick={() => setShowRegister(true)}>Register</button>
                </div>
            )}
            {showRegister && <Register setShowRegister={setShowRegister} />}
            {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
        </>
    )
}
export default Buttons;
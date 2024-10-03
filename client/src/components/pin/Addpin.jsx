import { useState } from 'react';
import { axiosInstance } from '../../config';
import './Addpin.css';

function Addpin({ setNewPin, setPins, pins, newPin, currentUser }) {
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pin = {
            username: currentUser,
            title,
            desc,
            rating,
            lat: newPin.lat,
            long: newPin.long
        }

        try {
            const res = await axiosInstance.post('/pins', pin);
            setPins([...pins, res.data]);
            setNewPin(null);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)} />
            <label>Review</label>
            <textarea placeholder='Say us something about this place' onChange={(e) => setDesc(e.target.value)} />
            <label>Rating</label>
            <select className='select' onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button className='submitbutton' type='submit'>Add Pin</button>
        </form>
    )
}

export default Addpin;
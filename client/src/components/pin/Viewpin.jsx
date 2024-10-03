import Star from '@material-ui/icons/Star';
import { format } from 'timeago.js';
import './Viewpin.css';

function Viewpin({ pin }) {
    return (
        <div className='card'>
            <label>Place</label>
            <h4>{pin.title}</h4>
            <label>Review</label>
            <p className='desc'>{pin.desc}</p>
            <label>Rating</label>
            <div className='stars'>
                {Array(pin.rating).fill().map((_, index) => (<Star key={index} className='star' />))}

            </div>
            <label>Information</label>
            <span className='username'>Created by <b>{pin.username}</b></span>
            <span className='date'>{format(pin.createdAt)}</span>
        </div>
    );
}

export default Viewpin;
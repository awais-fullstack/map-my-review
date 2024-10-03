import { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { axiosInstance } from '../config';
import Viewpin from './pin/Viewpin';
import Addpin from './pin/Addpin';
import Buttons from './auth/Buttons';

function Mapbox() {
    const myStorage = window.localStorage;
    const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'));
    const [pins, setPins] = useState([]);
    const [currentPinId, setCurrentPinId] = useState(null);
    const [newPin, setNewPin] = useState(null);

    const [mapState, setMapState] = useState({
        longitude: 4.3517,
        latitude: 50.8503,
        zoom: 12
    });

    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axiosInstance.get('/pins');
                setPins(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getPins();
    }, []);

    const handleMarkerClick = (pinId, lat, long) => {
        setCurrentPinId(pinId);
        setMapState({ ...mapState, latitude: lat, longitude: long });
    }

    const handleAddClick = (e) => {
        const { lng, lat } = e.lngLat;
        setNewPin({
            lat,
            long: lng
        });
    }

    return (
        <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            {...mapState}
            style={{ height: "100vh", width: "100vw" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onDblClick={handleAddClick}
            onMove={(event) => setMapState(event.viewState)}
            transitionDuration="2000"
        >
            {pins.map(p => (
                <div key={p._id}>
                    <Marker longitude={p.long} latitude={p.lat}>
                        <LocationOnIcon onClick={() => handleMarkerClick(p._id, p.lat, p.long)} style={{ fontSize: 40, color: "slateblue", cursor: "pointer", color: p.username == currentUser ? "tomato" : "slateblue" }} />
                    </Marker>
                    {p._id == currentPinId &&
                        < Popup
                            longitude={p.long}
                            latitude={p.lat}
                            closeButton={true}
                            closeOnClick={false}
                            anchor="left"
                            onClose={() => setCurrentPinId(null)}
                        >
                            <Viewpin key={p._id} pin={p} />
                        </Popup >
                    }
                </div>
            ))}
            {newPin && currentUser &&
                < Popup
                    longitude={newPin.long}
                    latitude={newPin.lat}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="left"
                    onClose={() => setNewPin(null)}
                >
                    <Addpin currentUser={currentUser} pins={pins} newPin={newPin} setNewPin={setNewPin} setPins={setPins} />
                </Popup>
            }
            <Buttons currentUser={currentUser} setCurrentUser={setCurrentUser} myStorage={myStorage} />
        </Map>
    )
}

export default Mapbox;
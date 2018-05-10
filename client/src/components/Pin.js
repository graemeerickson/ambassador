import L from 'leaflet';

const Pin = L.Icon.extend({
  options: {
    // iconUrl: require('../img/marker-pin-person.svg'),
    iconUrl: require('../ambassador-logo.png'),
    iconRetinaUrl: require('../ambassador-logo.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
  }
});

export default Pin;
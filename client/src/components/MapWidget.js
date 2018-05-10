import React, {Component} from 'react';
import ReactMapboxGL, { Layer, Feature, Popup, Cluster }  from 'react-mapbox-gl';
import mapMarkerIcon from '../marker-icon.svg';
const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOXAPI_KEY;

const Map = ReactMapboxGL({ accessToken: `${MAPBOX_API_KEY}` });

class MapWidget extends Component {
  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "500px",
          width: "500px"
        }}
        center={[-122.338743, 47.608635]}
        zoom={[15]} >
          <Layer
            type="symbol"
            id="marker"
            // layout={{ "icon-image": "marker-15" }}
            layout={{ "icon-image": `${mapMarkerIcon}` }}>
            <Feature coordinates={[-122.338743, 47.608635]}/>
          </Layer>
          <Popup
            coordinates={[-122.338743, 47.608635]}
            offset={{
              'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}>
            <span>Ambassador</span>
          </Popup>
      </Map>
    );
  }
}

export default MapWidget;
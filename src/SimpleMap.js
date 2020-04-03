import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from './CustomMarker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.310519,
            lng: 18.057875
        },
        zoom: 10
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDSVpAgrUGOtfXydlsEnlDKSES8XFwDEsM' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <MyGreatPlace
                        lat={59.310519}
                        lng={18.057875}
                        text="Södersjukhuset"
                    />

                    <MyGreatPlace
                        lat={59.334785}
                        lng={18.021060}
                        text="St Görans"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;

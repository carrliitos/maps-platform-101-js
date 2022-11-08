/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@google/markerclustererplus';

const apiOptions = {
    apiKey: 'YOUR_API_KEY'
}

const loader = new Loader(apiOptions)

loader.load().then(() => {
    console.log('Maps JS API loaded!');
    const map = displayMap();
    const markers = addMarkers(map);
    clusterMarkers(map, markers);
    addPanToMarker(map, markers);
});

function displayMap() {
    const mapOptions = {
        center: { lat: 42.84203828242407, lng: -88.7460243680774 },
        zoom: 16,
        mapId: 'a16375218b455c8'
    };

    const mapDiv = document.getElementById('map');
    return new google.maps.Map(mapDiv, mapOptions);
}

function addMarkers(map) {
    const locations = {
        starin_park: { lat: 42.841322407055195, lng: -88.73802065680172 },
        uww_bookstore: { lat: 42.84033118131235, lng: -88.7413251381327 },
        esker_dining_hall: { lat: 42.84349360787637, lng: -88.74149679950054 },
        williams_center: { lat: 42.8434621417427, lng: -88.74535918027699 },
        warhawk_athletic_fields: { lat: 42.84448478288321, lng: -88.74965071447308 },
        whitewater_water_department: { lat:42.8404727859635, lng: -88.73396515698643 },
        lawcon_picnic_shelter: { lat: 42.84542874429562, lng: -88.73675465421388 },
        heide_hall: { lat: 42.83738887791333, lng: -88.740981815397 },
        winther_hall: { lat: 42.83847455697568, lng: -88.74138951114563 },
        foster_track: { lat: 42.846294029608124, lng: -88.74922156103749 },
        fiskum_field: { lat: 42.84613670591141, lng: -88.74810576214652 },
        bigelow: { lat: 42.84237655033917, lng: -88.74756932037201 },
        lee: { lat: 42.84151121017779, lng: -88.74825596584337 },
        arey: { lat: 42.84045705215161, lng: -88.74823450817239 }
    }

    const markers = [];
    for (const location in locations) {
        const markerOptions = {
            map: map,
            position: locations[location],
            icon: './img/custom_pin.png'
        }
        const marker = new google.maps.Marker(markerOptions);
        markers.push(marker);
    }
    return markers;
}

function clusterMarkers(map, markers) {
    const clustererOptions = { imagePath: './img/m' }
    const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
}

function addPanToMarker(map, markers) {
    let circle;

    markers.map(marker => {
        marker.addListener('click', event => {
            const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
            map.panTo(location);

            if (circle) {
                circle.setMap(null);
            }
            circle = drawCircle(map, location);
        });
    });
}

function drawCircle(map, location) {
    const circleOptions = {
        strokeColor: '##FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        map: map,
        center: location,
        radius: 400
    }
    return new google.maps.Circle(circleOptions);
}

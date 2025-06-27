import React ,  { useEffect, useState } from "react";
import './map.scss';
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from "../pin/Pin";
import L from "leaflet"; 
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function Map( {items} ) {
// Fix default icon path

     
  return (
   <MapContainer center={ items.length === 1 ? [items[0].latitude , items[0].longitude]: [52.4797 , -1.90269] } zoom={6} scrollWheelZoom={true} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map((item) =>(
        <Pin item = {item} key = {item.id} />
    ))}
  </MapContainer>
  );
}

export default Map; 
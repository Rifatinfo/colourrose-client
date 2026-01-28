/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import SkeletonMapRoute from "./SkeletonMapRoute";

// Dynamic imports (client-side only)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });

interface Props {
    deliveryAddress: string;
    storeAddress: string;
}

const OrderLiveMap = ({ deliveryAddress, storeAddress }: Props) => {
    const [coords, setCoords] = useState<[number, number] | null>(null);
    const [storeCoords, setStoreCoords] = useState<[number, number] | null>(null);
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
    const [Leaflet, setLeaflet] = useState<any>(null);

    // Fetch coordinates from Nominatim
    const fetchCoords = async (addr: string) => {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}`
        );
        const data = await res.json();
        if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)] as [number, number];
        return null;
    };

    // Fetch route from OSRM
    const fetchRoute = async (start: [number, number], end: [number, number]) => {
        const res = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
            // OSRM returns [lon, lat], swap to [lat, lon] for Leaflet
            return data.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);
        }
        return [];
    };

    useEffect(() => {
        (async () => {
            const L = await import("leaflet");
            setLeaflet(L);

            const delivery = await fetchCoords(deliveryAddress);
            if (delivery) setCoords(delivery);

            const store = await fetchCoords(storeAddress);
            if (store) setStoreCoords(store);
        })();
    }, [deliveryAddress, storeAddress]);

    // Fetch route when both coordinates are ready
    useEffect(() => {
        if (coords && storeCoords) {
            const getRoute = async () => {
                const route = await fetchRoute(storeCoords, coords);
                setRouteCoords(route);
            };
            getRoute();
        }
    }, [coords, storeCoords]);

    if (!coords || !storeCoords || !Leaflet) return <SkeletonMapRoute />;

    const icon = new Leaflet.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const centerCoords: [number, number] = [
        (coords[0] + storeCoords[0]) / 2,
        (coords[1] + storeCoords[1]) / 2,
    ];

    return (
        <div style={{ width: "100%", height: "500px", marginTop: "20px" }}>
            <MapContainer  center={centerCoords} zoom={13} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={storeCoords} icon={icon} />
                <Marker position={coords} icon={icon} />
                {routeCoords.length > 0 && (
                    <Polyline positions={routeCoords} pathOptions={{ color: "red", weight: 4 }} />
                )}
            </MapContainer>
        </div>
    );
};

export default OrderLiveMap;

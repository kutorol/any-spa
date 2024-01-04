// import {YMaps, Map, Placemark, GeolocationControl, GeoObject} from '@pbe/react-yandex-maps'
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import axios from "axios";
// @ts-ignore
import React, { useEffect, useState } from "react";

async function getCityName(latitude, longitude, apiKey) {
  // https://docs.2gis.com/ru/mapgl/examples/react - ссылка на доку
  try {
    const response = await axios.get("https://catalog.api.2gis.com/3.0/items", {
      params: {
        key: `gYy1s9N1wP`,
        q: `geo:${longitude},${latitude}`
      }
    });

    console.log("response", response.data);
    const data = response.data;
    if (data.result && data.result.items && data.result.items.length > 0) {
      const city = data.result.items[0].address_name;
      return city;
    } else {
      return "Город не найден";
    }
  } catch(error) {
    console.error("Ошибка геокодирования:", error);
    return "Ошибка геокодирования";
  }
}

const YandexMap = ({}) => {

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // есть доступ
    if (navigator.geolocation) {
      console.log("DDDD", userLocation);
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        // сохраняем текущие координаты
        if (!userLocation) {
          setUserLocation([latitude, longitude]);

          getCityName(latitude, longitude, "YOUR_API_KEY")
            .then((cityName) => {
              console.log("Город:", cityName);
            });
        }
        console.log("latitude", latitude, "longitude", longitude);
      });
    }
  }, [userLocation]);

  return (
    <YMaps>
      <Map state={{ center: userLocation || [0, 0], zoom: 9 }}>
        {userLocation && <Placemark geometry={userLocation}/>}
      </Map>
    </YMaps>
    // <YMaps>
    //   <Map
    //     query={{
    //       ns: "use-load-option",
    //       load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
    //     }}
    //     defaultState={{
    //       center: [55.751574, 37.573856],
    //       zoom: 9,
    //       controls: ["zoomControl", "fullscreenControl"],
    //       // searchControlProvider: 'yandex#search'
    //     }}
    //     width={'100%'}
    //   >
    //     <Placemark
    //       defaultGeometry={[55.75, 37.57]}
    //       properties={{
    //         balloonContentBody:
    //           "This is balloon loaded by the Yandex.Maps API module system",
    //       }}
    //     />
    //   </Map>
    // </YMaps>
  );
};

export default YandexMap;
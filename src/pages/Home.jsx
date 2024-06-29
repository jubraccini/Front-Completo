import React, { useState, useEffect, useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { UserContext } from "../context/UserContext";

const containerStyle = {
  width: "100%",
  height: "100vh", // Adjusted height to fill viewport height
};

const API_URL = "https://denguealerta202401-production.up.railway.app/ws/foco";

const Home = () => {
  const { user } = useContext(UserContext);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: -28.2624, lng: -52.396032 });
  const [markers, setMarkers] = useState([]);
  const [newRegister, setNewRegister] = useState(false);
  const [formInput, setFormInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao consultar registros");
        }

        const data = await response.json();
        const newMarkerArray = data.map(({ latitude, longitude }) => ({
          lat: latitude,
          lng: longitude,
        }));
        setMarkers(newMarkerArray);
      } catch (error) {
        console.error("Erro ao consultar registros:", error.message);
        // Handle error, e.g., show a message to the user
      }
    };
    fetchMarkers();
  }, [user]);

  const handleMapClick = async (event) => {
    try {
      setLoading(true);

      const newMarker = {
        latitude: event.latLng.lat(),
        longitude: event.latLng.lng(),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(newMarker),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar foco");
      }

      const newMarkerData = await response.json();
      const updatedMarkers = [...markers, {
        lat: newMarkerData.latitude,
        lng: newMarkerData.longitude
      }];
      setMarkers(updatedMarkers);
    } catch (error) {
      console.error("Erro ao cadastrar foco:", error.message);
      // Handle error, e.g., show a message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (!formInput.trim()) {
        throw new Error("Por favor, preencha a descrição.");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ descricao: formInput }), // Assuming this is the correct field name
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar.");
      }

      const newMarkerData = await response.json();
      const updatedMarkers = [...markers, {
        lat: newMarkerData.latitude,
        lng: newMarkerData.longitude
      }];
      setMarkers(updatedMarkers);

      setNewRegister(false);
      setFormInput("");
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      // Handle error, e.g., show a message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserLocation = () => {
      const location = window.navigator && window.navigator.geolocation;
      if (location) {
        location.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            // Handle geolocation error
          }
        );
      }
    };

    fetchUserLocation();
  }, []);

  const onLoad = (map) => setMap(map);

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        {loadError ? (
          <div>Error loading Google Maps API script</div>
        ) : (
          <>
            {newRegister && (
              <div className="addMarkerDialog">
                <p className="mb-5">Cadastrar:</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="input mb-5"
                    name="descricao"
                    value={formInput}
                    onChange={(e) => setFormInput(e.target.value)}
                    required
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <button type="submit" className="btn mb-5" disabled={loading}>
                      {loading ? "Carregando..." : "Cadastrar"}
                    </button>
                    <a href="#" onClick={() => setNewRegister(false)}>
                      Fechar
                    </a>
                  </div>
                </form>
              </div>
            )}

            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                onLoad={onLoad}
                onUnmount={() => setMap(null)}
                onClick={handleMapClick}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={marker}
                    // Exemplo de uso de AdvancedMarkerElement:
                    // <google.maps.marker.AdvancedMarkerElement position={marker} />
                  />
                ))}
              </GoogleMap>

            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;

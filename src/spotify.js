import axios from "axios";
const authEndpoint="https://accounts.spotify.com/authorize?";

const clientId=import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri="http://localhost:5173/";
const scopes = [
  "user-library-read",
  "playlist-read-private",
  "user-modify-playback-state",
  "streaming",
  "user-read-playback-state" // Optional but can help with debugging playback status
];



export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
  
  
  const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  
export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
      config.headers.Authorization = "Bearer " + token;
      return config;
    });
};

export const getTracksByGenre = async (genre) => {
  try {
    const response = await apiClient.get("/recommendations", {
      params: { seed_genres: genre, limit: 10 }
    });
    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching tracks by genre:", error);
  }
};
  
export default apiClient;
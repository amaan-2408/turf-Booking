// Central place to set the backend base URL.
//
// Set VITE_API_URL in `front/.env` (or `front/.env.production`) to your
// backend's public origin. Vite exposes it on `import.meta.env` at build time.
//
//   Dev:    VITE_API_URL=http://localhost:5050
//   Prod:   VITE_API_URL=https://api.turfbook.com
//
// All other config derives from this single value, so swapping environments
// is a one-line change.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

// Endpoint root used for axios calls.
//Prodcuction
// const API_URL = `${API_BASE_URL}/api/v1`;
//test
const API_URL = "http://localhost:5050/api/v1"

// Base for files served by the backend's static middleware (turf images
// live at <UPLOAD_DIR>/turf_images/<name> → served at /turf_images/<name>).
const IMAGE_BASE_URL = API_BASE_URL;

export { API_URL, IMAGE_BASE_URL };

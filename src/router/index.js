import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

// Import your components
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import profile from "../views/ProfileView.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }, // Add meta field to require authentication
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add Axios interceptor to attach Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Use sessionStorage instead of localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Refresh token logic
        const response = await axios.post("/refreshToken", {
          refreshToken: sessionStorage.getItem("refreshToken"), // Use sessionStorage instead of localStorage
        });
        const newToken = response.data.token;
        sessionStorage.setItem("token", newToken); // Use sessionStorage instead of localStorage
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Redirect to login page if token refresh fails
        router.push("/login");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("token"); // Use sessionStorage to check token
  const tokenExpiration = sessionStorage.getItem("tokenExpiration"); // Use sessionStorage for token expiration

  console.log("Route:", to.path);
  console.log("Requires Auth:", to.meta.requiresAuth);
  console.log("Is Authenticated:", isAuthenticated);

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If not authenticated or token has expired, redirect to login page
    if (!isAuthenticated || new Date() > new Date(tokenExpiration)) {
      console.log(
        "User is not authenticated or token has expired. Redirecting to login page."
      );
      next("/login");
    } else {
      console.log(
        "User is authenticated and token is valid. Proceeding to requested route."
      );
      next();
    }
  } else {
    console.log(
      "Route does not require authentication. Proceeding to requested route."
    );
    next(); // Allow access to non-authenticated routes
  }
});

// Logout function to clear token and user information
export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tokenExpiration");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("nome");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("foto");
  router.push("/login");
}

export default router;

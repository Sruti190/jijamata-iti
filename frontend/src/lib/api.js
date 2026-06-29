import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const tokenKey = "jiti_admin_token";

export const auth = {
  get: () => localStorage.getItem(tokenKey),
  set: (t) => localStorage.setItem(tokenKey, t),
  clear: () => localStorage.removeItem(tokenKey),
};

const client = axios.create({ baseURL: API });
client.interceptors.request.use((cfg) => {
  const t = auth.get();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default client;

export const COURSES = [
  { name: "Electrician", icon: "fa-bolt", desc: "Installation, wiring, safety protocols & maintenance.", duration: "2 Years", seats: 24, img: "/trades/electrician.png" },
  { name: "Fitter", icon: "fa-screwdriver-wrench", desc: "Fitting components, assembly & precision toolwork.", duration: "2 Years", seats: 24, img: "/trades/fitter.png" },
  { name: "Welder", icon: "fa-fire-flame-curved", desc: "Arc, gas, MIG & TIG welding techniques.", duration: "2 Years", seats: 24, img: "/trades/welder.png" },
  { name: "COPA", icon: "fa-desktop", desc: "Computer Operator & Programming Assistant.", duration: "1 Year", seats: 24, img: "/trades/copa.png" },
  { name: "Turner", icon: "fa-gears", desc: "Lathe operations & metal turning craftsmanship.", duration: "2 Years", seats: 20, img: "/trades/turner.png" },
  { name: "Wireman", icon: "fa-plug-circle-bolt", desc: "Wiring of residential & industrial installations.", duration: "2 Years", seats: 20, img: "/trades/wireman.png" },
  { name: "Electronics Mechanic", icon: "fa-microchip", desc: "Repair & maintenance of electronic equipment.", duration: "2 Years", seats: 20, img: "/trades/electronics-mechanic.png" },
  { name: "Painter General", icon: "fa-paint-roller", desc: "Surface preparation, painting & finishing.", duration: "2 Years", seats: 20, img: "/trades/painter-general.png" },
];

export const STATUSES = ["New", "Contacted", "Approved", "Rejected"];

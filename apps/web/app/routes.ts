import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("demo", "routes/demo.tsx"),
  route("calculator", "routes/calculator.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;

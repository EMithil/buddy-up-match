import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserType from "./pages/UserType";
import Preferences from "./pages/Preferences";
import Profile from "./pages/Profile";
import HostRoom from "./pages/HostRoom";
import Rooms from "./pages/Rooms";
import Roommates from "./pages/Roommates";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import RoomDetails from "./pages/RoomDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-type" element={<UserType />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/host" element={<HostRoom />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

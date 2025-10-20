import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { LogoutOutlined } from "@ant-design/icons";
import { queryClient } from "../../api/query";
import { useAuthStore } from "../../store/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  async function handleLogout() {
    await supabase.auth.signOut();
    queryClient.clear();
    clearAuth();
    navigate("/login");
  }

  return (
    <nav className="bg-white/80 shadow-sm p-4 flex items-center justify-end relative z-10 poppins-regular">

      <Button type="default" danger icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
}

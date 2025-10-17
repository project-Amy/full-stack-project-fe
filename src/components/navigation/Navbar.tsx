import { Button } from "antd";

import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { LogoutOutlined } from "@ant-design/icons";
import { queryClient } from "../../api/query";

export default function Navbar() {
  const navigate = useNavigate();
  async function handleLogout() {
    await supabase.auth.signOut();
    queryClient.clear();
    navigate("/login");
  }

  return (
    <nav className="bg-white/80 shadow-sm p-4 flex items-center justify-between relative z-10 poppins-regular">
      <ul className="sm:text-lg">
        <li>Le tue Board</li>
      </ul>
      <Button type="default" danger icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
}

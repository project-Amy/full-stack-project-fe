import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="bg-red-500 text-2xl p-8">
      <div>Hello world</div>
      <Button onClick={handleLogout} type="primary" danger className="mt-4">
        Logout
      </Button>
    </div>
  );
}

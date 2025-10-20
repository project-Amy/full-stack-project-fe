import { useState } from "react";
import { Form, message, Layout, Card, Typography, Space } from "antd";
import SignForm from "../components/form/SignForm";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { AuthError } from "@supabase/supabase-js";
import { useAuthStore } from "../store/useAuthStore";
import type { LoginFormValues } from "../types/auth";
import Background from "../components/Background/Background";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      if (data.user) {
        setUser(values.email, data.user.id);
      }
      message.success("Login effettuato con successo!");
      navigate("/");
    } catch (error) {
      const authError = error as AuthError;
      if (authError.message?.includes("Invalid login credentials")) {
        message.error("Email o password non corretti");
      } else if (authError.message?.includes("Email not confirmed")) {
        message.error("Conferma la tua email prima di accedere");
      } else {
        message.error(authError.message || "Errore durante il login. Riprova.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="!min-h-screen relative !bg-transparent">
      <Background />
      <Content className="flex justify-center items-center p-6 !bg-transparent">
        <Card className="w-full max-w-md">
          <Space direction="vertical" size="large" className="w-full text-center">
            <div>
              <Title level={2}>Accedi</Title>
              <Paragraph type="secondary">Benvenuto! Inserisci le tue credenziali</Paragraph>
            </div>

            <SignForm type="login" onSubmit={handleLogin} loading={loading} formInstance={form} />
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}

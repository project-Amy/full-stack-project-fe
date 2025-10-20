import { useState } from "react";
import { Form, message, Layout, Card, Typography, Space } from "antd";
import SignForm from "../components/form/SignForm";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { AuthError } from "@supabase/supabase-js";
import { useAuthStore } from "../store/useAuthStore";
import type { RegisterFormValues } from "../types/auth";
import Background from "../components/Background/Background";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      if (data.user) {
        setUser(values.email, data.user.id);
      }
      message.success("Registrazione effettuata con successo!");
      navigate("/");
    } catch (error) {
      const authError = error as AuthError;
      if (authError.message?.includes("User already registered")) {
        message.error("Email già in uso");
      } else if (authError.message?.includes("Password should be at least")) {
        message.error("La password deve essere di almeno 6 caratteri");
      } else {
        message.error(authError.message || "Errore durante la registrazione. Riprova.");
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
              <Title level={2}>Registrati</Title>
              <Paragraph type="secondary">Crea un nuovo account per iniziare</Paragraph>
            </div>
            <SignForm type="register" onSubmit={handleRegister} loading={loading} formInstance={form} />
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}

import { Button, Input, Typography, Form } from "antd";
import type { FormInstance } from "antd";
import { useNavigate } from "react-router-dom";
import type { LoginFormValues, RegisterFormValues } from "../../types/auth";

interface SignFormProps<T extends LoginFormValues | RegisterFormValues> {
  type: "login" | "register";
  onSubmit: (values: T) => Promise<void>;
  loading: boolean;
  formInstance: FormInstance;
}

export default function SignForm<T extends LoginFormValues | RegisterFormValues>({ type, onSubmit, loading, formInstance }: SignFormProps<T>) {
  const navigate = useNavigate();

  const isRegister = type === "register";

  return (
    <Form form={formInstance} onFinish={onSubmit} layout="vertical" autoComplete="on" size="large">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Inserisci la tua email" },
          { type: "email", message: "Email non valida" },
        ]}
        hasFeedback
      >
        <Input type="email" placeholder="example@email.com" autoComplete="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Inserisci la tua password" },
          { min: 8, message: "La password deve essere di almeno 8 caratteri" },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" autoComplete={isRegister ? "new-password" : "current-password"} />
      </Form.Item>

      {isRegister && (
        <Form.Item
          label="Ripeti Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Ripeti la tua password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Le password non coincidono"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Ripeti Password" autoComplete="new-password" />
        </Form.Item>
      )}

      <Form.Item className="!mt-8 !mb-4">
        <Button type="primary" htmlType="submit" className="w-full" loading={loading} disabled={loading}>
          {loading ? "Caricamento..." : isRegister ? "Registrati" : "Accedi"}
        </Button>
      </Form.Item>

      <Typography.Text type="secondary" className="text-sm">
        {isRegister ? "Hai già un account?" : "Non hai un account?"}{" "}
        <Button
          onClick={() => navigate(isRegister ? "/login" : "/register")}
          type="link"
          className="!p-0 !h-auto text-sm "
        >
          {isRegister ? "Accedi" : "Registrati"}
        </Button>
      </Typography.Text>
    </Form>
  );
}

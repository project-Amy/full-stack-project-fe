import "./AuthBackground.css";

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-200 via-gray-100 to-green-200">
      <div className="auth-pattern-primary" />
      <div className="auth-pattern-secondary" />
    </div>
  );
}

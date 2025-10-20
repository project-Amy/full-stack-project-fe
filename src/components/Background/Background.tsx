import "./Background.css";

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <div className="auth-pattern-primary" />
      <div className="auth-pattern-secondary" />
    </div>
  );
}

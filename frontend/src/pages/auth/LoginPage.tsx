import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";
import AuroraBackground from "../../components/ui/AuroraBackground";

export default function LoginPage() {
  return (
    <AuroraBackground>
      <div className="flex min-h-screen items-center justify-center px-4">
        <AuthCard
        title="PrepGenius AI"
        subtitle="Sign in to continue"
      >
        <LoginForm />
      </AuthCard>
      </div>
    </AuroraBackground>
  );
}
import AuthCard from "../../components/auth/AuthCard";
import RegisterForm from "../../components/auth/RegisterForm";
import AuroraBackground from "../../components/ui/AuroraBackground";

export default function RegisterPage() {
  return (
    <AuroraBackground>
      <div className="flex min-h-screen items-center justify-center bg-transparent px-4">
        <AuthCard
          title="Create Account"
          subtitle="Start your AI interview journey"
        >
          <RegisterForm />
        </AuthCard>
      </div>
    </AuroraBackground>
  );
}
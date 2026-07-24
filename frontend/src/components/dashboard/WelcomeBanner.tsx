import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function WelcomeBanner() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name}! 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Ready to improve your interview skills today?
        </p>
      </div>

      <button
        onClick={() => navigate("/interview")}
        className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
      >
        Start Interview
      </button>
    </div>
  );
}
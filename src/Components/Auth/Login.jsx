
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

// Matches the accounts DataSeeder.java creates on the backend on first run.
// Kept in one place here so the buttons below can never drift from what
// actually exists in the database.
const DEMO_ACCOUNTS = [
  { label: "Admin", email: "admin@example.com", password: "123" },
  { label: "HR", email: "hr@example.com", password: "123" },
  { label: "Employee (Rahul)", email: "rahul@example.com", password: "123" },
  { label: "Employee (Aman)", email: "aman@example.com", password: "123" },
];

const Login = ({ handlelogin, loginError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  async function LoginHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (handlelogin) {
        await handlelogin(email, password);
      }
    } finally {
      setLoading(false);
      setPassword("");
    }
  }

  async function handleDemoLogin(account) {
    setActiveDemo(account.email);
    setEmail(account.email);
    setLoading(true);
    try {
      if (handlelogin) {
        await handlelogin(account.email, account.password);
      }
    } finally {
      setLoading(false);
      setActiveDemo(null);
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center select-none bg-[#0d0f14] py-8">
        <form
          onSubmit={LoginHandler}
          className="w-100 p-3 border border-[#1e2333] rounded-xl bg-[#151822]"
        >
          <div className="flex flex-col gap-3 p-2">
            <div className="flex gap-3 p-4 ml-2 border-b border-[#1e2333] w-[95%] -ml-3">
              <h1 className="h-10 w-10 -ml-6 bg-[#3b82f6] rounded-full font-bold text-center text-md p-2 -mt-3 text-white">
                W
              </h1>
              <h1 className="text-xl font-medium text-[#f1f5f9] -mt-2">
                Workzen
              </h1>
            </div>

            <div className="px-2">
              <h1 className="text-xl font-bold text-[#f1f5f9]">
                Welcome back.
              </h1>
              <h4 className="text-xs px-0.5 text-[#64748b] font-medium">
                Sign in to your workspace to continue.
              </h4>
            </div>

            <div className="mt-5 px-2">
              <label className="text-[#93c5fd]">Email address</label>
              <input
                type="text"
                value={email}
                required
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 px-3 w-[90%] mt-3 rounded-md mb-2 border border-[#1e2333] bg-[#0d0f14] outline-none text-[#f1f5f9] focus:border-[#3b82f6] transition-all"
              />
              <label className="text-[#93c5fd]">Password</label>
              <input
                type="password"
                value={password}
                required
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 px-3 w-[90%] mt-3 rounded-md border border-[#1e2333] bg-[#0d0f14] outline-none text-[#f1f5f9] focus:border-[#3b82f6] transition-all"
              />
              <p className="text-[11px] text-[#64748b] mt-2">
                Forgot your password? Ask your HR or Admin to reset it for you from Employees → Reset Password.
              </p>
            </div>

            {loginError && (
              <div className="px-2">
                <p className="text-xs text-red-400">{loginError}</p>
              </div>
            )}

            <div className="flex flex-col justify-center ml-14 p-2">
              <button
                disabled={loading}
                className="h-10 w-56 flex items-center justify-center gap-2 font-medium bg-[#3b82f6] hover:bg-[#60a5fa] transition rounded-xl text-white"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign in to WorkZen</span>
                )}
              </button>

              <div className="ml-12 p-1 font-light text-[#64748b]">
                <h6 className="text-xs">Universal access</h6>
              </div>
            </div>

            <div className="px-4 pt-1 pb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-[#1e2333]" />
                <span className="text-[10px] uppercase tracking-wide text-[#64748b]">
                  Quick demo login
                </span>
                <div className="h-px flex-1 bg-[#1e2333]" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    disabled={loading}
                    onClick={() => handleDemoLogin(account)}
                    className="flex flex-col items-start gap-0.5 px-3 py-2 text-left border border-[#1e2333] rounded-lg bg-[#0d0f14] hover:border-[#3b82f6] hover:bg-[#151c2e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-xs font-medium text-[#f1f5f9] flex items-center gap-1.5">
                      {activeDemo === account.email && (
                        <LoaderCircle className="w-3 h-3 animate-spin" />
                      )}
                      {account.label}
                    </span>
                    <span className="text-[10px] text-[#64748b]">
                      {account.email}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
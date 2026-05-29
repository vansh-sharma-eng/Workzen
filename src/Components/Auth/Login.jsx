// Login.jsx
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const Login = ({ handlelogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function LoginHandler(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (handlelogin) {
        handlelogin(email, password);
      }
      setEmail("");
      setPassword("");
    }, 500);
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center select-none bg-[#0d0f14]">
        <form
          onSubmit={LoginHandler}
          className="h-120 w-100 p-3 border border-[#1e2333] rounded-xl bg-[#151822]"
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
            </div>

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

              <footer className="flex gap-2 p-2 ml-5">
                <h5 className="h-6 w-15 px-3 py-1 text-xs border border-[#1e2333] rounded-2xl bg-[#151822] text-[#93c5fd]">
                  Admin
                </h5>
                <h5 className="h-6 w-20 px-3 py-1 text-xs border border-[#1e2333] rounded-2xl bg-[#151822] text-[#93c5fd]">
                  Employee
                </h5>
              </footer>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
"use client";

import { useState, useEffect } from "react";
import { getAdminPassword, setAdminPassword, clearAdminPassword, checkAuthStatus } from "@/lib/auth";

interface AdminAuthProps {
  children: React.ReactNode;
}

export function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const storedPassword = getAdminPassword();
      if (storedPassword) {
        const isValid = await checkAuthStatus();
        setIsAuthenticated(isValid);
        if (!isValid) {
          clearAdminPassword();
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    setIsLoading(true);

    try {
      // Verify password with server
      const response = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}`,
        },
      });

      if (response.ok) {
        setAdminPassword(password);
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setError("Invalid password. Please try again.");
        setPassword("");
      }
    } catch (err) {
      setError("Failed to verify password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminPassword();
    setIsAuthenticated(false);
    setPassword("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0c1014]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0c1014]">
        <div className="bg-[#1a1f2e] rounded-lg border border-white/10 p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/70 mb-6">Please enter the admin password to continue.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#0c1014] border border-white/20 rounded-lg focus:outline-none focus:border-[#7df6ff] text-white"
                placeholder="Enter admin password"
                autoFocus
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-[#7df6ff] text-[#0c1014] font-semibold rounded-lg hover:bg-[#00eaff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-xs text-white/50 text-center">
            <p>This is a protected admin area.</p>
            <p className="mt-1">Contact the administrator if you need access.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#1a1f2e] border-b border-white/10 px-8 py-4 flex justify-between items-center">
        <div className="text-white/70 text-sm">
          Admin Mode - Authenticated
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}





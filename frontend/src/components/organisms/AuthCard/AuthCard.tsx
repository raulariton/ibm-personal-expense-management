"use client";
import AuthButton from "@/components/atoms/AuthButton/AuthButton";
import AuthFormFields from "@/components/molecules/AuthFormFields/AuthFormFields";
import FormFooter from "@/components/molecules/FormFooter/FormFooter";
import TabSwitcher from "@/components/molecules/TabSwitcher/TabSwitcher";
import React, { useState } from "react";
import apiClient from "@/utils/apiClient";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthCard() {
  const [isActive, setIsActive] = useState<"Login" | "Register">("Login");
  const isRegister = isActive === "Register";
	const auth = useAuth();
	const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check that password and confirmPassword match
    // TODO: better looking error
    if (isRegister && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const apiRoute =
			isRegister ? "/auth/register" : "/auth/login";

    const body = {
      email: formData.email,
      password: formData.password,
      ...(isRegister && {fullName: formData.fullName}),
    }

    try {
      const response = await apiClient.post(apiRoute, body, {
        headers: {
          'Content-Type': 'application/json',
        },
				withCredentials: true, // allows receiving cookies from the server
      })

      // update auth context
			auth.login(response.data.accessToken);

      // redirect to dashboard
			router.replace("/dashboard");


    } catch (error) {
      alert("Authentication error:" + error);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl w-[450px] max-w-full">
      <TabSwitcher isActive={isActive} setIsActive={setIsActive} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthFormFields
          isRegister={isRegister}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {isActive === "Login" && (
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>
        )}

        <AuthButton>
          {isActive === "Login" ? "Sign In" : "Create Account"}
        </AuthButton>
      </form>

      <FormFooter
        isActive={isActive}
        toggleForm={() => setIsActive(isRegister ? "Login" : "Register")}
      />
    </div>
  );
}

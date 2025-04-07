import { useState } from "react";
import { useToast } from "./use-toast";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_API_URL } from "@/constant/api";
import { useRouter } from "next/navigation";

export default function useSignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { mutate: signUp } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: any) => {
      const signup_data = {
        username: data.username,
        email: data.email,
        password: data.password
      };
      const response = await fetch(`${BACKEND_API_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signup_data)
      });

      const res = await response.json();

      if (!response.ok) {
        setLoading(false);
        toast({
          title: "Error",
          description: res.detail,
          variant: "destructive"
        });
        throw new Error(res.detail);
      } else {
        setLoading(false);
        toast({
          title: "Success",
          description: "Account created successfully",
          variant: "default"
        });
        // Redirect to login page after successful signup
        router.push("/login");
        return res;
      }
    }
  });

  return {
    signUp,
    loading,
    setLoading
  };
}

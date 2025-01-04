import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Info } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      toast({
        title: "Already logged in",
        description: "Redirecting to home page...",
      });
      navigate("/");
    }
  });

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      toast({
        title: "Welcome!",
        description: "You have successfully signed in.",
      });
      navigate("/");
    } else if (event === "SIGNED_OUT") {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } else if (event === "USER_UPDATED") {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } else if (event === "PASSWORD_RECOVERY") {
      toast({
        title: "Password recovery",
        description: "Check your email for password reset instructions.",
      });
    }
  });

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-sage-500">
            Welcome to CannaPair
          </h2>
          <p className="mt-2 text-center text-sm text-sage-400">
            Sign in or create an account to continue
          </p>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Sign in with your email address. We'll send you a magic link to log in securely without a password, or you can set up a password if you prefer.
            </p>
          </div>

          <div className="mt-8">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2D4739',
                      brandAccent: '#FF7F5C',
                    },
                  },
                },
              }}
              redirectTo={window.location.origin}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
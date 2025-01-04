import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
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
              providers={["google", "github"]}
              redirectTo={window.location.origin}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

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
              Sign in with your email and password or use a magic link. Your session will be kept active indefinitely until you explicitly sign out.
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
              providers={[]}
              view="sign_in"
              showLinks={true}
              redirectTo={window.location.origin}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
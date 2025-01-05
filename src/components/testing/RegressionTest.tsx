import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bug, Check, X, AlertCircle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface TestResult {
  name: string;
  status: "success" | "error" | "pending";
  error?: string;
}

export const RegressionTest = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addResult = (name: string, status: TestResult["status"], error?: string) => {
    setResults(prev => [...prev, { name, status, error }]);
  };

  const runTests = async () => {
    setResults([]);

    // Test database connectivity
    try {
      addResult("Database Connection", "pending");
      const { data, error } = await supabase.from("profiles").select("id").limit(1);
      if (error) throw error;
      addResult("Database Connection", "success");
    } catch (error) {
      addResult("Database Connection", "error", error instanceof Error ? error.message : "Unknown error");
    }

    // Test authentication status
    try {
      addResult("Authentication Status", "pending");
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      addResult("Authentication Status", "success");
    } catch (error) {
      addResult("Authentication Status", "error", error instanceof Error ? error.message : "Unknown error");
    }

    // Test navigation to each route
    const routes = [
      "/",
      "/calculator",
      "/tools/calculator",
      "/tools/budget",
      "/tools",
      "/games",
      "/games/tycoon",
      "/games/wordle",
      "/about",
      "/contact",
      "/auth",
      "/profile"
    ];

    for (const route of routes) {
      try {
        addResult(`Route ${route}`, "pending");
        navigate(route);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for potential errors
        addResult(`Route ${route}`, "success");
      } catch (error) {
        addResult(`Route ${route}`, "error", error instanceof Error ? error.message : "Unknown error");
      }
    }

    // Test contact form fields presence
    try {
      addResult("Contact Form Fields", "pending");
      navigate("/contact");
      await new Promise(resolve => setTimeout(resolve, 500));
      const nameInput = document.querySelector('input[name="name"]');
      const emailInput = document.querySelector('input[name="email"]');
      const messageInput = document.querySelector('textarea[name="message"]');
      
      if (!nameInput || !emailInput || !messageInput) {
        throw new Error("Missing contact form fields");
      }
      addResult("Contact Form Fields", "success");
    } catch (error) {
      addResult("Contact Form Fields", "error", error instanceof Error ? error.message : "Unknown error");
    }

    // Notify completion
    toast({
      title: "Regression Tests Completed",
      description: `${results.filter(r => r.status === "success").length} tests passed, ${results.filter(r => r.status === "error").length} failed`,
    });
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Check className="w-5 h-5 text-green-500" />;
      case "error":
        return <X className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Loader className="w-5 h-5 text-sage-500 animate-spin" />;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-sage-700">Regression Tests</h1>
        <button
          onClick={runTests}
          className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
        >
          Run Tests Again
        </button>
      </div>

      <div className="grid gap-4">
        {results.map((result, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(result.status)}
                <span className="font-medium text-sage-700">{result.name}</span>
              </div>
              {result.error && (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{result.error}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
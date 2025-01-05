import { useState, useEffect } from "react";
import { Check, X, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface TestResult {
  name: string;
  status: "success" | "error" | "warning" | "info";
  message: string;
}

const RegressionTest = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const addResult = (result: TestResult) => {
    setResults(prev => [...prev, result]);
    // Also show as toast for immediate feedback
    toast({
      title: result.name,
      description: result.message,
      variant: result.status === "error" ? "destructive" : "default",
    });
  };

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);

    // Test Supabase Connection
    try {
      const { data, error } = await supabase.from("profiles").select("id").limit(1);
      if (error) throw error;
      addResult({
        name: "Database Connection",
        status: "success",
        message: "Successfully connected to Supabase",
      });
    } catch (error) {
      addResult({
        name: "Database Connection",
        status: "error",
        message: "Failed to connect to database",
      });
    }

    // Test Authentication
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      addResult({
        name: "Authentication Check",
        status: session ? "success" : "info",
        message: session ? "User is authenticated" : "No active session",
      });
    } catch (error) {
      addResult({
        name: "Authentication Check",
        status: "error",
        message: "Failed to check authentication status",
      });
    }

    // Test Contact Form Fields
    const formFields = document.querySelectorAll('form[name="contact"] input, form[name="contact"] textarea');
    if (formFields.length >= 3) {
      addResult({
        name: "Contact Form Fields",
        status: "success",
        message: "All required form fields present",
      });
    } else {
      addResult({
        name: "Contact Form Fields",
        status: "error",
        message: "Missing required form fields",
      });
    }

    // Test Navigation Links
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length > 0) {
      addResult({
        name: "Navigation Links",
        status: "success",
        message: `Found ${navLinks.length} navigation links`,
      });
    } else {
      addResult({
        name: "Navigation Links",
        status: "warning",
        message: "No navigation links found",
      });
    }

    // Test Footer Links
    const footerLinks = document.querySelectorAll('footer a');
    if (footerLinks.length > 0) {
      addResult({
        name: "Footer Links",
        status: "success",
        message: `Found ${footerLinks.length} footer links`,
      });
    } else {
      addResult({
        name: "Footer Links",
        status: "warning",
        message: "No footer links found",
      });
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Check className="text-green-500" />;
      case "error":
        return <X className="text-red-500" />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" />;
      case "info":
        return <Info className="text-blue-500" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Regression Test Results
          {isRunning && (
            <span className="text-sm text-sage-500">Running tests...</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border border-sage-200 bg-white/50"
            >
              {getStatusIcon(result.status)}
              <div>
                <h3 className="font-medium">{result.name}</h3>
                <p className="text-sm text-sage-600">{result.message}</p>
              </div>
            </div>
          ))}
          {results.length === 0 && !isRunning && (
            <p className="text-center text-sage-500">No test results yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegressionTest;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Access Denied",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      const { data: adminRole } = await supabase
        .from("admin_roles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (!adminRole) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto">
      <AdminDashboard />
    </div>
  );
};

export default Admin;
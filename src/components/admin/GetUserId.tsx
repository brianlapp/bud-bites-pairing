import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const GetUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const handleGetUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      console.log("Your user ID:", user.id);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Button onClick={handleGetUserId}>Get My User ID</Button>
      {userId && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p>Your User ID: {userId}</p>
        </div>
      )}
    </div>
  );
};

export default GetUserId;
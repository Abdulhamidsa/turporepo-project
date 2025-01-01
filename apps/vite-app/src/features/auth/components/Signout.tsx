import { Button } from "@repo/ui/components/ui/button";
import { useAuth } from "../../../../context/AuthContext";

function Signout() {
  const { signOut } = useAuth();

  return <Button onClick={signOut}>Sign Out</Button>;
}

export default Signout;

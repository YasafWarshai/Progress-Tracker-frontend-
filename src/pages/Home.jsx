import { Box } from "@chakra-ui/react";
import Schedule from "../components/home/Schedule";
import SplashPage from "../components/SplashPage";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { isActiveSession } = useAuthContext();

  return (
    <Box p={12} bg="cyan.100">
      {isActiveSession ? <Schedule /> : <SplashPage />}
    </Box>
  )
}
import { Flex } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import UserSideBar from "./UserSideBar";
import Sidebar from './SideBar'

export default function Schedule() {
  const { isActiveSession } = useAuthContext();

  return (
    <Flex bg="cyan.100" h="10vh">
      {isActiveSession ? <UserSideBar /> : <Sidebar />}
    </Flex>
  )
}
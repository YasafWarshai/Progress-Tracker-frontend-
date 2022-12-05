import { useEffect, useState } from "react";
import { Flex, Button, Heading, Box, Switch, FormLabel, Text } from "@chakra-ui/react";
import { Get } from "../../utils/api";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleTile from "./ScheduleTile";
import { useAuthContext } from "../../context/AuthContext";


export default function Schedule() {
  const { currentUser } = useAuthContext();
  const [goals, setGoals] = useState([]);
  const [view, setView] = useState(1);
  const toggleView = () => view === 1 ? setView(2) : setView(1);

  useEffect(() => {
    const awaitGetGoals = async () => await getGoals();
    awaitGetGoals();
  }, [])

  const getGoals = async () => {
    try {
      const res = await Get("/goal");
      setGoals(res);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <Flex align="center" justify="center" mb={8}>
        <Text as="b">Monthly View</Text>
        <Switch mx={2} onChange={toggleView} />
        <Text as="b">Weekly View</Text>
      </Flex>
      <Flex direction="column" justify="center">
        {view === 1 ?
          <>
            <Flex w="100%" justify="center">
              <Flex direction="column" mr={2} gap={2}>
                {["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4", "WEEK 5", "WEEK 6", "WEEK 7", "WEEK 8"].map(item => {
                  if (item === "WEEK 5") return <Flex key={item} h="6rem" align="center" mt={22}><Text as="b">{item}</Text></Flex>
                  else return <Flex key={item} h="6rem" align="center"><Text as="b">{item}</Text></Flex>
                })}
              </Flex>
              <ScheduleGrid goals={goals} view={view} />
            </Flex>
          </>
        :
          <>
            <Flex w="100%" direction="column" align="center" mb={8}>
              <ScheduleTile goal={goals[currentUser.goalID - 1]} tileMargin={0} tileWidth="60vw" view={view} />
            </Flex>
            <ScheduleGrid goals={goals} view={view} />
          </>
        }
      </Flex>
    </>
  )
}
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import ScheduleModal from "./ScheduleModal";
import dayjs from "dayjs";
import { Put } from "../../utils/api";
import { GiLaurelsTrophy } from "react-icons/gi";

export default function Schedule({ goal, tileMargin, tileWidth, view }) {
  const { currentUser, getCurrentUser, achievements } = useAuthContext();
  const { isOpen, onToggle } = useDisclosure();
  const toggleModal = () => onToggle();

  const handleGoal = async () => {
    try {
      const res = await Put(`/user/${currentUser.id}/goal`, { goal: goal.id + 1 });
      if (res.ok) getCurrentUser(currentUser.id);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      {view === 1 ?
        <>
          <Button
            justifySelf="center"
            bg={currentUser.goalID < goal.id + 1 ? "gray.400" : "green.200"}
            width="8rem"
            height="6rem"
            onClick={toggleModal}
            mt={tileMargin}
            w={tileWidth}
          >
            <Flex direction="column">
              <Text fontSize="sm">{dayjs(currentUser.startDate).add(goal.id - 1, "day").format("DD MMM YYYY")}</Text>
              <Text mt={2}>{goal.title.toUpperCase()}</Text>
            </Flex>
            {achievements.find(achievement => achievement.goalID === goal.id) ?
              <Box position="absolute" top="0.5rem" left="6.5rem">
                <GiLaurelsTrophy />
              </Box>
            : null}
          </Button>
          <ScheduleModal isOpen={isOpen} toggleModal={toggleModal} goal={goal} handleGoal={handleGoal} />
        </>
      :
        <Flex
          justifySelf="center"
          bg={currentUser.goalID < goal.id + 1 ? "gray.400" : "green.200"}
          mt={tileMargin}
          w={tileWidth}
          height="6rem"
          borderRadius="var(--chakra-radii-md)"
          p={8}
          align="center"
          justify="space-between"
        >
          <Flex justify="start" textAlign="left" gap={4}>
            <Text w="6rem">{dayjs(currentUser.startDate).add(goal.id - 1, "day").format("DD MMM YYYY")}</Text>
            <Flex w="8rem" align="center">
              <Text fontSize="lg" mr={2}>{goal.title.toUpperCase()}</Text>
              {achievements.find(achievement => achievement.goalID === goal.id) ? <GiLaurelsTrophy /> : null}
            </Flex>
            <Text>{goal.content}</Text>
          </Flex>
          {currentUser.goalID === goal.id ? <Button minW="6rem" onClick={handleGoal}>Complete</Button> : null}
        </Flex>
      }
    </>
  )
}
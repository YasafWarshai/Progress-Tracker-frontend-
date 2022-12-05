import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Flex, Text, Button, ModalHeader, Box, Checkbox, ModalFooter, Circle, VStack } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { getAllByAltText } from "@testing-library/react";

export default function FormModal({ isOpen, toggleModal, goal, handleGoal }) {
  const [currentAchievement, setCurrentAchievement] = useState([]);
  const { currentUser, achievements } = useAuthContext();


const getAchvievements = async () => {
  setCurrentAchievement(achievements.filter((achievement) => achievement.goalID === goal.id))
}

  useEffect(() => {
    getAchvievements();
  },[])

  return (
    <Modal isOpen={isOpen} onClose={() => toggleModal()}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize='2xl' as='b' borderBottom='1px' borderColor='gray.200'>Hi {currentUser.name}!</ModalHeader>
        <ModalBody>
          <Flex justifyContent="space-between">
            <Box direction="column">
                <Box mb='3'>
                  <Text fontSize='md' as='b' color='gray.600'>Your daily goal:</Text> 
                  <Text fontSize='sm'>{goal.title}</Text>
                </Box>
                <Box mb='3'>
                  <Text fontSize='md' as='b' color='gray.600'>How to?</Text> 
                  <Text fontSize='sm'>{goal.content}</Text>
                </Box>
                {(currentUser.goalID === goal.id) ?
                <Checkbox mb='3' colorScheme='green' >
                  Goal completed!
                </Checkbox> 
                : (null)}

            </Box>

            <Box my="auto" mr="35px">
                { currentAchievement.length > 0 ?
                <Circle size='130px' bg="green.400" >
                  <VStack>
                    <Box fontSize='md' as='b' color='black'>Achievement:</Box>
                    <Box fontSize='sm' as='b'>{currentAchievement[0].title}</Box>
                  </VStack>
                </Circle> : (null)}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter borderBottom='1px' borderColor='gray.200'>
          {currentUser.goalID === goal.id ?
            <Button colorScheme='gray' bg="gray.400" mr={3} onClick={() => {handleGoal(); toggleModal()}}>
            Save
          </Button>
          : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
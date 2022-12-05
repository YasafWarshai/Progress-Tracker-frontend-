import { Box, Flex,  useToast } from "@chakra-ui/react";
import * as Yup from 'yup'
import { Get } from '../utils/api'
import { Heading, Image } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import {useAuthContext } from '../context/AuthContext';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ChangeDateform from "../components/ChangeDateform";
import { Formik } from "formik";

export default function Profile() {

  const {currentUser} = useAuthContext()
  const [currentGoal, setCurrentGoal] = useState({})
  const [nextGoal, setNextGoal] = useState({})
  const toast = useToast()
  const getCurrentGoal = async () => {
    try {
      const res = await Get(`/goal/${currentUser.goalID - 1}`);       
      if (res) setCurrentGoal(res)
      else setCurrentGoal({title: "", content: ""})

      const goalUpcoming = currentUser.goalID
        if(goalUpcoming < 57){
          const res2 = await Get(`/goal/${currentUser.goalID}`);
          setNextGoal(res2)
        }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCurrentGoal()
  }, [currentUser])


  return (
  <Box bg="cyan.100">
    <Flex justifyContent={"center"} p={12}>
      <Box borderRadius='md' mr={3} p={6} bg='gray.200'>
        <Stack spacing={5}>
          <Heading as='h2' size='lg' noOfLines={1}>
            User
          </Heading>
          <Box bg="white" p={6} borderRadius='md'>
            <Stack spacing={5}>
            <Heading fontWeight="600" as='h2' size='md' noOfLines={1}>
              <Flex alignItems={"center"} justifyContent={"center"} p={1}>
              <Image boxSize='80px'objectFit='cover'src={currentUser.picture} alt='Profile picture'/>
              </Flex>
              </Heading>
              <Heading fontWeight="600" as='h2' size='md' noOfLines={1}>
                Name: {currentUser.name}
              </Heading>
              <Heading fontWeight="600" as='h2' size='md'>
                Email: {currentUser.email}
              </Heading>
              <Heading fontWeight="600" as='h3' size='md'>
                Join date: {dayjs(currentUser.createdAt).format("DD MMM YYYY")}
              </Heading>
              <Heading fontWeight="600" as='h3' size='md'>
                Goals completed: {currentUser.goalID - 1}
              </Heading>
              <Heading fontWeight="600" as='h4' size='md'>
                Goals remaining: {57-currentUser.goalID}
              </Heading>
            </Stack>
          </Box>
        </Stack>
    </Box>
    <Box  borderRadius='md' p={6} bg='gray.400'>
    <Stack spacing={5}>
          <Heading as='h2' color='black' size='lg' noOfLines={1}>
           Status
          </Heading>
              <Box borderRadius='md' p={6} bg='white'>
              <Heading fontWeight="600" as='h2' size='md' lineHeight="2rem" noOfLines={1}>
              Last goal completed:
              </Heading>
              <Heading fontWeight="400" as='h2' size='sm'>
                <br/>
                {currentGoal.title}
              </Heading>
              <Heading fontWeight="400" as='h3' size='sm'>
                {currentGoal.content}
              </Heading>
              </Box>

              <Box borderRadius='md' p={6} bg='white'>
                <Heading fontWeight="600" as='h2' lineHeight="2rem" size='md' noOfLines={1}>
                  Upcoming goal:<br/>
                </Heading>
                <Heading fontWeight="400" as='h2' size='sm'>
                  <br/>
                  {nextGoal.title}
                </Heading>
                <Heading fontWeight="400" as='h3' size='sm'>
                  {nextGoal.content}
              </Heading>
              </Box>
         
        </Stack>

    </Box>
    </Flex >
    <Flex justifyContent={"center"} p={12}>
    <Box w={'40vw'}>
      <ChangeDateform />
    </Box>
    </Flex>
    </Box>
  )
}
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
export default function SplashPage() {
  return (
      <Box mt="150px" ml="120px" width="50%" h="55vh">
        <Text color="gray.600" fontSize={'6xl'} mb="25px" borderBottom='1px' borderColor='gray.600'>CodeTracker</Text>
        <Text color="gray.600" fontWeight="200" fontSize={'2xl'}>Welcome to CodeTracker! Looking to join the exciting world of hi-tech? Have a passion for design, learning new things, and problem solving? You're in the right place! Login or Sign Up to see what CodeTracker can offer you on your journey from zero to development hero!</Text>
      </Box>
  )
}
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    IconButton,
    Link,
    Stack,
    Box,
    Heading,
    Image,
    Grid,
    GridItem,
    useToast,
    Flex, 
    Text
  } from '@chakra-ui/react'
  import { HamburgerIcon } from '@chakra-ui/icons';
  import { useRef, useState, useEffect } from 'react';
  import { NavLink } from "react-router-dom";
  import {useAuthContext } from '../context/AuthContext';
import logo from '../images/darklogo.png'
import { Post } from '../utils/api';
import { GiLaurelsTrophy } from "react-icons/gi";

export default function UserSideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { isLoading, currentUser, clearCurrentUser, achievements } = useAuthContext();
  const toast = useToast()

  const handleLogout = async () => {
    try {
      const res = await Post("/logout");
      if (res.ok) clearCurrentUser();
      toast({
        title: 'Success',
        description: 'Logout successful.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      })
    } catch(err) {
      toast({
        title: 'error',
        description: "couldn't log out, try again",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'

      })    }
    }
  



  return (
    <>
      <Button className="sideBarBtn" mt={2} ref={btnRef} variant="ghost" colorScheme="gray" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight="400" bg={"white"}>
            <Flex alignItems={"center"} justifyContent={"center"} p={1}>
            <Image boxSize='60px'objectFit='cover'src={currentUser.picture} alt='Profile picture'/>
            <Text fontSize='xl'>&nbsp;Welcome, {currentUser.name}</Text>
           </Flex>
          </DrawerHeader>
            <DrawerBody bg={'gray.200'}>
              <Stack>
                <Flex flexDir="column" mt="10px" mb="30px">
                  <Link as={NavLink} to="/" onClick={onClose}>
                    Home
                  </Link>
                  <Link  as={NavLink} to="/profile" onClick={onClose}>
                    Profile
                  </Link>
                </Flex>


              <Heading fontWeight="300">Achievements</Heading>
              <Box borderRadius={"15px"} padding={'10px'} bg={"white"} height={"50vh"}>
                <Grid h={"100%"} templateColumns="repeat(3, 1fr)" gap={'2'}>
                  {!isLoading ? achievements.filter((item) => item.goalID <= currentUser.goalID).map((item) => <GridItem key={item.title} borderRadius={'6px'}  w="100%" maxHeight="75px" bg="green.200" as='b' fontWeight="300" textAlign="center"><Flex justify="end" mt="3px" mr="2px"><GiLaurelsTrophy/></Flex>{item.title}</GridItem>) : 'No achievements to show.'}
                </Grid>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter bg={"white"}>
            <Button colorScheme="gray" bg="gray.400" onClick={handleLogout}>
              Log Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
  }

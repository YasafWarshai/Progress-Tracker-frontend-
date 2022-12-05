import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  Input,
  FormLabel,
  Modal,
  FormErrorMessage,
  IconButton,
  FormControl,
  Heading,
  Image,
  Text,
  useToast
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginModal from "./LoginModal";
import { useAuthContext } from "../context/AuthContext";
import { Post } from "../utils/api";
import logo from '../images/darklogo.png'

export default function Sidebar() {
  const toast = useToast()
  const { getCurrentUser, currentUser } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email required").min(2, "email is too short"),
      password: Yup.string().required("password required").min(2, "password is too short")
    }),

    onSubmit: async (values, actions) => {
      try {
        const res = await Post("/login", values)
        if (res.ok) getCurrentUser(res.id)
        onClose()
        toast({
          title: 'Success',
          description: `Welcome back!`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right'

        })

        actions.resetForm()
      } catch(err) {
        toast({
          title: 'error',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right'

        })
      }
    }
  })

  
  return (
    <>
      <Button mt={2} variant="ghost" colorScheme="gray" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg={"white"}>
            <Text fontSize='4xl' fontWeight="300" color="gray.600">CodeTracker</Text>
          </DrawerHeader>

          <DrawerBody bg={"gray.200"}>
            <Stack spacing="24px">
              <Text as={'b'}>Log In</Text>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input   bg={'white'}
                isInvalid={formik.errors.name && formik.touched.name}
                type='text'
                  id='email'
                  name='email'
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
  

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input bg={'white'}
                isInvalid={formik.errors.password && formik.touched.password}
                type={'password'}
                  id='password'
                  name='password'
                  placeholder='Password'
                  {...formik.getFieldProps('password')}

                />
              </FormControl>
              <Button colorScheme='gray' _hover={{ bg: 'gray.100' }} bg={'gray.400'} mt={4} onClick={formik.handleSubmit} mr={3}>
                Log In
              </Button>
            </Stack>
          </DrawerBody>
          <DrawerFooter bg={'white'}>
          <FormLabel> New to CodeTracker? </FormLabel>
            <Box><LoginModal color={"white"} m={0} onClick={onOpen} />{" "}</Box>
          </DrawerFooter>
          <Modal></Modal>
        </DrawerContent>
      </Drawer>
    </>
  );
}

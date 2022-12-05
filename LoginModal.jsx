import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
    useToast
  } from '@chakra-ui/react'
  import { useRef } from 'react'
  import { Formik, useFormik, Form, yupToFormErrors } from 'formik'
  import * as Yup from 'yup'
  import { useAuthContext } from "../context/AuthContext";
  import { Post } from "../utils/api";

  export default function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getCurrentUser } = useAuthContext();
  const toast = useToast()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        startDate: "",
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .required("username required")
          .min(2, "username is too short"),
        password: Yup.string()
          .required("password required")
          .min(2, "password is too short"),
        passwordConfirm: Yup.string()
          .required("please re-enter password")
          .min(2, "passwords do not match"),
        email: Yup.string().email().required("not a proper email"),
        startDate: Yup.date().required("must input start date"),
      }),
      onSubmit: async (values, actions) => {
        try {
          const res = await Post("/signup", values);
          if (res.ok) getCurrentUser(res.id);
          toast({
            title: 'Success',
            description: 'Signup successful.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'

          })

          onClose();
          actions.resetForm();
        } catch(err) {
          console.log(err);
          toast({
            title: 'error',
            description: err.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'

          })

        }
      },
    });
  
  
 
  
    return (
      <>
        <Button onClick={onOpen} _hover={{ bg: 'gray.200' }} color={'black'} bg={'gray.400'} >Sign Up</Button>
      
  
        <Modal 
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody borderRadius="10" pb={5} bg={'gray.200'}
><Box>
                <FormLabel htmlFor="name">Username</FormLabel>
                <Input
                mb={3}
                  bg={"white"}
                  isInvalid={formik.errors.name && formik.touched.name}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Username"
                  {...formik.getFieldProps("name")}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </Box>

              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                 mb={3}
                  bg={"white"}
                  isInvalid={formik.errors.email && formik.touched.email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </Box>

              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                 mb={3}
                  bg={"white"}
                  isInvalid={formik.errors.password && formik.touched.password}
                  type={"password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </Box>

              <Box>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                 mb={3}
                  bg={"white"}
                  isInvalid={
                    formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm
                  }
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={"password"}
                  placeholder="Re-enter password"
                  {...formik.getFieldProps("passwordConfirm")}
                />
                <FormErrorMessage>
                  {formik.errors.passwordConfirm}
                </FormErrorMessage>
              </Box>

              <Box>
                <FormLabel htmlFor="startDate">
                  When do you want to start your journey?
                </FormLabel>
                <Input mb={3}
                  bg={"white"}
                  isInvalid={
                    formik.errors.startDate && formik.touched.startDate
                  }
                  type="date"
                  id="startDate"
                  name="startDate"
                  placeholder="start date"
                  {...formik.getFieldProps("startDate")}
                />
                <FormErrorMessage>{formik.errors.startDate}</FormErrorMessage>
              </Box>

              <Button
                color={"black"}
                _hover={{ bg: "gray.100" }}
                bg={"gray.400"}
                mr={3}
                onClick={formik.handleSubmit}
              >
                Sign Up
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }



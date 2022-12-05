import React from "react";
import { Button, FormLabel, Input, useToast, Box, FormErrorMessage, Heading } from "@chakra-ui/react";
import * as Yup from "yup";
import { Put } from "../utils/api";
import { useAuthContext } from "../context/AuthContext";
import { Formik, useFormik, Form, yupToFormErrors } from "formik";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function ChangeDateform() {
  const { currentUser, getCurrentUser } = useAuthContext();  

  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      startDate: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required("must input start date"),
    }),
    onSubmit: async (values, actions) => {
 
      try {
        const start = await Put(`/user/${currentUser.id}/start`, values);
        const res = await Put(`/user/${currentUser.id}/goal`, { goal: 1.0 });
        if (res.ok) getCurrentUser(currentUser.id);
        toast({
          title: "Success",
          description: "Start date successfully changed.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
        actions.resetForm();
      } catch (err) {
        toast({
          title: "error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    },
  });
  return (
    <div>
      <Box>
        <FormLabel>Your current starting date is: {dayjs(currentUser.startDate).format("DD MMM YYYY")}</FormLabel>
        <FormLabel htmlFor="startDate">
          When would you like to start your journey?
        </FormLabel>
        <Input
          mb={3}
          bg={"white"}
          isInvalid={formik.errors.startDate && formik.touched.startDate}
          type="date"
          id="startDate"
          name="startDate"
          placeholder="start date"
          {...formik.getFieldProps("startDate")}
        />
        <FormErrorMessage>{formik.errors.startDate}</FormErrorMessage>
      </Box>

      <Button
        color={"white"}
        _hover={{ bg: "gray.200" }}
        bg={"gray.600"}
        mr={3}
        onClick={formik.handleSubmit}
      >
        Save
      </Button>
    </div>
  );
}

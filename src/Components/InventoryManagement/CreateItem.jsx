import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "../../lib/firebase";

function CreateItemForm(props) {
  const db = getFirestore(app);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "items"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(data);
  };

  return (
    <Box>
      <form id="create-item" onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column" gap="20px">
          <FormControl>
            <FormLabel>Item name</FormLabel>
            <Input {...register("name", { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>Item price</FormLabel>
            <InputGroup>
              <Input
                {...register("price", {
                  valueAsNumber: true,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  },
                })}
              />
              <InputRightElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="DH"
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Extra information</FormLabel>
            <Input {...register("extras")} />
          </FormControl>
        </Flex>
      </form>
    </Box>
  );
}

function CreateItem(props) {
  const { isOpen, onClose } = props;

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <CreateItemForm />
        </ModalBody>

        <ModalFooter>
          <Button
            form="create-item"
            type="submit"
            bgColor="#F7AEF8"
            _hover={{
              bg: "white",
              outlineColor: "#B388EB",
              transitionDuration: "0s",
            }}
            mr={3}
          >
            Add
          </Button>
          <Button
            bg="#474350"
            color="white"
            _hover={{
              textColor: "black",
              bg: "white",
              outlineColor: "#474350",
              transitionDuration: "0s",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateItem;

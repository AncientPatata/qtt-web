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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AddNewItem } from "../../lib/item_management";
import useSWR from "swr";
function CreateItemForm(props) {
  const { mutate } = useSWR("Items");
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    mutate(
      AddNewItem(data).then(({ data: new_data, err }) => {
        if (err) {
          toast({
            title: "Item creation failed.",
            description: `Failed to add the item ${data["itemName"]}, please try again`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Item created.",
            description: `Successfully added ${data["itemName"]} !`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }),
      {
        optimisticData: (currData) => [data, ...currData],
      }
    );
  };

  return (
    <Box>
      <form id="create-item" onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column" gap="20px">
          <FormControl>
            <FormLabel>Item name</FormLabel>
            <Input {...register("itemName", { required: true })} />
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

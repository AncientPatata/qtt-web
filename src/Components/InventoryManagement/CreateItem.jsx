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
import { AddNewItem } from "../../lib/item_management";
import useSWR from "swr";
function CreateItemForm(props) {
  const { mutate } = useSWR("Items");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    mutate(AddNewItem(data), {
      optimisticData: (currData) => [data, ...currData],
    });
  };

  return (
    <Box>
      <form id="create-item" onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column" gap="20px">
          <FormControl>
            <FormLabel>Item name</FormLabel>
            <Input {...register("itemName", { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>Unit price of item</FormLabel>
            <InputGroup>
              <Input
                {...register("unitPrice", {
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

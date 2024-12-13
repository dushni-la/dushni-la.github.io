"use client";
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { MdAdd } from "react-icons/md";
import PlatformLinks from "./PlatformLinks";

const SubscribeButton = (props: ButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color="warning" {...props} onPress={onOpen}>
        <MdAdd />
        Підписатись
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          backdrop:
            "bg-gradient-to-t dark:from-zinc-900 dark:to-zinc-900/10 backdrop-blur-md",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Не пропусти наступний випуск
              </ModalHeader>
              <ModalBody>
                <PlatformLinks />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Закрити
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubscribeButton;

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

type Props = ButtonProps & { autoOpen?: boolean };

const SuspensedSubscribeButton = (props: Props) => {
  const { autoOpen = false, ...rest } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isSubscribeOpen = query.get("follow");

  useEffect(() => {
    if (!!isSubscribeOpen && autoOpen) {
      onOpen();
    }
  }, [autoOpen, isSubscribeOpen, onOpen]);

  const handleOpenChange = (val: boolean) => {
    if (val === false && autoOpen && !!isSubscribeOpen) {
      router.replace(pathname);
    }
    onOpenChange();
  };

  return (
    <>
      <Button color="warning" {...rest} onPress={onOpen}>
        <MdAdd />
        Підписатись
      </Button>
      <Modal
        itemID="subscribe-modal"
        id="subscribe-modal"
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
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

const SubscribeButton = (props: Props) => {
  return (
    <Suspense>
      <SuspensedSubscribeButton {...props} />
    </Suspense>
  );
};

export default SubscribeButton;

"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Link from "next/link";
function Page(projectID: string) {
  // database call to get project data
  // loading dummy data for now
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card shadow="sm" key={projectID} onPress={onOpen}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <span className="text-default-500">12 Tracks</span>
          <h4 className="font-bold text-large">Project: {projectID}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            width={300}
            alt="Project Image"
            src="https://www.creativethinkingtrd.com/images/project-managemen.png"
          />
          <Button onPress={onOpen}>Open Modal</Button>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Image
                  width={300}
                  alt="Project Image"
                  src="https://www.creativethinkingtrd.com/images/project-managemen.png"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  <Link href="../1" color="primary">
                    Primary
                  </Link>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default Page;

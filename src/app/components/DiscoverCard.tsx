import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure} from "@nextui-org/modal"; 
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import Link from 'next/link'
function Page(projectID: string) {
    // database call to get project data
    // loading dummy data for now
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Card shadow="sm" key={projectID}>
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
                    {/* <Button>Open Modal</Button> */}
                </CardBody>
            </Card>

            {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {

                        (onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                </ModalContent>
            </Modal> */}
        </>
    );
}
export default Page;
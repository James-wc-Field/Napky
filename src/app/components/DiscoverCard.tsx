'use client'


function DiscoverCard(
    {username, project, modified, created, rating, image, image_text}:
    {username?: string, project?: string, modified?: string, created?: string, rating?: number, image?:string, image_text?:string }
) {
  const image_size = 240
  return (
    <div className='block box-border box-content w-64 h-100 bg-card-bg-light border-4 rounded-lg border-accent p-2'>
      <h2 className='text-3xl text-black font-bold'>{project}</h2>
      <p className='text-lg text-black'>{username}</p>
      <img 
        src={image}
        alt={image_text}
        style={{
          width: image_size,
          height: image_size
        }}
      />
      <div className="text-black">Rating: {rating} </div>
      <p className="text-black">last modified: {modified}</p>
    </div>

  )
}

// function Page(projectID: string) {
//     // database call to get project data
//     // loading dummy data for now
//     const { isOpen, onOpen, onOpenChange } = useDisclosure();
//     return (
//         <>
//             <Card shadow="sm" key={projectID} onPress={onOpen}>
//                 <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//                     <p className="text-tiny uppercase font-bold">Daily Mix</p>
//                     <span className="text-default-500">12 Tracks</span>
//                     <h4 className="font-bold text-large">Project: {projectID}</h4>
//                 </CardHeader>
//                 <CardBody className="overflow-visible py-2">
//                     <Image
//                         width={300}
//                         alt="Project Image"
//                         src="https://www.creativethinkingtrd.com/images/project-managemen.png"
//                     />
//                     <Button onPress={onOpen}>Open Modal</Button>
//                 </CardBody>
//             </Card>

//             <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//                 <ModalContent>
//                     {

//                         (onClose) => (
//                             <>
//                                 <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//                                 <ModalBody>
//                                     <Image width={300} alt="Project Image" src="https://www.creativethinkingtrd.com/images/project-managemen.png" />
//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button color="danger" variant="light" onPress={onClose}>
//                                         Close
//                                     </Button>
//                                     <Button color="primary" onPress={onClose}>
//                                         <Link href="../1" color="primary">
//                                             Primary
//                                         </Link>
//                                     </Button>
//                                 </ModalFooter>
//                             </>
//                         )}
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// }
export default DiscoverCard;
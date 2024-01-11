import { ButtonGroup, Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { CardNote } from "./CardNote";
import React from "react"

// This component might not be used but can be when add button is pressed

/* // NOTE: Adding transition on max-height in the nextui button component gets overriden so have to build custom
// NOTE: Button transition to menu functionality code below
<div className="transition-all bg-primary-dark rounded-full ease-in-out delay-150 max-h-12 hover:max-h-36 hover:bg-indigo-500 duration-500">
<div className="h-12 hover:h-36 w-12 flex items-center justify-center">
    <PlusIcon />
</div>
</div>
<AddItemMenu ></AddItemMenu>
*/

export const AddItemFull = (props: { [key: string] : string }) => {
    return (
        <div>
            <div className="rounded-t-lg overflow-clip"> {/* NOTE: nested like it is here allows me to set a border radius for the top of button group */}
                <ButtonGroup radius="none" fullWidth className="rounded-t-lg">
                <Button>Note</Button>
                <Button>Image</Button>
                <Button>Link</Button>
                </ButtonGroup>
            </div>

            <Card className="bg-primary-dark w-full border-neutral-dark border-2 max-h-32 rounded-none rounded-b-lg">
            <CardBody>
                <CardNote selected="false"></CardNote>
                <CardNote selected="false"></CardNote>
                <CardNote selected="false"></CardNote>
            </CardBody>
            </Card>
        </div>
    );

}

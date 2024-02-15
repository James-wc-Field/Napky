import { ButtonGroup, Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { CardNote } from "./CardNote";
import React from "react"

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
                {/* <CardNote selected={"false" as any}></CardNote>
                <CardNote selected="false"></CardNote>
                <CardNote selected="false"></CardNote> */}
            </CardBody>
            </Card>
        </div>
    );

}

import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Button } from "@components/ui/button";
import React from "react";

function SaveProjectBtn() {
  return (
    <Button variant={"outline"}>
      <DocumentCheckIcon className="h-5 w-6" />
      Save
    </Button>
  );
}

export default SaveProjectBtn;

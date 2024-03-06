import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Button } from "@ui/button";
import React from "react";

function SaveProjectBtn() {
  return (
    <Button variant={"outline"} className="gap-1">
      <DocumentCheckIcon className="h-5 w-6" />
      <p>Save</p>
    </Button>
  );
}

export default SaveProjectBtn;

import { DocumentCheckIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/react'
import React from 'react'

function SaveProjectBtn() {
  return (
    <Button>
      <DocumentCheckIcon className="h-5 w-6"/>
      Save
    </Button>
  )
}

export default SaveProjectBtn
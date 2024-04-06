"use client";

import { LinkIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "./Block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

const type: ElementsType = "LinkBlock";
const extraAttributes = {
  label: "Link Block",
  text: "",
  metaTags: {} as { [property: string]: string },
  summary: [] as string[]
};

export const LinkBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 75 },
    parentId,
    extraAttributes,
  }),
  canvasComponent: CanvasComponent,
};

type CustomInstance = ProjectElementInstance & {
  extraAttributes: typeof extraAttributes;
};



function CanvasComponent({
  elementInstance,
}: {
  elementInstance: ProjectElementInstance;
}) {
  // const { updateElement, key } = useProject();
  const element = elementInstance as CustomInstance;
  const { placeHolder, text } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
  };

  return (
    <Card style={style} className="p-2 flex gap-1 flex-col">
      {
        element.extraAttributes.isRenderingBackup ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <>
            {Object.keys(element.extraAttributes.metaTags).length !== 0 ? (
              <CardHeader>
                <CardTitle>{element.extraAttributes?.metaTags["og:title"] || ""}</CardTitle>
                <div className="flex row">
                  <LinkIcon className="text-zinc-500 h-6 w-6 mr-1" />
                  <Link href={`//${element.extraAttributes.text}`} rel="noopener noreferrer" target="_blank"> {element.extraAttributes.text} </Link>
                </div>
                <div className="flex items-center">
                  <Image src="/images/placeholder.jpg" alt={element.extraAttributes.metaTags["og:title"]} width={300} height={200}></Image>
                  <CardDescription>{element.extraAttributes?.metaTags["og:description"] || ""}</CardDescription>
                </div>
                {element.extraAttributes.summary.length > 0 ? (
                  <CardContent>
                    <Card className="whitespace-pre-wrap">
                      <CardHeader>
                        <CardTitle>
                          Summary
                        </CardTitle>
                        <CardDescription>
                          {element.extraAttributes.summary[1]}
                        </CardDescription>
                      </CardHeader>
                      <CardHeader>
                        <CardTitle>
                          Highlights
                        </CardTitle>
                        <CardDescription>
                          {element.extraAttributes.summary[2]}
                        </CardDescription>
                      </CardHeader>
                      <CardHeader>
                        <CardTitle>
                          Keywords
                        </CardTitle>
                        <CardDescription>
                          {element.extraAttributes.summary[3]}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </CardContent>
                ) : (<></>)}
              </CardHeader>
            ) : (
              <div className="flex items-center">
                <LinkIcon className="text-zinc-500 h-6 w-6 mr-1" />
                <Input
                  className="grow disabled:bg-gray-100"
                  placeholder={placeHolder}
                  value={text}
                />
              </div>
            )}
          </>
        )
      }
    </Card>
  )
}


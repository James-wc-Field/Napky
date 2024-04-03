"use client";

import { LinkIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@/project/[projectID]/types/ProjectElements";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import useProject from "@/project/[projectID]/hooks/useProject";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { generateSummary, getOpenGraphTags } from "@/project/[projectID]/api"
import Link from "next/link"

const type: ElementsType = "LinkBlock";
const extraAttributes = {
  label: "Link Block",
  text: "",
  placeHolder: "Enter link URL...",
  metaTags: {} as { [property: string]: string },
  summary: [] as string[],
  isRenderingBackup: false
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

  toolbarElement: {
    icon: LinkIcon,
    label: "Link",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = ProjectElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function confirmUrl(str: string) {
  if (!str.startsWith('http')) {
    str = "https://" + str
  }
  return str
}
function isValidUrl(str: string) {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: ProjectElementInstance;
}) {
  const { updateElement, key } = useProject();
  const element = elementInstance as CustomInstance;
  const { placeHolder, text } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
  };
  function handleOnTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        text: e.target.value,
      },
    });
  }

  async function updateUrl() {
    const url = confirmUrl(element.extraAttributes.text)
    if (isValidUrl(url)) {
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          isRenderingBackup: true
        }
      })
      const metaTags = await getOpenGraphTags(url)
      const summary = await generateSummary(url, key)
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          isRenderingBackup: false,
          metaTags: metaTags,
          summary: summary

        }
      });
    }
  }

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
                  <Image src={element.extraAttributes.metaTags["og:image"]} alt={element.extraAttributes.metaTags["og:title"]} width={300} height={200} unoptimized></Image>
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
                  className="grow"
                  placeholder={placeHolder}
                  onChange={handleOnTextChange}
                  onBlur={async () => updateUrl()}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') updateUrl()
                  }}
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


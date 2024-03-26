"use client";

import { LinkIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@canvas/types/ProjectElements";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import useProject from "@canvas/hooks/useProject";
import Image from "next/image";
import React, { KeyboardEventHandler, Suspense, useEffect, useOptimistic, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { generateSummary, getOpenGraphTags } from "@/project/[projectID]/api"
import { useTransition } from "react";

const type: ElementsType = "LinkBlock";
const extraAttributes = {
  label: "Link Block",
  text: "",
  placeHolder: "Enter link URL...",
  metaTags: {} as { [property: string]: string },
  summary: "",
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
                <CardDescription>{element.extraAttributes?.metaTags["og:description"] || ""}</CardDescription>
                {element.extraAttributes.summary ? (
                  <CardContent>
                    <CardDescription>
                      {element.extraAttributes.summary}
                    </CardDescription>
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
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      const url = confirmUrl(element.extraAttributes.text)
                      if (isValidUrl(url)) {
                        updateElement(element.id, {
                          ...element,
                          extraAttributes: {
                            ...element.extraAttributes,
                            requestSending: true
                          }
                        })
                        const metaTags = await getOpenGraphTags(url)
                        const summary = await generateSummary(url, key)
                        updateElement(element.id, {
                          ...element,
                          extraAttributes: {
                            ...element.extraAttributes,
                            requestSending: false,
                            metaTags: metaTags,
                            summary: summary

                          }
                        });
                      }
                    }
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
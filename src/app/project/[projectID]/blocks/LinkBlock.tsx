"use client";

import { LinkIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@/project/[projectID]/types/ProjectElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Input } from "@ui/input";
import Image from "next/image";
import React, { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSummary, getOpenGraphTags } from "@/project/[projectID]/api";
import Link from "next/link";
import { useProjectStore } from "../storeProvider";

const type: ElementsType = "LinkBlock";
const extraAttributes = {
  text: "",
  metaTags: {} as { [property: string]: string },
  summary: [] as string[],
  isRenderingBackup: false,
};

const unstoredAttributes = {
  label: "Link Block",
  placeholder: "Enter link URL...",
};

export const LinkBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string, parentWidth?: number) => ({
    id,
    type,
    selected: false,
    position: { x: 0, y: 0 },
    size: { width: parentWidth ?? 300, height: 75 },
    parentId,
    extraAttributes,
    unstoredAttributes,
  }),

  addUnstoredAttributes: (elementInstance) => {
    return {
      ...elementInstance,
      unstoredAttributes,
    };
  },

  toolbarElement: {
    icon: LinkIcon,
    label: "Link",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = ProjectElementInstance & {
  extraAttributes: typeof extraAttributes;
  unstoredAttributes: typeof unstoredAttributes;
};

function confirmUrl(str: string) {
  if (!str.startsWith("http")) {
    str = "https://" + str;
  }
  return str;
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
  const updateElement = useProjectStore((state) => state.updateProjectElement);
  const key = useProjectStore((state) => state.key);
  const element = elementInstance as CustomInstance;
  const { text, metaTags, summary } = element.extraAttributes;
  const { placeholder, label } = element.unstoredAttributes;

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
    const url = confirmUrl(text);
    if (isValidUrl(url)) {
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          isRenderingBackup: true,
        },
      });
      const metaTags = await getOpenGraphTags(url);
      const summary = await generateSummary(url, key);
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          isRenderingBackup: false,
          metaTags,
          summary,
        },
      });
    }
  }
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <Card style={style} className="p-2 flex gap-1 flex-col">
      {element.extraAttributes.isRenderingBackup ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          {Object.keys(metaTags).length !== 0 ? (
            <CardHeader>
              <CardTitle>{metaTags["og:title"] || ""}</CardTitle>
              <div className="flex row">
                <LinkIcon className="text-zinc-500 h-6 w-6 mr-1" />
                <Link
                  href={`//${text}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {text}
                </Link>
              </div>
              <div className="flex items-center">
                <Image
                  src={metaTags["og:image"]} // TODO: Use og:image and try to fix CORS errors upon html-to-image extraction
                  alt={metaTags["og:title"] || "img"}
                  width={300}
                  height={200}
                  unoptimized
                  priority
                />
                <CardDescription>
                  {metaTags["og:description"] || ""}
                </CardDescription>
              </div>
              {summary.length > 0 ? (
                <CardContent>
                  <Card className="whitespace-pre-wrap">
                    <CardHeader>
                      <CardTitle>Summary</CardTitle>
                      <CardDescription>{summary[1]}</CardDescription>
                    </CardHeader>
                    <CardHeader>
                      <CardTitle>Highlights</CardTitle>
                      <CardDescription>{summary[2]}</CardDescription>
                    </CardHeader>
                    <CardHeader>
                      <CardTitle>Keywords</CardTitle>
                      <CardDescription>{summary[3]}</CardDescription>
                    </CardHeader>
                  </Card>
                </CardContent>
              ) : (
                <></>
              )}
            </CardHeader>
          ) : (
            <div className="flex items-center" ref={contentRef}>
              <LinkIcon className="text-zinc-500 h-6 w-6 mr-1" />
              <Input
                className="grow"
                placeholder={placeholder}
                onChange={handleOnTextChange}
                onBlur={async () => updateUrl()}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") updateUrl();
                }}
                value={text}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
}

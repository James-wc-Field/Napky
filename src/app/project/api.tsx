"use server"

import { getProject } from "../../graphql/queries";
import { updateProject } from "../../graphql/mutations";
import { ProjectElementInstance } from "@/project/types/ProjectElements";
import { cookieBasedClient } from '@/_lib/amplifyServerUtils';
import puppeteer from 'puppeteer';
import { parse } from 'node-html-parser';
import OpenAI from 'openai'
import { currentAuthenticatedUser } from "@/_lib/auth";


export async function getOpenGraphTags(url: string) {
  const html = parse(await (await fetch(url)).text());
  const attributes = html.querySelectorAll('meta').reduce<{ [property: string]: string }>((accumulator, element) => {
    if (element.getAttribute('property')?.startsWith('og') && element.hasAttribute('content')) {
      accumulator[element.getAttribute('property')!] = element.getAttribute('content')!;
    }
    return accumulator
  }, {})
  return attributes
}

/**
 * saves a project to the database
 * @param elements a list of elements from a project to save
 */
export async function saveProject(
  projectId: string,
  name: string,
  elements: ProjectElementInstance[]
) {
  const user = await currentAuthenticatedUser();
  if (!user) {
    throw new Error("User not found");
  }

  for (let element of elements) {
    delete element.unstoredAttributes;
  }

  await cookieBasedClient.graphql({
    query: updateProject,
    variables: {
      input: {
        id: projectId,
        userId: user.userId,
        name: name,
        description: "description",
        content: JSON.stringify(elements),
      },
    },
  });
}

/**
 * gets project data based on the projectID
 * @param projectID the id of the project to get
 */
export async function getProjectData(projectID: string) {
  const data = (await cookieBasedClient.graphql({
    query: getProject,
    variables: { id: projectID }
  })).data.getProject;
  return data;
}

async function getURLDom(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const html = await page.content();
  await browser.close();
  return html;

}

export async function generateSummary(url: string, apiKey: string) {
  if (apiKey === "") return ""
  const html = parse(await getURLDom(url));
  let elements = html.querySelectorAll('p');
  let element = html.querySelector('h1')
  let totalLength = 0;
  elements.forEach((el) => totalLength += el.text.length)
  let texts = elements.map(function (el) {
    return el.text.trim()
  }).join(' ')
  console.log(totalLength * 0.75)
  let openai;
  try {
    openai = new OpenAI({ apiKey });
  } catch (error) {
    console.log(error)
    return ""
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user", "content": `Your task is to summarize the website content using the provided html text. Your output should use the following template:
    ####Summary
    {Summarize the content in one sentence, ensuring it's no more than 30 words.}
    ####Highlights
    {Provide 5 highlights, starting with a summarizing phrase. }
    ####Keywords
    {Provide five relevant keywords based on the text content.}
    
    title: {${element}} text:{${texts}}`
    }]

  }
  )
  const summary = completion.choices[0].message.content
  // const sum = [{"Summary":summary?.split("Summary\n")[1]},{"Highlights":summary?.split("Highlights\n")[1]},{"Keywords":summary?.split("Keywords\n")[1]}]
  // return sum
  const sections = completion.choices[0].message.content?.split('####')
  let content: string[] = []
  sections?.forEach((section) => {
    const header = section.split("\n")[0]
    console.log("header", header)
    content.push(section.split(header)[1])
  })
  console.log(content)
  return content;

}
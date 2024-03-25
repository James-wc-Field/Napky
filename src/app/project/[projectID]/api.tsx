'use server'
import { getProject } from "../../../graphql/queries";
import { updateProject } from "../../../graphql/mutations";
import { ProjectElementInstance } from "@canvas/types/ProjectElements";
import { cookieBasedClient } from '@/lib/amplifyServerUtils';
import puppeteer from 'puppeteer';
import { parse } from 'node-html-parser';
import fs from 'fs';
import { convert } from 'html-to-text';
import OpenAI from 'openai'

export async function getOpenGraphTags(url: string){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded'});
  const html = parse(await page.content());
  await browser.close()
  console.log(html.querySelectorAll('meta'))

  const attributes= html.querySelectorAll('meta').reduce<{ [property: string]: string }>((accumulator,element) => {
      if (element.getAttribute('property')?.startsWith('og') && element.hasAttribute('content')){
          accumulator[element.getAttribute('property')!] = element.getAttribute('content')!;
      }
      return accumulator
  },{})
  return attributes
}

/**
 * saves a project to the database
 * @param elements a list of elements from a project to save
 */
export async function saveProject(projectId: string, name: string, elements: ProjectElementInstance[]) {
  await cookieBasedClient.graphql({
    query: updateProject,
    variables: {
      input: {
        id: projectId,
        userId: "user",
        name: name,
        description: "description",
        content: JSON.stringify(elements)
      }
    }
  });
}

/**
 * gets project data based on the projectID
 * @param projectID the id of the project to get
 */
export async function getProjectData(projectID: string) {
  return (await cookieBasedClient.graphql({
    query: getProject,
    variables: { id: projectID }
  })).data.getProject;
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
  const html = parse(await getURLDom(url));
  // const html = convert(await getURLDom(url))
  // fs.writeFileSync('total.html', html.toString());

  let elements = html.querySelectorAll('p');
  let element = html.querySelector('h1')
  let totalLength = 0;
  elements.forEach((el) => totalLength += el.text.length)
  let texts = elements.map(function (el) {
    return el.text.trim()
  }).join(' ')
  console.log(totalLength * 0.75)

  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user", "content": `Your task is to summarize the website content using the provided html text. You should ignore any javascript code that shows up in the provided text. Your output should use the following template:
    #### Summary
    {Summarize the content in one sentence, ensuring it's no more than 30 words.}
    #### Highlights
    {Provide 5 highlights, starting with a summarizing phrase. }
    #### Keywords
    {Provide five relevant keywords based on the text content.}
    
    title: {${element}} text:{${texts}}`
    }]

  }
  )
  console.log(completion.choices[0])

}

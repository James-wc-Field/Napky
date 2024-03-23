"use client";
import React from "react";
import { ProjectCard } from "@components/cards/ProjectCardSample";


// Types ------------------------
interface Project_Data {
  Project_Name: string,
  Project_ID: string,
  Username: string,
  img: string,
  Description: string,
  height?: string | null,
}
// ----------------------------------------------------


// hard coded data here, will need to be replaced with actual projects -------------------
let projects_list: Array<Project_Data> = [
    {"Project_ID": "1","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[336px]"},
    {"Project_ID": "2","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[366px]"},
    {"Project_ID": "3","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[209px]"},
    {"Project_ID": "4","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[398px]"},
    {"Project_ID": "5","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[329px]"},
    {"Project_ID": "6","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[264px]"},
    {"Project_ID": "7","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[302px]"},
    {"Project_ID": "8","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[432px]"},
    {"Project_ID": "9","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[324px]"},
    {"Project_ID": "10","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[424px]"},
    {"Project_ID": "11","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[220px]"},
    {"Project_ID": "12","Project_Name": "Project_Name","Username": "Username","img": "https://placehold.co/600x400","Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","height": " h-[277px]"},
]
// -------------------------------------------------



let column_count = 5;
let project_Columns: Array<Array<Project_Data>> = [];
for (let col = 0; col < column_count; col++) {
  let column: Array<Project_Data> = []
  project_Columns.push(column)
}

// This sorts the projects in the project list into the columns
let curr_col = 0;
for (let project of projects_list) {
  project_Columns[curr_col % column_count].push(project);
  curr_col++;
}

console.log(project_Columns)

// This commented out code doesn't work cause of something to do with rehydration in react ---------------------------
// function genHeight() {
//   let height = " h-[" + (Math.round(Math.random() * 300) + 200).toString() + "px]";
//   return height;
// }

// for (let project of projects_list) {
//   project['height'] = genHeight();
// }
// --------------------------------------------------------------------------

export default function Page() {

  return (
  <>
  <div className="p-16">
    <div className=" text-7xl mb-8">General</div>
      <div className="flex justify-between h-[200vh]">
        {
          project_Columns.map((column)=> {
            return (
              // these are the columns
              <div className="w-[calc(20%-2em)]">
                {
                  column.map((project: any) => {
                    return (
                      <div className={`w-full mb-8 ${project.height} bg-white`}>
                        <ProjectCard></ProjectCard>
                        {project.Project_ID}
                      </div>
                    )
                  })
                }

              </div>
            )

          })
        }
      </div>


  </div>
  </>)
}

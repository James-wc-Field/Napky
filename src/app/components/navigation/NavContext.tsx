"use client";

import { currentAuthenticatedUser } from "@/dashboard/api";
import { Project } from "@src/API";
import { AuthUser } from "aws-amplify/auth"
import { ReactNode, createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

type NavContextType = {
  username: string;
  project: string;

  setUser: (user: string) => void;
  setProject: (project: string) => void;
}

export const NavContext = createContext<NavContextType | null>(null);

export default function NavContextProvider({
  children, } : {
    children:ReactNode;
  }) {
  const [user, setUser] = useState<AuthUser|null>(null);

  currentAuthenticatedUser()
    .then((result) => {setUser(result)})
    .catch((err) => {console.log(err)});
}
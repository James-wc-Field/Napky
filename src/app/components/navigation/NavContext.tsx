import { AuthUser } from "aws-amplify/auth"

type NavContext = {
  username: string;
  project: string;

  setUser: (user: string) => void;
  setProject: (project: string) => void;
}


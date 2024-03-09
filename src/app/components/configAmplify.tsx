import config from "../../amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
Amplify.configure(config, { ssr: true });

export default function ConfigureAmplify() {
  return null;
}

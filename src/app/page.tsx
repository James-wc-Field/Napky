import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { redirect } from 'next/navigation'
export default function Home() {
  // If authenticated, redirect to the User discover page
  // Otherwise, redirect to the Guest discover page
  redirect('discover')
}

import { redirect } from 'next/navigation'
export default function Home() {
  // If authenticated, redirect to the User discover page
  // Otherwise, redirect to the Guest discover page
  redirect('discover')
}

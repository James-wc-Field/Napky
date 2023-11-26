export default function Page({ params }: { params: { userID: string } }) {
    return <div>My Post: {params.userID}</div>
  }
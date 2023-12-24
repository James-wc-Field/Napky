export default function Page({ params }: { params: { projectID: string } }) {
    return (
        <div>My Project: {params.projectID}</div>
    );
}
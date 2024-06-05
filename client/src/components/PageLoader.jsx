import '../style/css/PageLoader.css'

export default function PageLoader({message="Loading..."}) {
    return (
        <main className={"loader-main"}>
            <h3>{message}</h3>
        </main>
    );
}

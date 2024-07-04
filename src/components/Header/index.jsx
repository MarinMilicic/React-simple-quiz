import "./style.scss"

export default function Header({ children }) {
    return (
        <header className="header flex flex-jc-center flex-ai-center m-b-40">
            <h1>{children}</h1>
        </header>
    )
}

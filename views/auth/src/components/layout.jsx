export default function Layout({ children }) {
    return (
        <div id="container">
            <div id="page">{children}</div>
        </div>
    );
}


export  function FormLayout({ children }) {
    return (
        <div className="form_">
            <div id="page">{children}</div>
        </div>
    );
}



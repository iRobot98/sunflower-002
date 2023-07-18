import { Logo } from "./subcomponents/utils";

export default function Layout({ children }) {
    return (
        <div
            id="container"
            className="w-screen min-h-screen h-full  flex-center shrink-0"
        >
            <div id="page" className="">
                <div
                    id="header"
                    className=" w-full min-h-[1rem] top-0 bg-[green] p-2 flex"
                >
                    <Logo className="mx-auto" />
                </div>
                {children}
            </div>
        </div>
    );
}

export function FormLayout({ children }) {
    return (
        <div className="form_">
            <div id="page">{children}</div>
        </div>
    );
}

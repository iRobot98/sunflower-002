import { Logo } from "./subcomponents/utils";

export default function Layout({ children }) {
    return (
        <div
            id="container"
            className="w-screen h-screen bg-[#9df19de7] flex-center "
        >
            <div id="page" className="pt-[3rem]">
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

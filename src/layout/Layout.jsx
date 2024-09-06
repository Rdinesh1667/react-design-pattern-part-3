import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <>
            <main>
                <Header />
                <section>
                    <Outlet />
                </section>
            </main>
        </>
    );
}

export default Layout;
import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { NavbarOnline } from "../components/NavbarOnline"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { NavbarOffline } from "../components/NavbarOffline"



// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {

const {store} = useGlobalReducer()

    return (
        <ScrollToTop>
            {store.userOnline ? <NavbarOnline/> : <NavbarOffline/>}
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}
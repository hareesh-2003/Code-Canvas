import { Outlet } from "react-router-dom";
import Header from "../Pages/Header";

export default function Layout(){
return(
    <main>
    <Header/>
        <Outlet/>
    </main>

)

}
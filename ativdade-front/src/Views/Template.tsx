import { Outlet } from "react-router-dom";
import Navbar from "../Components/shared/Navbar";

export default function Template() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 p-4 overflow-auto bg-gray-900">
                <Outlet />
            </div>
        </div>
    );
}
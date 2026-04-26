import { Outlet, Navigate } from "react-router";
import { useStore } from "../store/store";
import { useShallow } from "zustand/shallow"





const GuestRoutes = () => {

    const {user} = useStore(useShallow((state) => ({user: state.user})))    
    
    if(user){
        console.log('user is authenticated, navigating to protected route')
        return <Navigate to='/demo' replace/>
    }

    return <Outlet/>
}

export default GuestRoutes
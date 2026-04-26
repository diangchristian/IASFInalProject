import { Outlet, Navigate } from "react-router"
import { useStore } from "../store/store";
import { useShallow } from "zustand/shallow"



const ProtectedRoutes = () => {
  
    const {user} = useStore(useShallow((state) => ({user: state.user})))  

    return user? <Outlet/> : <Navigate to="/" />
    
  

}

export default ProtectedRoutes
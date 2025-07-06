import { useLocation } from "react-router-dom"


const LogicPage  = ()=>{

    const location = useLocation()
    return(
        <section>
           LogicPage {location.pathname}
        </section>
    )
}

export default LogicPage
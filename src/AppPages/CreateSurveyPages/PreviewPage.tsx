import { useLocation } from "react-router-dom"


const PreviewPage  = ()=>{

    const location = useLocation()
    return(
        <section>
           PreviewPage {location.pathname}
        </section>
    )
}

export default PreviewPage
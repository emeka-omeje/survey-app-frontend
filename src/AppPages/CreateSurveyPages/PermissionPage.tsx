import { useLocation } from "react-router-dom"


const DistributionPage = ()=>{

    const location = useLocation()
    return(
        <section>
           DistributionPage {location.pathname}
        </section>
    )
}

export default DistributionPage
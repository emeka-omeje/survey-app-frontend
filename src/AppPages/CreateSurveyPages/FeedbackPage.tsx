import { useLocation } from "react-router-dom"


const FeedbackPage  = ()=>{

    const location = useLocation()
    return(
        <section>
           FeedbackPage {location.pathname}
        </section>
    )
}

export default FeedbackPage
import ItemOwnershipNavigator from "../ItemOwnershipNavigator"
import style from "./projectComponent.module.css"

const ProjectContentHeader = ()=>{
    return (
        <span className={style.projectContent_header}>
            <ItemOwnershipNavigator />
        </span>
    )
}

export default ProjectContentHeader
import { Outlet } from "react-router-dom";
import style from "./HomeAppLayouts/homeAppLayout.module.css"


const ItemComponentLayout = ()=>{
    return (
        <div className={style.app_layout_outlet_container}>
        <Outlet />
      </div>
    )
}

export default ItemComponentLayout;
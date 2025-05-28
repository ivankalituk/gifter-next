import './adminPanelAdditional.scss'

import { Link } from 'react-router-dom';
import { FC } from "react";



const AdminPanelAdditional: FC <{page : string}>= ({page}) =>{

    const chosen: number = 1;
    
    return (
        <div className="adminPanelAdditional">
            
            <Link className={page === 'gifts'? "chosen" : ""} to={'/adminPanel/suggests'}>Пропозиції</Link>
            <Link className={page === 'report'? "chosen" : ""} to={'/adminPanel/reports'}>Скарги</Link>
            <Link className={page === 'admins'? "chosen" : ""} to={'/adminPanel/admins'}>Керування адмінами</Link>
            <Link className={page === 'blacklist'? "chosen" : ""} to={'/adminPanel/blacklist'}>Чорний список</Link>
            <Link className={page === 'stats'? "chosen" : ""} to={'/adminPanel/stats'}>Статистика</Link>


        </div>
    )
}

export default AdminPanelAdditional
import './adminPanelAdditional.scss'

import Link from 'next/link';
import { FC } from "react";



const AdminPanelAdditional: FC <{page : string}>= ({page}) =>{

    const chosen: number = 1;
    
    return (
        <div className="adminPanelAdditional">
            
            <Link className={page === 'gifts'? "chosen" : ""} href={'/adminPanel/suggests'}>Пропозиції</Link>
            <Link className={page === 'report'? "chosen" : ""} href={'/adminPanel/reports'}>Скарги</Link>
            <Link className={page === 'admins'? "chosen" : ""} href={'/adminPanel/admins'}>Керування адмінами</Link>
            <Link className={page === 'blacklist'? "chosen" : ""} href={'/adminPanel/blacklist'}>Чорний список</Link>
            <Link className={page === 'stats'? "chosen" : ""} href={'/adminPanel/stats'}>Статистика</Link>


        </div>
    )
}

export default AdminPanelAdditional
import { FC } from "react";

import './markedList.scss'

import MarkedGift from "../markedIGift/markedGift";

const MarkedList: FC = () => {
    return(
        <div className="markedList">
            <div className="markedList_heading">Назва списку</div>
            
            <div className="markedList_container customScrollbar">
                <MarkedGift />
                <MarkedGift />
                <MarkedGift />
                <MarkedGift />
                <MarkedGift />
                <MarkedGift />
                <MarkedGift />
                <MarkedGift />
                <MarkedGift />
            </div>
        </div>
    )
}

export default MarkedList
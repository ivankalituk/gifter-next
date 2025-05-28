import Modal from '@/components/modal/modal';
import './markedGift.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'

import { FC } from "react";



const MarkedGift: FC = () => {
    return(
        <div className="markedGift">
            <div className="markedGift_container">

                <img src={sampleGiftPhoto} alt="giftPhoto" />
                
                <div className="markedGift_name">Херсонський кавун великий товстый жирный</div>
            </div>
            

            {/* <Modal> */}
        </div>
    )
}

export default MarkedGift
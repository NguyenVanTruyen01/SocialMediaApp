import { React, useState } from 'react'
import './TrendCard.scss'
import ShareModal from '../../Modal/ShareModal/ShareModal'
import { TrendData } from '../../../data/TrendData'

const TrendCard = () => {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className="TrendCard">
            <h3>Trends for you :</h3>

            {TrendData.map((trend, id) => {
                return (
                    <div className="trend" key={id}>
                        <span>#{trend.name}</span>
                        <span>{trend.shares}k shares</span>
                    </div>
                )
            })}

            <button
                className='btn r-btn'
                onClick={() => setModalOpened(true)}>Share</button>
            <ShareModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened} />

        </div>
    )
}

export default TrendCard

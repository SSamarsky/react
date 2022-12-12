import React from 'react'
import { NotFoundBlock } from '../../components/notFaoundBlock/NotFoundBlock'

export const NotFound = () => {
    return (
        <div>
            <NotFoundBlock />
            <p style={{fontSize: '20px', color: '#d60857', textAlign: 'center'}}>К сожадению данная страница отсутствует в нашем магазине</p>
        </div>
    )
}
import React from 'react'
import Image from 'next/Image'
import { workgroupId } from 'three/tsl'
import { tree } from 'next/dist/build/templates/app-page'
import UIHOVER from '@/app/Component/HoverPath/Hover'

const footer = () => {
  return (
    <div>
        <div className='left'>
            <Image className='footer-foto'></Image>
        </div>

        <div className='right'>
          <UIHOVER />
        </div>
    </div>
  )
}

export default footer
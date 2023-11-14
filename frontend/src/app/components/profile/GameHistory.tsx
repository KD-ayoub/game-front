import React from 'react';
import { NeuePlakFont, NeuePlakFontBold } from '@/app/utils/NeuePlakFont';

export default function GameHistory() {
  return (
    <div className='ml-4 mt-2'>
        <div className={`${NeuePlakFontBold.className}`}>Game History</div>
        <div className='w-[222px] bg-gradiant-to-b from-[#D1F] to-[#4A4853] '>
            <div className='overflow-x-auto overflow-y-auto'>
                <table>
                    <tr>
                        <th className={`${NeuePlakFont.className} text-[9px]`}>Players</th>
                        <th className={`${NeuePlakFont.className} text-[9px]`}>Result</th>
                        <th className={`${NeuePlakFont.className} text-[9px]`}>Level xp</th>
                        <th className={`${NeuePlakFont.className} text-[9px]`}>Time</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

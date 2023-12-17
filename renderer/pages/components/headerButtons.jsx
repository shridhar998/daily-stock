import React, {useState} from 'react'

const headerButtons = ({setShow, setShowEntrySale, setShowSales}) => {
    const bts = [
        {
            title : '916 Stock',
        },
        {
            title : '750 Stock',
        },
        {
            title : 'Silver Stock',
        }
    ]
    const handleClick = (itm) => {
        setShow(itm.title)
    }
  return (
    <div className='flex justify-around gap-16'>
        {
            bts.map((itm,idx)=>(
                <button
                    key={idx}
                    onClick={()=>handleClick(itm)}
                    className={`p-4 transition-all hover:scale-90 ease-in-out border border-black rounded-md ${itm.title === '916 Stock'?`hover:bg-[#80ff80]`:itm.title === '750 Stock'?`hover:bg-blue-300`:`hover:bg-gray-400`} cursor-pointer`}
                >
                    {itm.title}
                </button>
            ))
        }
        <div onClick={()=>{
            setShow('')
            setShowEntrySale("")
            }} className='p-4 transition-all hover:scale-90 ease-in-out border border-black rounded-md hover:bg-yellow-200 cursor-pointer'>
            Clear
        </div>
        <div onClick={()=>{
            setShow('')
            setShowEntrySale("")
            setShowSales(true)
            }} className='p-4 transition-all hover:scale-90 ease-in-out border border-black rounded-md hover:bg-yellow-200 cursor-pointer'>
            Show Sales
        </div>
    </div>
  )
}

export default headerButtons
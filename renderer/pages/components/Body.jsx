import React from 'react'

export const list916 = [
    'Chain 916',
    'Earring 916',
    'Jhumka 916',
    'GR 916',
    'LR 916',
    '2 Kunda 916',
    'Bali 916',
    'Locket 916'
]

export const list750 = [
    'Chain 750',
    'Earring 750',
    'Jhumka 750',
    'GR 750',
    'LR 750',
    '2 Kunda 750',
    'Bali 750',
    'Locket 750'
]
export const listSilver = [
    'Payal IC',
    'Payal 925',
    'Mix Payal',
    'Bichiya 925',
    'Mix Bichiya',
    'Hathpanja',
    'Kamardhani',
    'Bangkok items',
]

const Body = ({show, setShowEntrySale}) => {
    const handleClick = (itm) => {
        setShowEntrySale(itm)
    }
  return (
    <div>
    {
        show === ''
        ?
        <div className='flex w-full bg-blue-200 items-center justify-center mt-8 rounded-xl p-8'>
            Aage badhne ke liye upar diye gye stocks me se koi ek chune ☝️
        </div>
        :
        show === '916 Stock'?
        <div>
            <div className='flex items-center justify-center h-8 font-semibold text-2xl p-8'>916 ka list</div>
            <GridList
                arr={list916}
                handleClick={handleClick}
                color={'bg-[#ccffcc]'}
            />
        </div>
        :show === '750 Stock'?
        <div>
            <div className='flex items-center justify-center h-8 font-semibold text-2xl p-8'>750 ka list</div>
            <GridList
                arr={list750}
                handleClick={handleClick}
                color={'bg-blue-200'}
            />
        </div>
        :
        <div>
            <div className='flex items-center justify-center h-8 font-semibold text-2xl p-8'>Silver ka list</div>
            <GridList
                arr={listSilver}
                handleClick={handleClick}
                color={'bg-gray-100'}
            />
        </div>
    }
    </div>
  )
}

export default Body

export const GridList = ({arr = [], handleClick = () => {}, color='bg-[#ccffcc]', scale=''}) => {
    return(
       <div className={`grid grid-cols-4 grid-rows-2 gap-8 ${scale}`}>
        {
            arr.slice(0,4).map((itm,idx)=>(
                <div
                 key={idx}
                 onClick={()=>handleClick(itm)}
                 className={`col-span-1 ${color} cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out`}
                >
                    {itm}
                </div>
            ))
        }
        {
            arr.slice(-4).map((itm,idx)=>(
                <div
                 key={idx}
                 onClick={()=>handleClick(itm)}
                 className={`col-span-1 ${color} cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out`}
                >
                    {itm}
                </div>
            ))
        }
       </div>
    )
}
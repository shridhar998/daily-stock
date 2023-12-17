import React, {useState} from 'react'
import Link from 'next/link'

const EntrySaleBtns = ({show = '', setShow, title = "Admin"}) => {
    const bts = [
        {
            title : 'Sale',
        },
        {
            title : 'Entry',
        }
    ]
    // const handleClick = (itm) => {
        
    // }
  return (
    <div className={`flex justify-around gap-16 mt-8 ${show.length === 0?`hidden`:``}`}>
        {
            title === "Admin" ? (
                <>
                    <Link href={`/components/Sale?id=${show}&title=${title}`}>
                        <div
                        className={`p-4 border border-black rounded-md ${show.substring(show.length-3) === '916'?`hover:bg-[#80ff80]`:`hover:bg-blue-300`} cursor-pointer`}
                        >
                            <span>{show}{"  :  "}Sale</span>
                        </div>
                    </Link>
                    <Link href={`/components/Entry?id=${show}&title=${title}`}>
                        <div
                        className={`p-4 border border-black rounded-md ${show.substring(show.length-3) === '916'?`hover:bg-[#80ff80]`:`hover:bg-blue-300`} cursor-pointer`}
                        >
                            <span>{show}{"  :  "}Entry</span>
                        </div>
                    </Link>
                </>
            ) : (
                <Link href={`/components/Sale?id=${show}&title=${title}`}>
                    <div
                    className={`p-4 border border-black rounded-md ${show.substring(show.length-3) === '916'?`hover:bg-[#80ff80]`:`hover:bg-blue-300`} cursor-pointer`}
                    >
                        <span>{show}{"  :  "}Sale</span>
                    </div>
                </Link>
            )
        }
        <div onClick={()=>setShow('')} className='p-4 border border-black rounded-md hover:bg-yellow-200 cursor-pointer'>
            Clear
        </div>
    </div>
  )
}
// bts.map((itm,idx)=>(
//     <Link key={idx} href={`/components/${itm.title}?id=${show}&title=${title}`}>
//         {
//             title === "Admin" ? (
//                 <div
//                     className={`p-4 border border-black rounded-md ${itm.title === '916 Stock'?`hover:bg-[#80ff80]`:`hover:bg-blue-300`} cursor-pointer`}
//                 >
//                     <span>{show}{"  :  "}{itm.title}</span>
//                 </div>
//             )
//             : (
//                 itm.title === 'Sale' &&
//                 <div
//                     className={`p-4 border border-black rounded-md ${itm.title === '916 Stock'?`hover:bg-[#80ff80]`:`hover:bg-blue-300`} cursor-pointer`}
//                 >
//                     <span>{show}{"  :  "}{itm.title}</span>
//                 </div>
//             )
//         }
//     </Link>
// ))

export default EntrySaleBtns;
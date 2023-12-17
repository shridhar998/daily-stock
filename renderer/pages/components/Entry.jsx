import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Entry = () => {
  const router = useRouter();
  const { id, title } = router.query;
  const [weight, setWeight] = useState('')
  const [pcs, setPcs] = useState('');
  const [showToast, setShowToast] = useState(false)
  const [entryReport, setEntryReport] = useState([])
  const [success, setSuccess] = useState(false)
  // Read JSON data
  const fetchData = async () => {
   try {
     const response = await fetch('/api/read-stock-json');
     const jsonData = await response.json();
     setEntryReport([
      ...entryReport,
      jsonData
     ].flat(1));
     console.log(jsonData)
   } catch (error) {
     console.error('Error reading JSON file:', error);
   }
 };
 useEffect(()=>{
    fetchData()
 },[])
  // Write JSON data
  const writeJsonData = async (itm) => {
    setSuccess(false)
    const jsonData = [...entryReport, itm].flat(1); // Replace with your data

    try {
      const response = await fetch('/api/write-stock-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const responseData = await response.json();
      console.log('JSON data written successfully:', responseData);
      handleSuccess()
    } catch (error) {
      console.error('Error writing JSON file:', error);
    }
  };
  const handleSheetsAPI = () => {
    const date = new Date();
    const strDate = date.getDate().toString() + "/" + (date.getMonth() +1 ).toString() + "/" + date.getFullYear().toString()
    const PAYLOAD = {
        "Item": id,
        "Date" : strDate,
        "Weight" : weight,
        "Pcs":pcs,
    }
    writeJsonData(PAYLOAD)
  }

  const handleSuccess = () => {
    setSuccess(true)
    setShowToast(true)
    setWeight('')
    setPcs('')
    setTimeout(()=>{
        setShowToast(false)
        setSuccess(false)
    },1500)
  }
  
  return (
    <div>
        <div className=''>
        <Link href={'/home'}>
            <div onClick={()=>{}} className='p-4 hover:bg-orange-500 cursor-pointer rounded-xl w-fit hover:text-white'>Go back to home</div>
        </Link>
        </div>
        {
            showToast && !success && (
                <div className='flex items-center justify-center bg-red-500 text-white text-3xl font-semibold'>
                    Please enter all fields before proceeding
                </div>
            )
        }
        {
            showToast && success && (
                <div className='flex items-center justify-center bg-green-500 text-white text-3xl font-semibold'>
                    Entry successfully done
                </div>
            )
        }
        <div className='flex flex-col'>
            <div>Entry by {title}</div>
            <div className='flex justify-center text-2xl font-semibold'>Entry of {id}</div>
            <div className='p-4 ml-4 gap-4 flex flex-col'>

                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Weight</div>
                    <input
                        className='h-8 border border-black p-4 rounded-md'
                        placeholder='Enter weight'
                        value={weight}
                        onChange={(e)=>setWeight(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Pcs</div>
                    <input
                        className='h-8 border border-black p-4 rounded-md'
                        placeholder='Enter pieces'
                        value={pcs}
                        onChange={(e)=>setPcs(e.target.value)}
                    />
                </div>

            </div>
            <div 
            onClick={()=>{
                if(weight === ''){
                    setShowToast(true)
                    setTimeout(()=>{
                        setShowToast(false)
                    },1500)
                }
                else{
                    setShowToast(false)
                    handleSheetsAPI()
                }
            }}
            className='p-4 w-[30%] ml-[35%] bg-blue-400 hover:bg-blue-200 cursor-pointer rounded-md'>
                <div className='text-white text-lg font-semibold text-center'>Next</div>
            </div>
        </div>
    </div>
  )
}

export default Entry
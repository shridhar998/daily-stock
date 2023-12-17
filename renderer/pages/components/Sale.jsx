import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Sale = () => {
  const router = useRouter();
  const [salesReport, setSalesReport] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  // Read JSON data
  const fetchData = async () => {
    setLoading(true)
   try {
     const response = await fetch('/api/read-json');
     const jsonData = await response.json();
     setSalesReport([
      ...salesReport,
      jsonData
     ]);
     console.log(jsonData)
   } catch (error) {
     console.error('Error reading JSON file:', error);
   } finally{
    setLoading(false)
   }
 };
 useEffect(()=>{
    fetchData()
 },[])
  // Write JSON data
  const writeJsonData = async (itm) => {
    const jsonData = [...salesReport, itm].flat(1); // Replace with your data

    try {
      const response = await fetch('/api/write-json', {
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
  const { id, title } = router.query;
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState('')
  const [bill, setBill] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleKeyPress = (e, nextInputRef, nextDivRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextInputRef) {
        nextInputRef.current.focus();
      } else if (nextDivRef) {
        nextDivRef.current.click();
      }
    }
    else if(e.key === 'Escape'){
      e.preventDefault()
      if(nextDivRef){
        nextDivRef.current.click();
      }
    }
  };

  const phoneInputRef = useRef();
  const addressInputRef = useRef();
  const weightInputRef = useRef();
  const priceInputRef = useRef();
  const billInputRef = useRef();
  const nextButtonRef = useRef();
  const escButtonRef = useRef()

  const handleSheetsAPI = () => {
    const date = new Date();
    const strDate = date.getDate().toString() + "/" + (date.getMonth() +1 ).toString() + "/" + date.getFullYear().toString()
    const strTime  = date.getHours().toString() + ":" + date.getMinutes().toString()
    const PAYLOAD = {
        "Item" : id,
        "Date" : strDate,
        "Time" : strTime,
        "Customer's Name" : name,
        "Customer's Phone No." : phone,
        "Customer's Address" : address,
        "Weight" : weight,
        "Price" : price,
        "Bill No." : bill
    }
    writeJsonData(PAYLOAD)
  }
  const handleSuccess = () => {
    setSuccess(true)
    setShowToast(true)
    setWeight('')
    setAddress('')
    setBill('')
    setName('')
    setPhone('')
    setPrice('')
    setTimeout(()=>{
        setShowToast(false)
        setSuccess(false)
    },1500)
  }
  return (
    <div>
        <div className=''>
        <Link ref={escButtonRef} href={'/home'}>
            <div 
            className='p-4 hover:bg-orange-500 cursor-pointer rounded-xl w-fit hover:text-white'>
              Go back to home
            </div>
        </Link>
        </div>
        {
            showToast && !success && (
                <div className='flex items-center justify-center bg-red-500 text-white text-3xl font-semibold'>
                    Please enter at least Name, Phone no. and Weight fields before proceeding
                </div>
            )
        }
        {
            showToast && success && (
                <div className='flex items-center justify-center bg-green-500 text-white text-3xl font-semibold'>
                    Sale successfully done
                </div>
            )
        }
        <div className='flex flex-col'>
            <div>Sale by {title}</div>
            <div className='flex justify-center text-2xl font-semibold'>Sale of {id}</div>
            <div className='p-4 ml-4 gap-4 flex flex-col'>
                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Customer{"'"}s Name</div>
                    <input
                        className='h-8 border border-black p-4 rounded-md'
                        placeholder='Enter Customer Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        onKeyDown={(e)=>handleKeyPress(e,phoneInputRef)}
                    />
                </div>

                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Customer{"'"}s phone</div>
                    <input
                        ref={phoneInputRef}
                        className='h-8 border border-black p-4 rounded-md'
                        placeholder='Enter Customer phone'
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        onKeyDown={(e)=>handleKeyPress(e,addressInputRef)}
                    />
                </div>

                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Customer{"'"}s Address</div>
                    <input
                        className='h-28 border border-black p-4 rounded-md'
                        ref={addressInputRef}
                        placeholder='Enter Customer address'
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        onKeyDown={(e)=>handleKeyPress(e,weightInputRef)}
                    />
                </div>

                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Weight</div>
                    <input
                        className='h-8 border border-black p-4 rounded-md'
                        ref={weightInputRef}
                        placeholder='Enter weight'
                        value={weight}
                        onChange={(e)=>setWeight(e.target.value)}
                        onKeyDown={(e)=>handleKeyPress(e,priceInputRef)}
                    />
                </div>

                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Price</div>
                    <input
                        className='h-8 border border-black p-4 rounded-md'
                        ref={priceInputRef}
                        placeholder='Enter Price'
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        onKeyDown={(e)=>handleKeyPress(e,billInputRef)}
                    />
                </div>

                <div className='flex items-center gap-5'>
                    <div className='w-[10rem]'>Bill Number</div>
                    <input
                        className='h-8 border border-black p-4 rounded-md'
                        ref={billInputRef}
                        placeholder='Enter Bill Number'
                        value={bill}
                        onChange={(e)=>setBill(e.target.value)}
                        onKeyDown={(e)=>handleKeyPress(e, null, nextButtonRef)}
                    />
                </div>
                
            </div>
            <div 
            ref={nextButtonRef}
            onClick={()=>{
                if(name === '' || weight === ''){
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

export default Sale
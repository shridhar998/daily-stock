import React,{useEffect, useState} from 'react'
import HeaderButtons from './components/headerButtons'
import Body from './components/Body'
import EntrySaleBtns from './components/EntrySaleBtns'
import LoginForm from './LoginForm'
import { GridList, list750, list916, listSilver} from './components/Body'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from './components/LineChart';
Chart.register(CategoryScale);

export default function HomePage() {
  const [message, setMessage] = React.useState('No message found')
  const [show, setShow] = useState('')
  const [showEntrySale, setShowEntrySale] = useState('')
  const [loggedIn, setLoggedIn] = useState("")
  const [showSales, setShowSales] = useState(false)
  const [salesReport, setSalesReport] = useState([])
  const [entryReport, setEntryReport] = useState([])
  const [showItemData, setShowItemData] = useState([])
  const [showSilver, setShowSilver] = useState(false)
  const [show916, setShow916] = useState(false)
  const [show750, setShow750] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [totalSales, setTotalSales] = useState(0) 
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRowItem, setSelectedRowItem] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  // Read JSON data
  const fetchData = async () => {
    setLoading(true)
   try {
     const response = await fetch('/api/read-json');
     const jsonData = await response.json();
     setSalesReport([
      ...salesReport,
      jsonData
     ].flat(1));
     console.log(jsonData)
   } catch (error) {
     console.error('Error reading JSON file:', error);
   } finally{
    setLoading(false)
   }
 };

 const fetchStockData = async () => {
  try {
    const response = await fetch('/api/read-stock-json');
    const jsonData = await response.json();
    setEntryReport([
     ...entryReport,
     jsonData
    ].flat(1)
    );
    console.log(jsonData)
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
};
  const compareDates = (a, b) => {
    const dateA = new Date(a.Date.split('/').reverse().join('/'));
    const dateB = new Date(b.Date.split('/').reverse().join('/'));
    return dateA - dateB;
  };

  const handleLogout = () =>{
    setLoggedIn("")
    setShow('')
    setShowEntrySale("")
    window.sessionStorage.removeItem('Role')
  }
  
  React.useEffect(() => {
    window.ipc.on('message', (message) => {
      setMessage(message)
    })
  }, [])

  useEffect(()=>{
    if(showSales){
      fetchData()
      fetchStockData()
    }
  },[showSales])

  useEffect(()=>{
    if(selectedItem !== ""){
      let temp = entryReport.filter((itm)=> itm.Item === selectedItem).map((itm)=>(
        {
          "Date": itm.Date ,
          "Time" : "N/A",
          "Details" : "Entry",
          "In/Out Pcs": "+" + itm.Pcs ,
          "In/Out Weight": "+" + itm.Weight + "gm",
        }
      ))
      let pemp = salesReport.filter((itm)=> itm.Item === selectedItem).map((itm)=>(
        {
          "Date": itm.Date ,
          "Time" : itm.Time,
          "Details" : itm["Customer's Name"] + "(" + itm["Bill No."] + ")",
          "In/Out Pcs":  "-1",
          "In/Out Weight": "-" + itm.Weight + "gm",
        }
      ))
      temp = [...temp, ...pemp].sort(compareDates)
      if(temp.length > 0){
      let prefixWeight = Array.from({length : temp.length}).fill(0), prefixPcs = Array.from({length : temp.length}).fill(0)
      prefixWeight[0] = parseFloat(temp[0]["In/Out Weight"].replace(/gm$/, ''))
      prefixPcs[0] = parseInt(temp[0]["In/Out Pcs"])
      let sm = 0;
      for(let i=1;i<temp.length;i++){
        prefixPcs[i] = prefixPcs[i-1] + parseInt(temp[i]["In/Out Pcs"])
        let rt = temp[i]["In/Out Weight"].charAt(0) === "-" ? -1 * (parseFloat(temp[i]["In/Out Weight"].substring(1).replace(/gm$/, ''))):  parseFloat(temp[i]["In/Out Weight"].substring(1).replace(/gm$/, ''))
        if(rt<0){
          sm = sm +rt;
        }
        prefixWeight[i] = prefixWeight[i-1] + rt
      }
      for(let i=0;i<prefixWeight.length;i++){
        prefixWeight[i] = parseFloat(prefixWeight[i]).toFixed(2);
      }
      temp = temp.map((itm, idx)=>(
        {
          ...itm,
          "Balance Pcs": prefixPcs[idx],
          "Balance Weight": prefixWeight[idx],
          "Action" : loggedIn === "Admin" ? "Action" :"Not Access",
        }
      ))
      console.log(entryReport, salesReport, temp)
      setTotalSales((-1*sm).toFixed(2))
      setShowItemData(temp)
      }
    }
    else{
      setShowItemData([])
    }
  },[selectedItem])

  useEffect(()=>{
    setLoggedIn(window.sessionStorage.getItem("Role") || "")
    console.log("I'm the role : ",loggedIn)
  },[])

  const handleEdit = (itm) => {
    console.log(itm)
    setSelectedRowItem(itm)
    setShowEditModal(true)
  }

  const handleDelete = (itm) => {
    setSelectedRowItem(itm)
    setShowDeleteModal(true)
  }

  return (
    <React.Fragment>
      <div className='bg-[#FFF] flex flex-col items-center h-[48rem] relative'>
        {
          loggedIn === "" && (
            <LoginForm
              setLoggedIn={setLoggedIn}
            />
          )
        }
        {
          loggedIn === "Admin" ?
          <>
            {
              showSales && (
                <div>
                {
                  loading ?
                  <h1>Loading......</h1>
                  :
                  <div className='gap-5'>
                    
                    {
                      selectedItem === '' ?
                      <>
                      <button 
                    className="bg-blue-400 text-white p-4 mt-[1rem] rounded-md cursor-pointer"
                    onClick={()=>{
                      setSalesReport([])
                      setSelectedItem('')
                      setEntryReport([])
                      setShowItemData([])
                      setShowSales(false)
                     }}>
                      Go to Main Menu
                    </button>
                      <h1 className='text-center text-2xl'>Get Itemwise Report</h1>
                    <div 
                    onClick={()=>setShow916(!show916)}
                    className='text-center bg-[#ccffcc] cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out'>
                      916
                    </div>
                    {
                      show916 &&
                      <GridList
                      arr={list916}
                      scale='scale-75'
                      handleClick={setSelectedItem}
                      />
                    }
                    <div 
                    onClick={()=>setShow750(!show750)}
                    className='text-center bg-blue-200 cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out'>
                      750
                    </div>
                    {
                      show750 && 
                      <GridList
                      arr={list750}
                      scale='scale-75'
                      color='bg-blue-200'
                      handleClick={setSelectedItem}
                      />
                    }
                    <div 
                    onClick={()=>setShowSilver(!showSilver)}
                    className='text-center bg-gray-100 cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out'>
                      Silver
                    </div>
                    {
                      showSilver &&
                      <GridList
                      arr={listSilver}
                      scale='scale-75'
                      color='bg-gray-100'
                      handleClick={setSelectedItem}
                      />
                    }
                    <h1 className='text-center text-2xl'>Overall Sales Report</h1>
                    <GridTable
                      data={salesReport}
                    />
                    </>
                    :
                    <div className='flex flex-col gap-5'>
                    <button 
                    className="bg-blue-400 text-white p-4 mt-[5rem] rounded-md cursor-pointer"
                    onClick={()=>{
                      setSelectedItem('')
                      setShowItemData([])
                      setTotalSales(0)
                     }}>
                      Go back
                    </button>
                      <h1 className='text-center text-2xl'>{selectedItem} Report</h1>
                      <EditModal
                        visible={showEditModal}
                        onClose={()=>setShowEditModal(false)}
                        selectedRowItem={selectedRowItem}
                        setSelectedRowItem={setSelectedRowItem}
                      />
                      <DeleteModal
                        visible={showDeleteModal}
                        onClose={()=>setShowDeleteModal(false)}
                        setConfirmDelete={setConfirmDelete}
                      />
                      <GridTable
                        data={showItemData}
                        editItem={handleEdit}
                        deleteItem={handleDelete}
                        cols={7}
                        setSelectedRowItem={setSelectedRowItem}
                      />
                      <div className='bg-orange-300 p-8 text-2xl text-white font-semibold w-[30rem]'>
                        Total {selectedItem} sales : {totalSales}gm
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold mb-4 text-center">{selectedItem} Sales Chart</h1>
                        <LineChart data={showItemData.map((itm)=>(
                          {
                            date : itm.Date,
                            sale : itm["In/Out Weight"]?.charAt(0) === '-'? -1*parseFloat(itm["In/Out Weight"]).toFixed(2) : 0
                          }
                        ))}
                        />
                      </div>
                    </div>
                    }
                    
                  </div>
                }
                </div>
              )
            }
            {
              !showSales && (
              <div>
              <h1 className='mt-[6rem] text-2xl text-center'>Hello Admin</h1>
              <HeaderButtons setShow={setShow} setShowEntrySale={setShowEntrySale} setShowSales={setShowSales}/>
              <Body show={show} setShowEntrySale={setShowEntrySale}/>
              <EntrySaleBtns show={showEntrySale} setShow={setShowEntrySale} title={loggedIn}/>
              <div
                onClick={()=>handleLogout()}
                className='border border-black rounded-md p-4 bg-blue-500 hover:bg-blue-400 text-[#FFF] w-[50%] flex justify-center absolute bottom-[6rem] cursor-pointer'>
                  Log Out
              </div>
              </div>
              )
            }
          </>
          :
          loggedIn === "Operator"?
          <>
            {
               showSales && (
                <div>
                {
                  loading ?
                  <h1>Loading......</h1>
                  :
                  <div className='gap-5'>
                    
                    {
                      selectedItem === '' ?
                      <>
                      <button 
                    className="bg-blue-400 text-white p-4 mt-[1rem] rounded-md cursor-pointer"
                    onClick={()=>{
                      setSalesReport([])
                      setEntryReport([])
                      setSelectedItem('')
                      setShowItemData([])
                      setShowSales(false)
                     }}>
                      Go to Main Menu
                    </button>
                      <h1 className='text-center text-2xl'>Get Itemwise Report</h1>
                      <div 
                    onClick={()=>setShow916(!show916)}
                    className='text-center bg-[#ccffcc] cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out'>
                      916
                    </div>
                    {
                      show916 &&
                      <GridList
                      arr={list916}
                      scale='scale-75'
                      handleClick={setSelectedItem}
                      />
                    }
                    <div 
                    onClick={()=>setShow750(!show750)}
                    className='text-center bg-blue-200 cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out'>
                      750
                    </div>
                    {
                      show750 && 
                      <GridList
                      arr={list750}
                      scale='scale-75'
                      color='bg-blue-200'
                      handleClick={setSelectedItem}
                      />
                    }
                    <div 
                    onClick={()=>setShowSilver(!showSilver)}
                    className='text-center bg-gray-100 cursor-pointer border-black border p-4 rounded-md transition-all hover:scale-90 ease-in-out'>
                      Silver
                    </div>
                    {
                      showSilver &&
                      <GridList
                      arr={listSilver}
                      scale='scale-75'
                      color='bg-gray-100'
                      handleClick={setSelectedItem}
                      />
                    }
                    <h1 className='text-center text-2xl'>Overall Sales Report</h1>
                    <GridTable
                      data={salesReport}
                    />
                    </>
                    :
                    <div className='flex flex-col gap-5'>
                    <button 
                    className="bg-blue-400 text-white p-4 mt-[5rem] rounded-md cursor-pointer"
                    onClick={()=>{
                      setSelectedItem('')
                      setShowItemData([])
                      setTotalSales(0)
                     }}>
                      Go back
                    </button>
                      <h1 className='text-center text-2xl'>{selectedItem} Report</h1>
                      <GridTable
                        data={showItemData}
                        cols={7}
                      />
                      <div className='bg-orange-300 p-8 text-2xl text-white font-semibold w-[30rem]'>
                        Total {selectedItem} sales : {totalSales}gm
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold mb-4 text-center">{selectedItem} Sales Chart</h1>
                        <LineChart data={showItemData.map((itm)=>(
                          {
                            date : itm.Date,
                            sale : itm["In/Out Weight"]?.charAt(0) === '-'? -1*parseFloat(itm["In/Out Weight"]).toFixed(2) : 0
                          }
                        ))}
                        />
                      </div>
                    </div>
                    }
                    
                  </div>
                }
                </div>
              )
            }
            {
              !showSales && (
              <div>
              <h1 className='mt-[6rem] text-2xl text-center'>Hello Operator</h1>
              <HeaderButtons 
                setShow={setShow}
                setShowEntrySale={setShowEntrySale} 
                setShowSales={setShowSales}
              />
              <Body 
               show={show} 
               setShowEntrySale={setShowEntrySale}
              />
              <EntrySaleBtns 
               show={showEntrySale} 
               setShow={setShowEntrySale}
               title={loggedIn}
              />
              <div
                onClick={()=>handleLogout()}
                className='border border-black rounded-md p-4 bg-blue-500 hover:bg-blue-400 text-[#FFF] w-[50%] flex justify-center absolute bottom-[6rem] cursor-pointer'>
                  Log Out
              </div>
              </div>
              )
            }
          </>
          : loggedIn?.length > 0?
          <div className='flex items-center justify-center flex-col'>
            <div className='text-3xl'>Login Id or Password Incorrect, try again.</div>
            <div 
            onClick={()=>setLoggedIn("")}
            className='cursor-pointer bg-blue-500 hover:bg-blue-300 flex items-center justify-center p-4 w-[12rem] text-white'>
              Try Again
            </div>
          </div>
          :
          <></>
        }
      </div>
    </React.Fragment>
  )
}

const GridTable = ({data = [], cols = 10, deleteItem = () => {}, editItem = () => {} , setSelectedRowItem}) => {
  return(
    <>
    {
      cols == 10 ?(
      <div className={`grid grid-cols-10 scale-75`}>
      {
        data.length > 0 && Object.keys(data[0])?.map((itm,idx)=>(
          <div key={idx} className='bg-gray-500 text-white font-bold text-lg p-4 col-span-1 border border-black'>
            {itm}
          </div>
        ))
      }
      {
        data.length > 0 &&
         data?.map((item,idx)=>(
          Object.values(data[idx])?.map((itm,idx)=>(
            <div key={idx} className='bg-gray-300 font-semibold p-4 col-span-1 border border-black'>
              {
                idx === 9 ? <span className='text-[0.31rem]'>{itm}</span> :<span className='text-lg'>{itm}</span>
              }
            </div>
           ))
         ))
      }
    </div>
      )
    : (
    <div className={`grid grid-cols-8 scale-75`}>
      {
        data.length > 0 && Object.keys(data[0])?.map((itm,idx)=>(
          <div key={idx} className='bg-gray-500 text-white font-bold text-lg p-4 col-span-1 border border-black'>
            {itm}
          </div>
        ))
      }
      {
        data.length > 0 &&
         data?.map((item,idX)=>(
          Object.values(data[idX])?.map((itm,idx)=>(
            <>
            {
              itm === "Action" ?
              <div key={idx} className='flex bg-gray-300 flex-row items-center justify-center gap-3 col-span-1'>
                <button onClick={()=>{
                  setSelectedRowItem(Object.values(data)[idX])
                  editItem(Object.values(data)[idX])
                }} className='flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-300 text-white rounded-md'>Edit</button>
                <button onClick={()=>{
                  setSelectedRowItem(Object.values(data)[idX])
                  deleteItem(Object.values(data)[idX])
                }} className='flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-300 text-white rounded-md'>Delete</button>
              </div>
              : typeof itm ==='string' && itm?.charAt(0) === '-'?
                <div key={idx} className='bg-gray-300 font-semibold text-lg text-red-400 p-4 col-span-1 border border-black'>
                {itm}
                </div>
              : typeof itm ==='string' && itm?.charAt(0) === '+'?
                <div key={idx} className='bg-gray-300 font-semibold text-lg text-green-600 p-4 col-span-1 border border-black'>
                {itm}
                </div>
              :
              <div key={idx} className='bg-gray-300 font-semibold text-lg p-4 col-span-1 border border-black'>
              {itm}
              </div>
            }
            </>
           ))
         ))
      }
    </div>
    )
    }
    </>
  )
}
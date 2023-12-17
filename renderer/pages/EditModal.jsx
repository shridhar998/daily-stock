import React, { useEffect, useState } from 'react';

const EditModal = ({ onClose = () => {}, visible = false, selectedRowItem={},setSelectedRowItem}) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
    onClose(false);
  };

  useEffect(()=>{
    if(selectedRowItem){
      setPcs(selectedRowItem["In/Out Pcs"])
      setWeight(selectedRowItem["In/Out Weight"])
    }
  },[selectedRowItem])

  const [weight, setWeight] = useState("")
  const [pcs, setPcs] = useState("")

  const handleClick = () => {
    const updatePLD = {
      "In/Out Pcs":pcs,
      "In/Out Weight":weight
    }
    setSelectedRowItem(updatePLD)
    console.log(updatePLD)
    onClose(false)
  }

  return (
    <div onClick={() => onClose(false)}>
      {visible && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-50 z-[999]' onClick={handleModalClick}>
          <div className='bg-white p-6 rounded-md' onClick={(e) => e.stopPropagation()}>
          <div className='flex flex-col items-center justify-center gap-5'>
                <div className='text-lg text-center'>Edit these fields</div>
                <div className='flex flex-row gap-6'>
                  <div className='gap-5'>
                    <span>In/Out Pcs</span>   
                    <input
                      className='h-8 border border-black p-4 rounded-md'
                      value={pcs}
                      onChange={(e)=>setPcs(e.target.value)}
                    />
                  </div>
                  <div className='gap-5'>
                    <span>In/Out Weight</span>
                    <input
                      className='h-8 border border-black p-4 rounded-md'
                      value={weight}
                      onChange={(e)=>setWeight(e.target.value)}
                    />
                  </div>
                  <div 
                  onClick={handleClick} 
                  className='p-4 text-white flex items-center justify-center cursor-pointer hover:bg-blue-300 bg-blue-500'>
                    Save Changes
                  </div>
                </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;

import React from 'react';

const DeleteModal = ({ onClose = () => {}, visible = false, setConfirmDelete}) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
    onClose(false);
  };

  return (
    <div onClick={() => onClose(false)}>
      {visible && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-50 z-[999]' onClick={handleModalClick}>
          <div className='bg-white p-6 rounded-md' onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col items-center justify-center gap-5'>
                <div className='text-lg text-center'>Are you sure to delete this?</div>
                <div className='flex flex-row gap-6'>
                    <div onClick={()=>setConfirmDelete(true)} className='p-4 text-white flex items-center justify-center cursor-pointer hover:bg-blue-300 bg-blue-500'>Yes</div>
                    <div onClick={handleModalClick} className='p-4 text-white flex items-center justify-center cursor-pointer hover:bg-red-300 bg-red-500'>No</div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;

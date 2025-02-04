import React from 'react';

const NewLessterBox = () => {

    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off </p>
            <p className='text-gray-400 mt-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ratione iste officiis, aperiam repellat nobis quis dolor nisi architecto rem.
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border bg-slate-300 '>
                <input className='w-full sm:flex-1 outline-none px-3 py-2 bg-slate-300 ' type="email" required  placeholder='Enter your emai'/>
                <button type='submit' className='bg-black text-white text-xl px-10 py-4 pl-3'>
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
}

export default NewLessterBox;

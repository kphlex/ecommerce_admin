import {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';


export default function ProductForm({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice,
    images
}) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const router = useRouter();
    const [goToProducts, setGoToProducts] = useState(false);


    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title, description, price}
        if (_id) {
            // Update
            await axios.put('/api/products', {...data,_id});
        } else {
            // Create
            await axios.post('/api/products', data )
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    return (
            <form onSubmit={saveProduct}>
                <label>Product Name</label>
                <input 
                    type='text' 
                    placeholder='Product Name' 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)}/>
                <label>
                    Images
                </label>
                <div className='mb-2'>
                    <label className='w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-800 rounded-lg bg-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                        Upload
                    <input type="file" className='hidden'/>
                    </label>
                    {
                        !images?.length && (
                            <div>No Current Images</div>
                        )
                    }
                </div>
                <label>Description</label>
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={ev => setDescription(ev.target.value)}/>
                <label>Price</label>
                <input 
                    type='number' 
                    placeholder='Price'
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}/>
                <button 
                type='submit' 
                className="btn-primary">
                    Save
                </button>
            </form>
    )
}
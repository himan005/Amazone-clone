import { StarIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

export default function CheckoutProduct({id, title, description, price, rating, category, image, hasPrime}) {
  
  const dispatch =useDispatch()

  const addItemToBasket = () => {
    const product = {
        id, title, description, price, rating, category, image, hasPrime
    }
    dispatch(addToBasket(product))
  }

  const removeItemFromCart = () =>{
    
    dispatch(removeFromBasket({id}))
  }

  return (
    <div className="grid grid-cols-5">
        <Image src={image} height={200} width={200} objectFit="contain" />
        <div className="col-span-3 mx-5">
            <p>{title}</p>
            <div className="flex">
                {
                    Array(rating)
                        .fill()
                        .map((_,i) =>(
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))
                }
            </div>
            <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>
            <Currency quantity={price} currency="USD" />
            {hasPrime && (
                <div className='flex items-center space-x-2'>
                    <img className="w-12" loading='lazy' src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}
        </div>
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button className="button" onClick={addItemToBasket}>Add To Cart</button>
            <button className="button" onClick={removeItemFromCart}>Remove From Cart</button>
        </div>
    </div>
  )
}

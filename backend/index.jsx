import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Dialog } from 'radix-ui';

// const App = () => {
//    const [open, setOpen] = React.useState(false);

//    return (
//       <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
//          <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
//             <img
//                src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
//                alt='Next.js logo'
//                width={180}
//                height={38}
//             />
//             <ol className='list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
//                <li className='mb-2 tracking-[-.01em]'>
//                   Get started by editing{' '}
//                   <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold'>
//                      app/page.tsx
//                   </code>
//                   .
//                </li>
//                <li className='tracking-[-.01em]'>Save and see your changes instantly.</li>
//             </ol>

//             <button className='bg-blue-500 text-white p-2 rounded'>Click me</button>

//             <Dialog.Root open={open} onOpenChange={setOpen}>
//                <Dialog.Trigger>Open</Dialog.Trigger>
//                <Dialog.Portal>
//                   <Dialog.Overlay />
//                   <Dialog.Content>
//                      <Dialog.Title>Hello there</Dialog.Title>
//                      <div className='bg-white p-4 rounded-md text-red-500'>Hello there</div>
//                   </Dialog.Content>
//                </Dialog.Portal>
//             </Dialog.Root>
//          </main>
//       </div>
//    );
// };

import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';


function App() {
   const [selectedSize, setSelectedSize] = useState(null);
   const [selectedColor, setSelectedColor] = useState('white');
   const [isFavorite, setIsFavorite] = useState(false);

   const sizes = [
      { value: 'us7', label: 'US 7', available: true },
      { value: 'us8', label: 'US 8', available: true },
      { value: 'us9', label: 'US 9', available: true },
      { value: 'us10', label: 'US 10', available: false },
      { value: 'us11', label: 'US 11', available: true },
      { value: 'us12', label: 'US 12', available: true },
   ];

   const colors = [
      { value: 'white', label: 'White', hex: '#ffffff' },
      { value: 'black', label: 'Black', hex: '#000000' },
      { value: 'red', label: 'Red', hex: '#ef4444' },
   ];

   return (
      <div className='max-w-md overflow-hidden rounded-xl bg-white shadow-lg'>
         {/* Product Image Section */}
         <div className='relative bg-gray-100 p-4'>
            <button
               onClick={() => setIsFavorite(!isFavorite)}
               className='absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100'
               aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
               <Heart
                  className={`h-5 w-5 ${
                     isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
               />
            </button>
            <span className='absolute left-4 top-4 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white'>
               New Arrival
            </span>
            <div className='flex h-64 items-center justify-center overflow-hidden'>
               <img
                  src='https://images.unsplash.com/photo-1562183241-b937e95585b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww'
                  alt='Air Max Pulse'
                  className='h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105'
               />
            </div>
         </div>

         {/* Product Details Section */}
         <div className='space-y-4 p-6'>
            <div>
               <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-bold text-gray-900'>Air Max Pulse</h3>
                  <div className='text-xl font-bold text-gray-900'>$160.00</div>
               </div>
               <p className='text-sm text-gray-500'>Men&apos;s Running Shoe</p>
            </div>

            {/* Color Selection */}
            <div className='space-y-2'>
               <h4 className='font-medium text-gray-900'>Color</h4>
               <div className='flex space-x-2'>
                  {colors.map(color => (
                     <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`h-8 w-8 rounded-full ${
                           selectedColor === color.value
                              ? 'ring-2 ring-blue-500 ring-offset-2'
                              : 'border border-gray-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Select ${color.label} color`}
                     />
                  ))}
               </div>
            </div>

            {/* Size Selection */}
            <div className='space-y-2'>
               <h4 className='font-medium text-gray-900'>Size</h4>
               <div className='grid grid-cols-3 gap-2'>
                  {sizes.map(size => (
                     <button
                        key={size.value}
                        onClick={() => size.available && setSelectedSize(size.value)}
                        disabled={!size.available}
                        className={`rounded-md border px-3 py-2 text-sm transition-colors
                  ${
                     !size.available
                        ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                        : selectedSize === size.value
                        ? 'border-blue-500 bg-blue-50 font-medium text-blue-600'
                        : 'border-gray-200 hover:bg-gray-50'
                  }`}
                     >
                        {size.label}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Add to Cart Button */}
         <div className='bg-gray-50 p-6'>
            <button className='flex w-full items-center justify-center gap-2 rounded-md bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800'>
               <ShoppingBag className='h-5 w-5' />
               Add to Cart
            </button>
         </div>
      </div>
   );
}

createRoot(document.getElementById('root')).render(<App />);

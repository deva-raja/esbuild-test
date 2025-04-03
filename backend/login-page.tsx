import { Mail, Lock, Eye, EyeOff, Github, Twitter } from 'lucide-react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Button } from './ui/button';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from './ui/alert-dialog';

function LoginPage() {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <>
         <div className='flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg'>
               <div className='text-center'>
                  <h2 className='text-3xl font-bold tracking-tight text-black'>Welcome back</h2>
                  <p className='mt-3 text-sm text-gray-500'>Please enter your details to sign in</p>
               </div>

               <form className='space-y-6' action='#' method='POST'>
                  <div className='space-y-4'>
                     <div className='space-y-2'>
                        <label
                           htmlFor='email-address'
                           className='block text-sm font-medium text-gray-700'
                        >
                           Email
                        </label>
                        <div className='relative'>
                           <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                              <Mail className='h-5 w-5 text-gray-400' />
                           </div>
                           <input
                              id='email-address'
                              name='email'
                              type='email'
                              autoComplete='email'
                              required
                              className='block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm'
                              placeholder='Enter your email'
                           />
                        </div>
                     </div>

                     <div className='space-y-2'>
                        <label
                           htmlFor='password'
                           className='block text-sm font-medium text-gray-700'
                        >
                           Password
                        </label>
                        <div className='relative'>
                           <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                              <Lock className='h-5 w-5 text-gray-400' />
                           </div>
                           <input
                              id='password'
                              name='password'
                              type={showPassword ? 'text' : 'password'}
                              autoComplete='current-password'
                              required
                              className='block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm'
                              placeholder='••••••••'
                           />
                           <button
                              type='button'
                              className='absolute inset-y-0 right-0 flex items-center pr-3'
                              onClick={() => setShowPassword(!showPassword)}
                           >
                              {showPassword ? (
                                 <EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-700' />
                              ) : (
                                 <Eye className='h-5 w-5 text-gray-400 hover:text-gray-700' />
                              )}
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className='flex items-center justify-between'>
                     <div className='flex items-center'>
                        <input
                           id='remember-me'
                           name='remember-me'
                           type='checkbox'
                           className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
                        />
                        <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                           Remember me
                        </label>
                     </div>

                     <div className='text-sm'>
                        <a href='#' className='font-medium text-gray-700 hover:text-black'>
                           Forgot password?
                        </a>
                     </div>
                  </div>

                  <div className='pt-2'>
                     <AlertDialog>
                        <AlertDialogTrigger className='w-full'>
                           <button
                              type='submit'
                              className='group relative flex w-full justify-center rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
                           >
                              Sign in
                           </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                           <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                 This action cannot be undone. This will permanently delete your
                                 account and remove your data from our servers.
                              </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                           </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                  </div>
               </form>

               <div>
                  <div className='relative'>
                     <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-200' />
                     </div>
                     <div className='relative flex justify-center text-sm'>
                        <span className='bg-white px-4 text-gray-500'>Or continue with</span>
                     </div>
                  </div>

                  <div className='mt-6 grid grid-cols-2 gap-3'>
                     <button
                        type='button'
                        className='inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
                     >
                        <Github className='h-5 w-5' />
                        <span>GitHub</span>
                     </button>

                     <button
                        type='button'
                        className='inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
                     >
                        <Twitter className='h-5 w-5' />
                        <span>Twitter</span>
                     </button>
                  </div>
               </div>

               <div className='text-center text-sm text-gray-500'>
                  Not a member?{' '}
                  <a href='#' className='font-medium text-black hover:underline'>
                     Create an account
                  </a>
               </div>
            </div>
         </div>
      </>
   );
}

createRoot(document.getElementById('root')).render(<LoginPage />);

import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { Loader2, Code, Play, Send } from 'lucide-react';

export default function CodeCompiler() {
   const iframeRef = useRef<HTMLIFrameElement>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [isCompiled, setIsCompiled] = useState(false);
   const [inputValue, setInputValue] = useState('');

   const getCompiledFile = async () => {
      setIsLoading(true);
      setError(null);

      try {
         const response = await axios.get('http://localhost:3000/', {
            responseType: 'text',
         });

         const iframeDoc =
            iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;

         if (!iframeDoc) {
            setError('Could not access iframe document');
            setIsLoading(false);
            return;
         }

         iframeDoc.open();
         iframeDoc.write(`
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
                  Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                padding: 1rem;
              }
            </style>
          </head>
          <body class="bg-gray-50 text-gray-900">
            <div id="root"></div>
            <script type="module">
              ${response.data}
            </script>
          </body>
        </html>
      `);
         iframeDoc.close();
         setIsCompiled(true);
      } catch (error) {
         console.error('Error fetching compiled file:', error);
         setError('Failed to fetch compiled code. Please check if your server is running.');
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className='flex h-screen w-full'>
         {/* Main Content */}
         <div className='flex flex-1 overflow-hidden'>
            {/* Left Panel - Chat */}
            <div className='w-1/2 border-r border-gray-200 flex flex-col bg-gray-50'>
               {/* Chat Header */}
               <div className='p-4 border-b border-gray-200 bg-white'>
                  <h2 className='text-lg font-semibold'>AI Code Compiler</h2>
                  <p className='text-sm text-gray-500'>
                     Ask AI to generate and compile code for you
                  </p>
               </div>

               {/* Chat Messages */}
               <div className='flex-1 overflow-auto p-4 space-y-4'>
                  {/* Welcome Message */}
                  <div className='flex items-start'>
                     <div className='w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mr-3 flex-shrink-0'>
                        <Code className='h-4 w-4' />
                     </div>
                     <div className='bg-white p-3 rounded-lg shadow-sm max-w-[85%]'>
                        <p className='text-sm'>
                           Welcome! I can help you generate and compile code. Just type your request
                           and click "Compile & Run" to see the results.
                        </p>
                     </div>
                  </div>

                  {/* Status Message - only show when relevant */}
                  {(isCompiled || isLoading || error) && (
                     <div className='flex items-start'>
                        <div className='w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mr-3 flex-shrink-0'>
                           <Code className='h-4 w-4' />
                        </div>
                        <div className='bg-white p-3 rounded-lg shadow-sm max-w-[85%]'>
                           {isLoading && (
                              <p className='text-sm flex items-center'>
                                 <Loader2 className='h-3 w-3 animate-spin mr-2' />
                                 Compiling your code...
                              </p>
                           )}
                           {error && (
                              <div className='text-sm text-red-600'>
                                 <p className='font-medium'>Error:</p>
                                 <p>{error}</p>
                              </div>
                           )}
                           {isCompiled && !isLoading && !error && (
                              <p className='text-sm flex items-center text-green-600'>
                                 <div className='h-2 w-2 rounded-full bg-green-500 mr-2'></div>
                                 Code compiled successfully! Check the preview.
                              </p>
                           )}
                        </div>
                     </div>
                  )}
               </div>

               {/* Input Area */}
               <div className='p-4 border-t border-gray-200 bg-white'>
                  <div className='flex flex-col gap-3'>
                     <button
                        onClick={getCompiledFile}
                        disabled={isLoading}
                        className='w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 rounded-md flex items-center justify-center transition-colors'
                     >
                        {isLoading ? (
                           <>
                              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                              Compiling...
                           </>
                        ) : (
                           <>
                              <Play className='mr-2 h-4 w-4' />
                              Compile & Run
                           </>
                        )}
                     </button>

                     <div className='flex gap-2 items-center'>
                        <input
                           type='text'
                           placeholder='Ask AI to build...'
                           value={inputValue}
                           onChange={e => setInputValue(e.target.value)}
                           className='flex-1 bg-gray-50 border border-gray-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                        />
                        <button className='rounded-full bg-black text-white hover:bg-gray-800 p-2 flex items-center justify-center transition-colors'>
                           <Send className='h-4 w-4' />
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Panel - Preview */}
            <div className='w-1/2 flex flex-col'>
               <div className='p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between'>
                  <div className='flex items-center'>
                     <div className='flex space-x-1.5 mr-4'>
                        <div className='w-3 h-3 rounded-full bg-red-500'></div>
                        <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                        <div className='w-3 h-3 rounded-full bg-green-500'></div>
                     </div>
                     <span className='text-sm text-gray-500'>Preview</span>
                  </div>
                  <div className='text-sm text-gray-500'>
                     {isCompiled ? 'Compiled' : 'Not compiled'}
                  </div>
               </div>

               <div className='flex-1 relative'>
                  {!isCompiled && !isLoading && (
                     <div className='absolute inset-0 flex items-center justify-center bg-gray-50'>
                        <div className='text-center text-gray-500'>
                           <Code className='h-12 w-12 mx-auto mb-4 text-gray-400' />
                           <p>Click "Compile & Run" to see the preview</p>
                        </div>
                     </div>
                  )}

                  {isLoading && (
                     <div className='absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10'>
                        <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
                     </div>
                  )}

                  <iframe
                     ref={iframeRef}
                     className='w-full h-full border-0'
                     title='Code Preview'
                     sandbox='allow-scripts allow-same-origin'
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

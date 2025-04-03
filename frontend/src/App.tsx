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
            :root {
  --background: white;
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
 
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}
 
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
 
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
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

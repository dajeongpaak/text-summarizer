import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Heading from './components/heading';
import ButtonGroup from './components/buttonGroup';
import Button from './components/button';
import Spinner from './assets/spinner';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [wordCounter, setWordCounter] = useState('0')
  const [isValidated, setIsValidated] = useState(false)
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (prompt === '') {
      setWordCounter(0);
    } else {
      setWordCounter(prompt.trim().split(' ').length)
    }
  }, [prompt]);

  const handleChange = (e) => {

    if(wordCounter <= 50) {
      setIsValidated(false)
    } else if ( 50 < wordCounter && wordCounter <= 400 ) {
      setIsValidated(true)
    } else {
      setIsValidated(false)
    }

    setPrompt(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(wordCounter <= 50) {
      toast('Text must be at least 50 words')
      setIsOpen(false)
    } 
      else if ( 50 < wordCounter && wordCounter <= 400 ) {
        try {
          setIsLoading(true)
          setIsOpen(true)
          
          const requestOption = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt }),
          }
          const response = await fetch('/summarize', requestOption)

          if(response.ok) {
            const data = await response.json()
            const { content } = data

            setContent(content)
          } else {
            console.error('error occured with status code:', response.status)
          }

        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }

    } else {
      toast('Text must be less than 400 words')
      setIsOpen(false)
    }
 
  }

  const handleCopyClick = () => {
    console.log('copied!')
  }

  return (
    <div className="h-auto container mx-auto pt-16 flex justify-center items-center max-[320px]:pt-0 md:h-full md:pt-0">
      <div className="grid grid-cols-12 gap-5 w-full">
        <header className="col-span-12 md:mb-2 lg:mb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <h1 className="text-5xl font-medium underline md:text-7xl">
              TL; si
            </h1>
            <h2>
              [Too Long; Summarize It] : <br />
              This tool will summarize long tedious text for you.
            </h2>
          </div>
        </header>
        <main className="col-span-12"> 
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="card">
              <form
                onSubmit={handleSubmit} 
                action="/summarize"
                method="POST"
                className="h-full"
              >
                <Heading 
                h3='Summarizer'
                >
                  <p className="md:mr-4">
                    <span 
                      className={`
                      ${isValidated && isValidated ? 
                      'text-black' : 
                      'text-red-500'}
                       text-xl`
                      }>{wordCounter}
                    </span> Words
                  </p>
                </Heading>
                <textarea 
                  name="prompt"
                  className="card__content outline-none resize-none" 
                  placeholder="Enter text here"
                  value={prompt}
                  onChange={handleChange}
                >
                </textarea>
                <ButtonGroup>
                  <button 
                    type="submit"
                    className="w-full font-bold text-2xl no-underline"
                  >
                    Summarize
                  </button>
                  <ToastContainer />
                </ButtonGroup>
              </form>
            </div>
            <div className={`${ isOpen ? 'block mb-16' : 'hidden' } card md:block md:mb-0`}>
                <Heading 
                  h3='Summarized Text'
                />
                <div className="card__content overflow-y-scroll relative">
                  { isLoading && isLoading ? <Spinner /> : null }
                  { content && <p>{content}</p>}
                </div>
                <ButtonGroup styles="justify-between items-center">
                  <Button 
                    icon="📑"
                    styles="border-r"
                    content="Copy"
                    onClick={handleCopyClick}
                  />
                  <Button 
                    icon="⤵️"
                    content="Download"
                  />
                  <Button 
                    icon="🗑️"
                    styles="border-l"
                    content="Clear"
                  />
                </ButtonGroup>
            </div>
          </div>
        </main>
        <footer className="col-span-12 mb-4">
          <p className="text-sm font-light text-neutral-400">      
           Powered by OpenAI 🤖
          </p>
          <p className="text-sm font-light text-neutral-400 flex">Developed by DJ with &nbsp;
            <span className="flex">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/240px-React-icon.svg.png" alt="React Icon" width={22} height={20}/>&nbsp;&&nbsp;
                <img src="https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/node-js-icon.svg" alt="NodeJS Icon" width={20} height={16}/>
                &nbsp;&
                🔥
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

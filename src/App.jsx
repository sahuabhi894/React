import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenretor = useCallback(
    () => {
      let pass= ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (numberAllowed) str += "0123456789"
      if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
      for (let i = 1; i <= length; i++) {
        let char =  Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }
      setPassword(pass)

    },
    [length,numberAllowed,charAllowed,setPassword],
  )

  const copyPassword = useCallback(
    () => {
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0, 999)
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )
  
  useEffect(() => {
    passwordGenretor()
  }, [length,numberAllowed,charAllowed,passwordGenretor])
  
  

  return (
    <div className='bg-green-200 w-full h-full'>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref = {passwordRef}
        />
        <button
        onClick={copyPassword}
        className='outline-none bg-blue-700 text-white px-5 py-0.5 shrink-0'
        >copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-3">
          <input type="checkbox"
          defaultChecked = {numberAllowed}
          id= "numberInput"
          onChange={() => {setNumberAllowed((prev) => !prev)}} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-3">
          <input type="checkbox"
          defaultChecked = {charAllowed}
          id= "characterInput"
          onChange={() => {setCharAllowed((prev) => !prev)}} />
          <label htmlFor="characterInput">Charcters</label>
        </div>
      </div>

    </div>
    </div>
  )
}

export default App

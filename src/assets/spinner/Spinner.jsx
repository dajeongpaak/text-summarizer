
import spinner from './spinner.gif'

export default function Spinner() {
  return (
    <img 
        src={spinner} 
        alt="loading indicator"
        className="w-8 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
    />
  )
}

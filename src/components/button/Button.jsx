
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function Button({ icon, styles, content, onClick }) {
  return (
    <Tippy content={content}>
      <div className="flex-auto h-full">
          <button 
            className={`w-full mx-auto text-xl h-full ${styles}`}
            onClick={onClick}
          >{icon}</button>
      </div>
    </Tippy>
  )
}

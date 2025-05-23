// export function InputBox({label,placeholder,onChange}){
//   return <div>
//     <div className="text-sm font-medium text-left py-2">
//       {label}
//     </div>
//     <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"></input>
//   </div>
// }

import { forwardRef } from "react";

export const InputBox = forwardRef(function InputBox({ label, placeholder, onChange, onKeyDown }, ref) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input
        ref={ref}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
});

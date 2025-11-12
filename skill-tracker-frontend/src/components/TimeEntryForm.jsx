import { useState, useEffect } from "react";

export default function TimeEntryForm({ open, onClose, skill, onSave }) {
  const [minutes,setMinutes]=useState(15);
  const [note,setNote]=useState("");
  const [at,setAt]=useState("");

  useEffect(()=>{
    if (open) {
      setMinutes(15); setNote(""); setAt(new Date().toISOString().substring(0,10));
    }
  },[open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <div className="w-full max-w-md card">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Add Time — {skill?.title}</div>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        <form className="mt-4 grid gap-3" onSubmit={(e)=>{e.preventDefault(); onSave({ minutes:Number(minutes), note, at });}}>
          <input className="input" type="number" min="1" step="1" value={minutes} onChange={e=>setMinutes(e.target.value)} placeholder="Minutes" />
          <input className="input" placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
          <input className="input" type="date" value={at} onChange={e=>setAt(e.target.value)} />
          <button className="btn bg-indigo-600 text-white border-indigo-600">Add</button>
        </form>
      </div>
    </div>
  );
}

export default function TabNav({ tab, setTab }) {
  const tabs = ["Learning","Category","Confidence","Tags","Time"];
  return (
    <div className="flex gap-2 p-2 rounded-xl bg-gray-100 w-fit">
      {tabs.map(t => (
        <button key={t}
          onClick={()=>setTab(t)}
          className={`px-3 py-1.5 rounded-lg text-sm ${tab===t ? "bg-white shadow border" : "text-gray-600 hover:bg-white"}`}>
          {t}
        </button>
      ))}
    </div>
  );
}

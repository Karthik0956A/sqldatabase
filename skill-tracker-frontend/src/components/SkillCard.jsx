export default function SkillCard({ skill, onAddTime, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{skill.title}</div>
          <div className="mt-1 flex flex-wrap gap-2">
            <span className="badge">{skill.category}</span>
            <span className="badge">Status: {skill.status}</span>
            <span className="badge">Conf: {skill.confidence}</span>
            {skill.tags?.map((t) => <span key={t} className="badge">{t}</span>)}
          </div>
        </div>
        <div className="text-right text-sm">
          <div className="font-medium">{skill.minutesTotal || 0} min</div>
          {skill.nextReviewAt && (
            <div className="text-gray-500">Next: {new Date(skill.nextReviewAt).toLocaleDateString()}</div>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="btn" onClick={()=>onAddTime(skill)}>+ Time</button>
        <button className="btn" onClick={()=>onEdit(skill)}>Edit</button>
        <button className="btn border-red-300 text-red-600" onClick={()=>onDelete(skill._id)}>Delete</button>
      </div>
    </div>
  );
}

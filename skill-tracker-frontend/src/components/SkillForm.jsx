import { useEffect, useState } from "react";

export default function SkillForm({ open, onClose, initial, onSave }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("To Start");
  const [confidence, setConfidence] = useState(1);
  const [tags, setTags] = useState("");
  const [nextReviewAt, setNextReviewAt] = useState("");
  const [saving, setSaving] = useState(false); // ✅ new state for feedback

  // ✅ Reset form when modal opens or when editing a different skill
  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setCategory(initial.category || "");
      setStatus(initial.status || "To Start");
      setConfidence(initial.confidence || 1);
      setTags((initial.tags || []).join(", "));
      setNextReviewAt(initial.nextReviewAt ? initial.nextReviewAt.substring(0, 10) : "");
    } else {
      setTitle("");
      setCategory("");
      setStatus("To Start");
      setConfidence(1);
      setTags("");
      setNextReviewAt("");
    }
  }, [initial, open]);

  if (!open) return null;

  // ✅ Prevent full reload and handle async save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      title,
      category,
      status,
      confidence: Number(confidence),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      nextReviewAt: nextReviewAt || null,
    };

    try {
      await onSave(data);
      onClose(); // ✅ Close modal after successful save
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4 z-50">
      <div className="w-full max-w-lg card bg-white shadow-lg rounded-xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <div className="text-lg font-semibold">
            {initial ? "Edit Skill" : "Add Skill"}
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Category (Backend, DevOps, Mobile...)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              className="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {["In Progress", "Mastered", "To Start", "Needs Review"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              className="select"
              value={confidence}
              onChange={(e) => setConfidence(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} (confidence)
                </option>
              ))}
            </select>
          </div>

          <input
            className="input"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label className="text-sm text-gray-600 mt-2">Next Review</label>
          <input
            type="date"
            className="input"
            value={nextReviewAt}
            onChange={(e) => setNextReviewAt(e.target.value)}
          />

          <button
            type="submit"
            disabled={saving}
            className={`btn bg-indigo-600 text-white border-indigo-600 ${
              saving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {saving
              ? "Saving..."
              : initial
              ? "Save Changes"
              : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
}

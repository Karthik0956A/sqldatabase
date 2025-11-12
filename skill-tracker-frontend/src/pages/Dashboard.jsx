import { useEffect, useMemo, useState } from "react";
import TopNav from "../components/TopNav";
import TabNav from "../components/TabNav";
import EmptyState from "../components/EmptyState";
import SkillCard from "../components/SkillCard";
import SkillForm from "../components/SkillForm";
import TimeEntryForm from "../components/TimeEntryForm";
import {
  listSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  groupByStatus,
  groupByCategory,
  groupByConfidence,
} from "../api/skills";
import { addTime, timeSummary } from "../api/time";

export default function Dashboard() {
  const [tab, setTab] = useState("Learning");

  // skill state
  const [skills, setSkills] = useState([]);
  const [groups, setGroups] = useState([]); // for group endpoints
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  // modals
  const [openSkillForm, setOpenSkillForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openTimeForm, setOpenTimeForm] = useState(false);
  const [timeSkill, setTimeSkill] = useState(null);

  // ✅ Load data depending on active tab
  const refresh = async (active = tab) => {
    try {
      setLoading(true);
      if (active === "Learning") {
        const { data } = await groupByStatus();
        setGroups(data);
      } else if (active === "Category") {
        const { data } = await groupByCategory();
        setGroups(data);
      } else if (active === "Confidence") {
        const { data } = await groupByConfidence();
        setGroups(data);
      } else if (active === "Time") {
        const { data } = await timeSummary();
        setSummary(data);
      } else if (active === "Tags") {
        const { data } = await listSkills();
        setSkills(data);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [tab]);

  // ✅ Handlers
  const onAddSkill = () => {
    setEditing(null);
    setOpenSkillForm(true);
  };

  const onSaveSkill = async (payload) => {
    try {
      if (editing) await updateSkill(editing._id, payload);
      else await createSkill(payload);
      setOpenSkillForm(false);
      setEditing(null);
      await refresh();
    } catch (err) {
      console.error("Error saving skill:", err);
    }
  };

  const onDeleteSkill = async (id) => {
    await deleteSkill(id);
    await refresh();
  };

  const onAddTimeOpen = (skill) => {
    setTimeSkill(skill);
    setOpenTimeForm(true);
  };

  const onSaveTime = async ({ minutes, note, at }) => {
    await addTime(timeSkill._id, { minutes, note, at });
    setOpenTimeForm(false);
    setTimeSkill(null);
    await refresh();
  };

  // ✅ Moved useMemo out of conditional render
  const lanes = ["In Progress", "Mastered", "To Start", "Needs Review"];
  const orderedLanes = useMemo(() => {
    const map = new Map(groups.map((g) => [String(g._id), g.items]));
    return lanes.map((name) => ({
      name,
      items: map.get(name) || [],
    }));
  }, [groups]);

  // ================== Render Sections ==================

  const renderLearning = () => {
    if (loading) return <div>Loading...</div>;
    if (!groups?.length)
      return (
        <EmptyState
          title="No skills added"
          subtitle="Click 'Add Skill' to get started"
        />
      );

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderedLanes.map((lane) => (
          <div key={lane.name} className="card">
            <div className="font-semibold mb-2">{lane.name}</div>
            <div className="grid gap-3">
              {lane.items.map((s) => (
                <SkillCard
                  key={s._id}
                  skill={s}
                  onAddTime={onAddTimeOpen}
                  onEdit={(sk) => {
                    setEditing(sk);
                    setOpenSkillForm(true);
                  }}
                  onDelete={onDeleteSkill}
                />
              ))}
              {!lane.items.length && (
                <div className="text-sm text-gray-500">No items</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCategory = () => {
    if (loading) return <div>Loading...</div>;
    if (!groups?.length) return <EmptyState />;
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group._id} className="card">
            <div className="font-semibold mb-2">{group._id}</div>
            <div className="grid gap-3">
              {group.items.map((s) => (
                <SkillCard
                  key={s._id}
                  skill={s}
                  onAddTime={onAddTimeOpen}
                  onEdit={(sk) => {
                    setEditing(sk);
                    setOpenSkillForm(true);
                  }}
                  onDelete={onDeleteSkill}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderConfidence = () => {
    if (loading) return <div>Loading...</div>;
    if (!groups?.length) return <EmptyState />;
    const order = [5, 4, 3, 2, 1];
    const map = new Map(groups.map((g) => [String(g._id), g.items]));
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {order.map((n) => (
          <div key={n} className="card">
            <div className="font-semibold mb-2">Confidence {n}</div>
            <div className="grid gap-3">
              {(map.get(String(n)) || []).map((s) => (
                <SkillCard
                  key={s._id}
                  skill={s}
                  onAddTime={onAddTimeOpen}
                  onEdit={(sk) => {
                    setEditing(sk);
                    setOpenSkillForm(true);
                  }}
                  onDelete={onDeleteSkill}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTags = () => {
    if (loading) return <div>Loading...</div>;
    if (!skills?.length) return <EmptyState />;
    const tagMap = new Map();
    for (const s of skills) {
      for (const t of s.tags || []) {
        if (!tagMap.has(t)) tagMap.set(t, []);
        tagMap.get(t).push(s);
      }
    }
    const entries = [...tagMap.entries()];
    if (!entries.length)
      return (
        <EmptyState
          title="No tags yet"
          subtitle="Add tag names in skill form"
        />
      );
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map(([tag, items]) => (
          <div key={tag} className="card">
            <div className="font-semibold mb-2">#{tag}</div>
            <div className="grid gap-3">
              {items.map((s) => (
                <SkillCard
                  key={s._id}
                  skill={s}
                  onAddTime={onAddTimeOpen}
                  onEdit={(sk) => {
                    setEditing(sk);
                    setOpenSkillForm(true);
                  }}
                  onDelete={onDeleteSkill}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTime = () => {
    if (loading) return <div>Loading...</div>;
    if (!summary?.length)
      return <EmptyState title="No data" subtitle="Add a skill and log some time" />;
    return (
      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 pr-4">Skill</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Confidence</th>
              <th className="py-2 pr-4">Minutes</th>
              <th className="py-2 pr-4">Next Review</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((row) => (
              <tr key={row._id} className="border-t">
                <td className="py-2 pr-4">{row.title}</td>
                <td className="py-2 pr-4">{row.category}</td>
                <td className="py-2 pr-4">{row.status}</td>
                <td className="py-2 pr-4">{row.confidence}</td>
                <td className="py-2 pr-4">{row.minutesTotal || 0}</td>
                <td className="py-2 pr-4">
                  {row.nextReviewAt
                    ? new Date(row.nextReviewAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ================== Return ==================

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between">
          <TabNav tab={tab} setTab={setTab} />
          <button
            className="btn bg-indigo-600 text-white border-indigo-600"
            onClick={onAddSkill}
          >
            + Add Skill
          </button>
        </div>

        <div className="mt-6">
          {tab === "Learning" && renderLearning()}
          {tab === "Category" && renderCategory()}
          {tab === "Confidence" && renderConfidence()}
          {tab === "Tags" && renderTags()}
          {tab === "Time" && renderTime()}
        </div>
      </div>

      <SkillForm
        open={openSkillForm}
        initial={editing}
        onClose={() => {
          setOpenSkillForm(false);
          setEditing(null);
        }}
        onSave={onSaveSkill}
      />
      <TimeEntryForm
        open={openTimeForm}
        skill={timeSkill}
        onClose={() => {
          setOpenTimeForm(false);
          setTimeSkill(null);
        }}
        onSave={onSaveTime}
      />
    </div>
  );
}

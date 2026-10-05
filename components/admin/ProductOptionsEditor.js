"use client";

import { useState } from "react";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

export default function ProductOptionsEditor({ initialOptions }) {
  const [groups, setGroups] = useState(() =>
    (initialOptions || []).map((g) => ({
      id: g.id || makeId(),
      name: g.name || "",
      choices: (g.choices || []).map((c) => ({
        id: c.id || makeId(),
        label: c.label || "",
        priceDelta: Number(c.priceDelta) || 0,
      })),
    }))
  );

  function addGroup() {
    setGroups((prev) => [...prev, { id: makeId(), name: "", choices: [] }]);
  }

  function removeGroup(groupId) {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }

  function updateGroupName(groupId, name) {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, name } : g)));
  }

  function addChoice(groupId) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, choices: [...g.choices, { id: makeId(), label: "", priceDelta: 0 }] }
          : g
      )
    );
  }

  function updateChoice(groupId, choiceId, field, value) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              choices: g.choices.map((c) => (c.id === choiceId ? { ...c, [field]: value } : c)),
            }
          : g
      )
    );
  }

  function removeChoice(groupId, choiceId) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, choices: g.choices.filter((c) => c.id !== choiceId) } : g
      )
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-wood-700">옵션 (선택)</label>
        <button
          type="button"
          onClick={addGroup}
          className="rounded-full border border-wood-300 px-3 py-1 text-xs font-medium text-wood-700 transition hover:bg-wood-100"
        >
          + 옵션 그룹 추가
        </button>
      </div>

      {groups.length === 0 && (
        <p className="mt-2 text-xs text-wood-400">
          옵션 그룹이 없으면 상품이 단일 가격으로 판매돼요.
        </p>
      )}

      <div className="mt-3 space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="rounded-lg border border-wood-200 p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={group.name}
                onChange={(e) => updateGroupName(group.id, e.target.value)}
                placeholder="옵션 그룹 이름 (예: 색상, 가죽 등급)"
                className="flex-1 rounded-lg border border-wood-200 px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeGroup(group.id)}
                className="whitespace-nowrap rounded-full border border-red-300 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
              >
                그룹 삭제
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {group.choices.map((choice) => (
                <div key={choice.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={choice.label}
                    onChange={(e) => updateChoice(group.id, choice.id, "label", e.target.value)}
                    placeholder="선택지 이름 (예: 네이비)"
                    className="flex-1 rounded-lg border border-wood-200 px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    value={choice.priceDelta}
                    onChange={(e) =>
                      updateChoice(group.id, choice.id, "priceDelta", Number(e.target.value) || 0)
                    }
                    placeholder="추가금액"
                    className="w-28 rounded-lg border border-wood-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeChoice(group.id, choice.id)}
                    className="text-xs text-wood-400 hover:text-red-600"
                  >
                    삭제
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addChoice(group.id)}
                className="text-xs font-medium text-wood-600 hover:text-wood-900"
              >
                + 선택지 추가
              </button>
            </div>
          </div>
        ))}
      </div>

      <input type="hidden" name="optionsJson" value={JSON.stringify(groups)} readOnly />
    </div>
  );
}

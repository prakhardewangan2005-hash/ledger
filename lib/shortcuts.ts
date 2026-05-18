export type Shortcut = {
  group: string;
  keys: string[];
  description: string;
};

export const SHORTCUTS: Shortcut[] = [
  { group: "Navigation", keys: ["G", "T"], description: "Go to Today" },
  { group: "Navigation", keys: ["G", "F"], description: "Go to Feed" },
  { group: "Navigation", keys: ["G", "P"], description: "Go to Products" },
  { group: "Navigation", keys: ["G", "L"], description: "Go to Filings" },
  { group: "Navigation", keys: ["G", "E"], description: "Go to Evidence" },
  { group: "Navigation", keys: ["G", "C"], description: "Go to Copilot" },
  { group: "Navigation", keys: ["G", "A"], description: "Go to Audit" },
  { group: "General", keys: ["⌘", "K"], description: "Open command palette" },
  { group: "General", keys: ["⌘", "/"], description: "Toggle Copilot panel" },
  { group: "General", keys: ["?"], description: "Show keyboard shortcuts" },
  { group: "General", keys: ["⌘", "B"], description: "Toggle sidebar" },
  { group: "General", keys: ["⌘", "."], description: "Toggle theme" },
  { group: "Lists", keys: ["J"], description: "Move down" },
  { group: "Lists", keys: ["K"], description: "Move up" },
  { group: "Lists", keys: ["E"], description: "Edit selected" },
  { group: "Lists", keys: ["A"], description: "Assign owner" },
  { group: "Lists", keys: ["X"], description: "Archive selected" },
  { group: "Lists", keys: ["S"], description: "Star / save" },
  { group: "Lists", keys: ["Shift", "F"], description: "Open filter bar" }
];

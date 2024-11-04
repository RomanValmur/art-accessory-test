import { Locales, type Locale, type TreeNode } from "~/types";

export const getLocaledField = (node: TreeNode, field: keyof Omit<Locale, "id">) => {
  const locale = useState<Locales>("locale");
  if (node.locale[locale.value][field]) {
    return node.locale[locale.value][field];
  }
  for (const locale of Object.values(Locales)) {
    if (node.locale[locale][field]) {
      return node.locale[locale][field];
    }
  }
};

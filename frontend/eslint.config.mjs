import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/app/page.tsx", "src/app/devis/page.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["src/app/connexion/page.tsx", "src/app/declarer-colis/page.tsx", "src/app/inscription/page.tsx", "src/app/track-colis/page.tsx", "src/services/package.service.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;

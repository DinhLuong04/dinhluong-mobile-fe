// src/twind.config.ts  ← ĐÚNG CHO V1+
import { defineConfig } from '@twind/core';  // ← Import từ @twind/core, KHÔNG phải 'twind'
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: 'class',  // Optional: cho dark mode
});
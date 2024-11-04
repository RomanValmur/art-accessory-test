<template>
  <select v-model="locale" class="ml-auto">
    <option v-for="{ label, value } in options" :key="value" :value>{{ label }}</option>
  </select>
</template>

<script setup lang="ts">
  import { Locales } from "~/types";
  const locale = useState("locale", () => Locales.RU);
  const options = {
    en: {
      label: "English",
      value: Locales.EN,
    },
    ru: {
      label: "Русский",
      value: Locales.RU,
    },
    fr: {
      label: "Français",
      value: Locales.FR,
    },
  };
</script>

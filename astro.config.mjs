// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';



// https://astro.build/config
export default defineConfig({
  site: "https://photofox.pl",
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon({
    include: {
      lucide: [
        "arrow-up-right",
        "chevron-right",
        "phone",
        "menu",
        "scroll",
        "mail",
        "hand-heart",
        "crown",
        "handshake",
        "badge-check",
        "map-pin",
        "calendar-clock",
        "hand-coins",
        "calendar",
        "heater",
        "server",
        'air-vent',
        "battery-charging",
        "cctv"
      ],
    },
  }), sitemap(), ]
});

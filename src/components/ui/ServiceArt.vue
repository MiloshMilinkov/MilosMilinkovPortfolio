<script setup lang="ts">
import type { ServiceId } from '../../data/services.ts'

/** Small decorative scenes for the service cards (original artwork, colours from the theme). */
defineProps<{ kind: ServiceId }>()
</script>

<template>
  <svg class="service-art" viewBox="0 0 320 168" aria-hidden="true" focusable="false">
    <!-- Business website: a desktop page with a phone in front. -->
    <g v-if="kind === 'websites'">
      <defs>
        <linearGradient id="sa-grad-websites" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" class="stop-deep" />
          <stop offset="1" class="stop-accent" />
        </linearGradient>
      </defs>
      <rect x="16" y="18" width="228" height="132" rx="10" class="win" />
      <path d="M16 38h228" class="rule" />
      <circle cx="29" cy="28" r="3" class="dot-a" /><circle cx="39" cy="28" r="3" class="dot-b" /><circle cx="49" cy="28" r="3" class="dot-c" />
      <rect x="28" y="48" width="204" height="46" rx="6" fill="url(#sa-grad-websites)" class="soft" />
      <rect x="40" y="58" width="92" height="7" rx="3.5" class="ink" />
      <rect x="40" y="70" width="62" height="5" rx="2.5" class="ink-dim" />
      <rect x="40" y="81" width="34" height="8" rx="4" class="mint" />
      <rect x="28" y="102" width="62" height="38" rx="5" class="tile" />
      <rect x="98" y="102" width="62" height="38" rx="5" class="tile" />
      <rect x="168" y="102" width="62" height="38" rx="5" class="tile" />
      <rect x="36" y="112" width="30" height="4" rx="2" class="line" /><rect x="36" y="121" width="44" height="4" rx="2" class="line" />
      <rect x="106" y="112" width="30" height="4" rx="2" class="line" /><rect x="106" y="121" width="40" height="4" rx="2" class="line" />
      <rect x="176" y="112" width="30" height="4" rx="2" class="line" /><rect x="176" y="121" width="44" height="4" rx="2" class="line" />
      <rect x="236" y="50" width="68" height="112" rx="13" class="shadow" />
      <rect x="230" y="42" width="68" height="112" rx="13" class="phone" />
      <rect x="254" y="48" width="20" height="4" rx="2" class="line" />
      <rect x="238" y="58" width="52" height="32" rx="5" fill="url(#sa-grad-websites)" class="soft" />
      <rect x="244" y="66" width="30" height="5" rx="2.5" class="ink" />
      <rect x="238" y="98" width="44" height="5" rx="2.5" class="line" />
      <rect x="238" y="108" width="34" height="5" rx="2.5" class="line" />
      <rect x="238" y="122" width="26" height="8" rx="4" class="mint" />
    </g>

    <!-- Web app: a dashboard with tiles and a chart. -->
    <g v-else-if="kind === 'web-apps'">
      <defs>
        <linearGradient id="sa-grad-web-apps" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" class="stop-deep" />
          <stop offset="1" class="stop-accent" />
        </linearGradient>
      </defs>
      <rect x="16" y="18" width="288" height="134" rx="10" class="win" />
      <rect x="26" y="28" width="38" height="114" rx="6" class="tile" />
      <rect x="34" y="40" width="22" height="6" rx="3" class="accent" />
      <rect x="34" y="54" width="22" height="6" rx="3" class="line" />
      <rect x="34" y="68" width="22" height="6" rx="3" class="line" />
      <rect x="34" y="82" width="22" height="6" rx="3" class="line" />
      <rect x="72" y="28" width="70" height="32" rx="6" class="tile" />
      <rect x="150" y="28" width="70" height="32" rx="6" class="tile" />
      <rect x="228" y="28" width="66" height="32" rx="6" class="tile" />
      <rect x="80" y="36" width="28" height="4" rx="2" class="line" /><rect x="80" y="46" width="40" height="7" rx="3.5" class="accent" />
      <rect x="158" y="36" width="28" height="4" rx="2" class="line" /><rect x="158" y="46" width="34" height="7" rx="3.5" class="mint" />
      <rect x="236" y="36" width="28" height="4" rx="2" class="line" /><rect x="236" y="46" width="38" height="7" rx="3.5" class="peach" />
      <rect x="72" y="68" width="222" height="74" rx="6" class="tile" />
      <rect x="86" y="112" width="12" height="20" rx="3" class="bar" />
      <rect x="110" y="104" width="12" height="28" rx="3" class="bar" />
      <rect x="134" y="108" width="12" height="24" rx="3" class="bar" />
      <rect x="158" y="96" width="12" height="36" rx="3" class="bar" />
      <rect x="182" y="100" width="12" height="32" rx="3" class="bar" />
      <rect x="206" y="88" width="12" height="44" rx="3" class="bar" />
      <rect x="230" y="92" width="12" height="40" rx="3" class="accent" />
      <rect x="254" y="80" width="12" height="52" rx="3" class="accent" />
      <polyline points="92,104 116,96 140,100 164,88 188,92 212,80 236,84 260,72 280,76" class="trend" />
      <circle cx="260" cy="72" r="4" class="mint" />
    </g>

    <!-- Content editing: an editor beside a live preview. -->
    <g v-else-if="kind === 'content'">
      <defs>
        <linearGradient id="sa-grad-content" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" class="stop-deep" />
          <stop offset="1" class="stop-accent" />
        </linearGradient>
      </defs>
      <rect x="16" y="18" width="288" height="134" rx="10" class="win" />
      <path d="M16 38h288M164 38v114" class="rule" />
      <rect x="28" y="25" width="10" height="7" rx="2" class="line" /><rect x="44" y="25" width="10" height="7" rx="2" class="line" /><rect x="60" y="25" width="10" height="7" rx="2" class="line" />
      <rect x="28" y="48" width="96" height="8" rx="4" class="ink" />
      <rect x="28" y="63" width="122" height="4" rx="2" class="line" />
      <rect x="28" y="72" width="112" height="4" rx="2" class="line" />
      <rect x="28" y="81" width="86" height="4" rx="2" class="line" />
      <rect x="117" y="78" width="2" height="10" rx="1" class="accent" />
      <rect x="28" y="96" width="122" height="44" rx="6" class="tile" />
      <circle cx="128" cy="108" r="6" class="peach" />
      <path d="M36 134l22-20 16 13 12-9 30 16Z" class="sky" />
      <rect x="176" y="48" width="116" height="92" rx="8" class="tile" />
      <rect x="184" y="56" width="100" height="34" rx="5" fill="url(#sa-grad-content)" class="soft" />
      <rect x="184" y="98" width="70" height="6" rx="3" class="ink" />
      <rect x="184" y="110" width="94" height="4" rx="2" class="line" />
      <rect x="184" y="119" width="82" height="4" rx="2" class="line" />
      <circle cx="286" cy="140" r="17" class="accent-solid" />
      <path d="M279 147h4l9-9-4-4-9 9v4Zm7-11 4 4" class="glyph" />
    </g>

    <!-- Hosting and care: the globe, an orbit, a shield and an uptime line. -->
    <g v-else>
      <defs>
        <linearGradient id="sa-grad-care" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" class="stop-deep" />
          <stop offset="1" class="stop-accent" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="86" rx="92" ry="26" transform="rotate(-16 110 86)" class="orbit" />
      <circle cx="110" cy="86" r="54" class="win" />
      <ellipse cx="110" cy="86" rx="22" ry="54" class="rule" />
      <ellipse cx="110" cy="86" rx="44" ry="54" class="rule" />
      <path d="M56 86h108M63 59h94M63 113h94" class="rule" />
      <circle cx="194" cy="58" r="6" class="mint" />
      <circle cx="30" cy="112" r="4" class="accent" />
      <path d="M244 30l30 11v23c0 21-13 35-30 41-17-6-30-20-30-41V41l30-11Z" fill="url(#sa-grad-care)" />
      <path d="M231 67l9 9 17-18" class="glyph glyph--bold" />
      <polyline points="190,140 214,140 222,124 232,152 242,130 250,140 306,140" class="pulse" />
    </g>
  </svg>
</template>

<style scoped>
.service-art {
  width: 100%;
  height: auto;
}

.stop-deep {
  stop-color: var(--accent-deep);
}

.stop-accent {
  stop-color: var(--accent);
}

.win {
  fill: var(--surface-3);
  stroke: var(--border-strong);
}

.phone {
  fill: var(--surface-2);
  stroke: rgb(var(--tint-rgb) / 0.28);
}

.shadow {
  fill: rgb(var(--bg-rgb) / 0.6);
}

.tile {
  fill: var(--surface-2);
  stroke: var(--border);
}

.rule,
.orbit {
  fill: none;
  stroke: var(--border-strong);
  stroke-width: 1.2;
}

.orbit {
  stroke: rgb(var(--accent-rgb) / 0.45);
  stroke-dasharray: 4 6;
}

.soft {
  opacity: 0.75;
}

.ink {
  fill: rgb(var(--text-rgb) / 0.9);
}

.ink-dim {
  fill: rgb(var(--text-rgb) / 0.5);
}

.line {
  fill: rgb(var(--tint-rgb) / 0.2);
}

.bar {
  fill: rgb(var(--sky-rgb) / 0.45);
}

.accent {
  fill: var(--accent);
}

.accent-solid {
  fill: var(--accent-strong);
}

.mint {
  fill: var(--mint);
}

.peach {
  fill: var(--peach);
}

.sky {
  fill: rgb(var(--sky-rgb) / 0.55);
}

.dot-a {
  fill: var(--dot-close);
}

.dot-b {
  fill: var(--dot-min);
}

.dot-c {
  fill: var(--mint);
}

.trend,
.pulse {
  fill: none;
  stroke: var(--mint);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.glyph {
  fill: none;
  stroke: #fff;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.glyph--bold {
  stroke-width: 4;
}
</style>

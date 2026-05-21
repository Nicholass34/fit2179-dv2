/* =========================
   Vega-Lite chart loader
   =========================
   Loads each chart JSON spec from /charts/ and embeds it into the
   corresponding container (#chart-N). Graceful fallback on error.
*/

const CHART_MAP = [
  { id: "chart-1",  file: "chart1_smoking.json" },
  { id: "chart-2",  file: "chart2_vaping.json" },
  { id: "chart-3",  file: "chart3_alcohol.json" },
  { id: "chart-4",  file: "chart4_small_multiples.json" },
  { id: "chart-5",  file: "chart5_bivariate.json" },
  { id: "chart-6",  file: "chart6_deaths_map.json" },
  { id: "chart-7",  file: "chart7_heatmap.json" },
  { id: "chart-8",  file: "chart8_butterfly.json" },
  { id: "chart-9",  file: "chart9_drugs_bar.json" },
  { id: "chart-10", file: "chart10_slope.json" },
  { id: "chart-11", file: "chart11_deaths_time.json" },
  { id: "chart-12", file: "chart12_stacked.json" },
  { id: "chart-13", file: "chart13_bump.json" },
  { id: "chart-14", file: "chart14_treatment.json" },
  { id: "chart-15", file: "chart15_attitudes.json" }
];

const VEGA_OPTIONS = {
  renderer: "svg",       // SVG = crisp at any zoom
  actions: {
    export: true,
    source: false,
    editor: false,
    compiled: false
  },
  theme: undefined,
  config: {
    background: null     // let our CSS handle bg
  }
};

async function loadChart({ id, file }) {
  const container = document.getElementById(id);
  if (!container) {
    console.warn(`Container #${id} not found, skipping`);
    return;
  }

  try {
    const response = await fetch(`charts/${file}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const spec = await response.json();
    await vegaEmbed(`#${id}`, spec, VEGA_OPTIONS);
  } catch (err) {
    console.error(`Failed to load ${file}:`, err);
    container.innerHTML = `<p class="chart-error">Could not load ${file}. Check the console.</p>`;
  }
}

// Load all charts in parallel
document.addEventListener("DOMContentLoaded", () => {
  CHART_MAP.forEach(loadChart);
});

<template>
  <div class="page-datadoc">
    <!--
    <div class="doc-nav">
      <button id="nav-explorer" class="btn active" onclick="ui.navigate('explorer')">
        <i class="fa-solid fa-compass"></i> Explorer
      </button>
      <button id="nav-wizard" class="btn" onclick="ui.navigate('wizard')">
        <i class="fa-solid fa-wand-magic-sparkles"></i> Wizard
      </button>
      <button id="nav-review" class="btn" onclick="ui.navigate('review')">
        <i class="fa-solid fa-chart-simple"></i> Review
      </button>
    </div>
    -->

    <main id="page-explorer" class="page active">
      <div class="workspace">
        <div class="ws-search">
          <div class="searchbar">
            <i class="fa-solid fa-magnifying-glass" style="color:var(--text-muted); margin-right:10px;"></i>
            <input id="search" placeholder='Filter: "Oslofjord" AND "SST" AND "NetCDF"...' />
          </div>

          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <span class="chip" id="chip-selected" style="display:none;">
              Selected: <span id="chip-selected-text" style="color:var(--text); font-weight:800;"></span>
              <button title="Clear selection" onclick="ui.clearSelection()"><i class="fa-solid fa-xmark"></i></button>
            </span>

            <span class="chip" title="Theme">
              Deep Ocean <i class="fa-solid fa-moon"></i>
            </span>
          </div>
        </div>

        <aside class="panel" aria-label="Datasets">
          <div class="panel-header">
            <h2 id="datasets-title">Datasets</h2>
            <span style="display:flex; gap:6px; align-items:center;">
              <button id="dataset-prev" class="btn ghost" style="padding:2px 8px; font-size:0.7rem;" onclick="ui.prevDatasetPage()">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <button id="dataset-next" class="btn ghost" style="padding:2px 8px; font-size:0.7rem;" onclick="ui.nextDatasetPage()">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
              <!-- <span class="pill info"><i class="fa-solid fa-database"></i> Catalog</span> -->
            </span>
          </div>
          <div class="panel-body" id="dataset-list"></div>
        </aside>

        <section class="panel center" aria-label="Map and graph">
          <div class="panel-header">
            <h2 id="center-title">Geographic Preview</h2>
            <div class="center-tools">
              <button id="btn-view-map" class="btn active" onclick="ui.setCenterView('map')">
                <i class="fa-solid fa-map"></i> Map
              </button>
              <button id="btn-view-graph" class="btn" onclick="ui.setCenterView('graph')">
                <i class="fa-solid fa-project-diagram"></i> Connections
              </button>
            </div>
          </div>

          <div class="center-stage">
            <div id="map"></div>

            <div id="graph-wrap" class="hidden">
              <svg id="graph-svg" role="img" aria-label="Connections graph"></svg>
            </div>

            <div class="map-overlay" aria-hidden="true">
              <i class="fa-solid fa-play" style="color:var(--text-muted);"></i>
              <div class="rangebar">
                <div class="sel"></div>
                <div class="knob k1"></div>
                <div class="knob k2"></div>
              </div>
              <span class="pill" id="range-pill">—</span>
            </div>
          </div>
        </section>

        <aside class="panel inspector" aria-label="Inspector">
          <div class="panel-header inspector-header">
            <h2>Data Documentation Overview</h2>
            <span class="inspector-actions">
              <button
                id="btn-inspector-form"
                class="btn active"
                style="padding:2px 8px; font-size:0.7rem;"
                onclick="ui.setInspectorMode('form')"
              >
                Form View
              </button>
              <button
                id="btn-inspector-json"
                class="btn ghost"
                style="padding:2px 8px; font-size:0.7rem; margin-left:5px;"
                onclick="ui.setInspectorMode('json')"
              >
                JSON View
              </button>
            </span>
          </div>
          <div class="panel-body" id="inspector">
            <div style="text-align:center; margin-top:50px; color:var(--text-faint);">
              <i class="fa-solid fa-arrow-pointer" style="margin-bottom:10px;"></i><br />
              Select a dataset to view<br />details
            </div>
          </div>

          <div class="panel-footer">
            <button class="btn primary" style="width:100%; justify-content:center;" onclick="ui.navigate('wizard')">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Guided FAIR Setup
            </button>
          </div>
        </aside>
      </div>
    </main>

    <main id="page-wizard" class="page">
      <div class="wizard-workspace">
        <div class="ws-search" style="grid-column: 1 / -1;">
          <div style="display:flex; align-items:center; gap:10px; flex:1; min-width:0;">
            <span class="pill info" id="wizard-dataset-pill" title="No dataset selected">
              <i class="fa-solid fa-database"></i>
              No dataset selected
            </span>

            <div
              id="wizard-dataset-desc"
              class="muted"
              style="flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
            >
              No dataset selected — pick one in Explorer to begin.
            </div>
          </div>

          <div style="display:flex; gap:10px; align-items:center; flex-shrink:0;">
            <button class="btn" onclick="ui.prevStep()">
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <button class="btn primary" onclick="ui.nextStep()">
              Next <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <aside class="panel">
          <div class="panel-header">
            <h2>FAIRification Steps</h2>
            <span class="pill" id="wizard-progress">0 / 7</span>
          </div>
          <div class="panel-body" id="wizard-steps"></div>
        </aside>

        <section class="panel" style="grid-column: 2; grid-row: 2;">
          <div class="panel-header">
            <div style="display:flex; flex-direction:column; gap: 2px; min-width: 0;">
              <h2 id="wizard-title">Select a dataset</h2>
              <div
                id="wizard-subtitle"
                class="muted"
                style="font-size:0.85rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
              >
                Choose a dataset in Explorer to start the wizard
              </div>
            </div>
            <div style="display:flex; gap: 8px; align-items:center;">
              <span id="wizard-section-pill" class="pill">—</span>
              <button class="btn" onclick="ui.navigate('explorer')"><i class="fa-solid fa-compass"></i> Explorer</button>
            </div>
          </div>

          <div class="panel-body" id="wizard-content">
            <div class="kv">
              <span class="k">How this works</span>
              <span class="v" style="font-family: var(--font-sans); color: var(--text-muted);">
                Select a dataset → complete steps → the KG stores DCAT, PROV-O, GeoSPARQL, SOSA, SOFT7/S7 Entities
                and semantic mappings → the API Gateway enforces policy per distribution.
              </span>
            </div>

            <div class="callout">
              <div class="hd"><i class="fa-solid fa-circle-check"></i> Output per published version</div>
              <ul>
                <li>DCAT: <code>dcat:Dataset</code>, one/more <code>dcat:Distribution</code>, optional <code>dcat:DataService</code></li>
                <li>PROV-O lineage: <code>prov:Entity</code>, <code>prov:Activity</code>, <code>prov:Agent</code></li>
                <li>GeoSPARQL/GEO coverage (if spatial), SOSA observation semantics (if time-series)</li>
                <li>SOFT7/S7 canonical entities linked to FOI/sensors/platforms</li>
                <li>Field/property → ontology concept mappings (“semantic contracts”)</li>
              </ul>
            </div>
          </div>
        </section>

        <aside class="panel wizard-right" style="grid-column: 3; grid-row: 2;">
          <div class="panel-header">
            <h2>Acceptance Checks</h2>
            <span class="pill status"><i class="fa-solid fa-shield"></i> Gate</span>
          </div>
          <div class="panel-body" id="wizard-checks">
            <div class="muted" style="font-size:0.9rem; line-height: 1.4;">
              Select a dataset and start step-by-step. This panel updates with “done / missing” signals.
            </div>
          </div>
        </aside>
      </div>
    </main>

    <main id="page-review" class="page">
      <div class="single-col">
        <div class="sheet">
          <div class="sheet-header">
            <div>
              <div style="display:flex; align-items:center; gap:10px;">
                <i class="fa-solid fa-chart-simple" style="color:var(--info)"></i>
                <strong style="letter-spacing:0.2px;">Review & FAIR Readiness</strong>
              </div>
              <div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">
                Quick checklist derived from selected dataset metadata.
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn" onclick="ui.navigate('explorer')"><i class="fa-solid fa-arrow-left"></i> Back</button>
              <button class="btn primary" onclick="ui.recomputeScore()"><i class="fa-solid fa-rotate"></i> Recompute</button>
            </div>
          </div>

          <div class="sheet-body" id="review-body">
            <div style="text-align:center; margin: 22px 0; color: var(--text-faint);">
              Select a dataset in Explorer to generate a review.
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import '../assets/styles/pages/datadoc.css';
import { initDatadoc } from '../assets/scripts/datadoc';
import { useHeaderMeta } from '../composables/useHeaderMeta';

const { setRightBadge, clearRightBadge } = useHeaderMeta();

onMounted(() => {
  setRightBadge({ label: 'Node Online', icon: 'fa-signal', tone: 'status' });
  initDatadoc();
});

onBeforeUnmount(() => {
  clearRightBadge();
});
</script>

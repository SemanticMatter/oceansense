<template>
  <div class="page-index">
    <main
      id="page-discover"
      class="page active"
    >
      <div class="workspace">
        <div class="ws-search">
          <div class="searchbar">
            <i
              class="fa-solid fa-magnifying-glass"
              style="color:var(--text-muted); margin-right:10px;"
            ></i>
            <input
              placeholder="Filter: &quot;OceanLab&quot; AND &quot;CTD&quot; AND &quot;CF&quot;..."
              value="OceanSense Federated Dataset Explorer"
            />
          </div>
          <div style="display:flex; gap:8px;">
            <span class="chip">Nodes: oceanlab_no | pml_apics_uk | tara_polar <i class="fa-solid fa-xmark"></i></span>
            <span class="chip">Status: Live + Published <i class="fa-solid fa-xmark"></i></span>
          </div>
        </div>

        <aside class="panel">
          <div class="panel-header">
            <h2 id="datasets-title">
              Datasets
            </h2>
            <span class="pill status">Federated Nodes</span>
          </div>
          <div
            id="explorer-dataset-list"
            class="panel-body"
            tabindex="0"
            aria-label="Explorer dataset list"
          >
            <article
              v-for="dataset in explorerDatasets"
              :key="dataset.id"
              class="dataset-card"
              :class="{ active: selectedDatasetId === dataset.id }"
              role="button"
              tabindex="0"
              :aria-label="`Select dataset ${dataset.title}`"
              @click="selectDataset(dataset.id)"
              @keydown.enter.prevent="selectDataset(dataset.id)"
              @keydown.space.prevent="selectDataset(dataset.id)"
            >
              <div class="dataset-title">
                <div style="display:flex; justify-content:space-between; gap:10px;">
                  <h3>{{ dataset.title }}</h3>
                  <span class="pill hz">{{ dataset.temporal.updateFrequency || dataset.temporal.resolution }}</span>
                </div>
              </div>
              <div class="mini-bars">
                <span class="pill">Node: <strong>{{ dataset.nodeId }}</strong></span>
                <span class="pill">Modality: <strong>{{ dataset.modalities[0] || 'multimodal' }}</strong></span>
              </div>
              <p class="desc">
                {{ dataset.description }}
              </p>
            </article>
          </div>
        </aside>

        <section class="panel map">
          <div id="map"></div>

          <div
            style="position:absolute; bottom:20px; left:20px; right:20px; z-index:500; background:rgba(27,34,44,0.9); padding:10px; border-radius:8px; border:1px solid var(--border); display:flex; align-items:center; gap:15px; backdrop-filter:blur(5px);"
          >
            <i
              class="fa-solid fa-play"
              style="color:var(--text-muted);"
            ></i>
            <div style="flex:1; height:4px; background:var(--border); position:relative;">
              <div style="position:absolute; left:20%; width:30%; height:100%; background:var(--accent);"></div>
              <div style="position:absolute; left:20%; top:-4px; width:12px; height:12px; background:white; border-radius:50%;"></div>
              <div style="position:absolute; left:50%; top:-4px; width:12px; height:12px; background:white; border-radius:50%;"></div>
            </div>
            <span class="pill">2024-06-01 -> 2026-02-18</span>
          </div>
        </section>

        <aside class="panel inspector">
          <div class="panel-header">
            <h2>Data Inspector</h2>
            <span>
              <button
                id="btn-inspector-form"
                class="btn"
                :class="inspectorMode === 'form' ? 'active' : 'ghost'"
                style="padding:2px 8px; font-size:0.7rem;"
                @click="setInspectorMode('form')"
              >
                Form View
              </button>
              <button
                id="btn-inspector-json"
                class="btn"
                :class="inspectorMode === 'json' ? 'active' : 'ghost'"
                style="padding:2px 8px; font-size:0.7rem; margin-left:5px;"
                @click="setInspectorMode('json')"
              >
                JSON View
              </button>
            </span>
          </div>
          <div
            id="inspector-content"
            class="panel-body"
          >
            <div style="text-align:center; margin-top:50px; color:var(--text-faint);">
              <i
                class="fa-solid fa-arrow-pointer"
                style="margin-bottom:10px;"
              ></i><br />
              Select a dataset to view<br />telemetry details
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { datasets as sourceDatasets } from '../assets/data/OceanSense-datasets';
import '../assets/styles/pages/index.css';

const nodeMetadata = {
  oceanlab_no: {
    label: 'oceanlab@sensor-things',
    locationName: 'OceanLab (Norway)',
    lat: 63.44,
    lon: 10.39,
    endpoint: 'https://oceanlab.example.no/sensorthings/v1.0'
  },
  pml_apics_uk: {
    label: 'apics@pml',
    locationName: 'PML-APICS (UK)',
    lat: 50.25,
    lon: -4.14,
    endpoint: 'https://apics.example.uk/sensorthings/v1.0'
  },
  tara_polar: {
    label: 'tara-polar@drift',
    locationName: 'Tara Polar Station (Arctic Drift)',
    lat: 79.8,
    lon: -10.2,
    endpoint: 'https://tara-polar.example.org/sensorthings/v1.0'
  }
};

const coreStandards = [
  'OGC SensorThings API',
  'OGC O&M',
  'SOSA/SSN',
  'PROV-O',
  'DCAT',
  'ISO 19115-1/19139',
  'CF Conventions',
  'NERC/BODC P01/P06',
  'Ocean Best Practices',
  'ISO 8601 UTC',
  'WGS84 EPSG:4326'
];

const bioStandards = [...coreStandards, 'Darwin Core', 'WoRMS', 'OBIS'];

const explorerOverrides = {
  ds1: {
    nodeId: 'oceanlab_no',
    locationName: 'OceanLab (Norway)',
    modalities: ['imaging', 'optics'],
    instruments: ['SilCam', 'UVP-6'],
    parameters: [
      { name: 'particle_size_distribution', unit: 'um bins' },
      { name: 'particle_count', unit: 'count/L' },
      { name: 'abundance_indicator', unit: 'count/L' }
    ],
    formats: ['Parquet', 'SensorThings-JSON'],
    distributions: [
      { format: 'SensorThings API', url: 'https://oceanlab.example.no/sensorthings/v1.0/Datastreams/imaging-optics' },
      { format: 'Parquet', url: 'https://oceanlab.example.no/data/oceanlab_imaging_optics_2025_ongoing.parquet' }
    ],
    quality: { protocol: 'Ocean Best Practices + imaging QA/QC', summary: 'Image blur/exposure QA and classifier drift checks before publishing minute summaries.' },
    standards: bioStandards,
    updatedAt: '2026-02-18T08:15:00Z',
    size: '2.1 GB',
    sampleVariables: ['particle_size_distribution', 'particle_count_per_L', 'classification_confidence'],
    exampleObservation: {
      timestamp: '2026-02-18T08:15:00Z',
      particle_count_per_L: 1840,
      dominant_size_bin_um: '160-250',
      classification_confidence: 0.91
    }
  },
  ds2: {
    nodeId: 'oceanlab_no',
    locationName: 'OceanLab (Norway)',
    modalities: ['water_column'],
    instruments: ['CTD package', 'DO optode', 'PAR sensor', 'CDOM fluorometer'],
    parameters: [
      { name: 'sea_water_temperature', unit: 'degrees_C' },
      { name: 'practical_salinity', unit: 'PSU' },
      { name: 'dissolved_oxygen', unit: 'umol/kg' },
      { name: 'photosynthetically_available_radiation', unit: 'umol photons m-2 s-1' },
      { name: 'cdom_absorption_440nm', unit: '1/m' }
    ],
    formats: ['NetCDF', 'SensorThings-JSON'],
    distributions: [
      { format: 'NetCDF', url: 'https://oceanlab.example.no/data/oceanlab_ctd_do_par_cdom_2024.nc' }
    ],
    quality: { protocol: 'QARTOD', summary: 'Automated range/spike/gradient tests plus delayed-mode review at deployment boundaries.' },
    standards: coreStandards,
    updatedAt: '2026-01-12T10:00:00Z',
    size: '980 MB',
    sampleVariables: ['sea_water_temperature', 'practical_salinity', 'dissolved_oxygen', 'photosynthetically_available_radiation'],
    exampleObservation: {
      timestamp: '2025-12-31T23:50:00Z',
      sea_water_temperature_degrees_C: 6.4,
      practical_salinity_psu: 33.9,
      dissolved_oxygen_umol_per_kg: 287,
      par_umol_photons_m2_s: 14.2
    }
  },
  ds3: {
    nodeId: 'oceanlab_no',
    locationName: 'OceanLab (Norway)',
    modalities: ['dynamics'],
    instruments: ['Wave sensor', 'ADCP/current meter'],
    parameters: [
      { name: 'significant_wave_height', unit: 'm' },
      { name: 'wave_period', unit: 's' },
      { name: 'eastward_sea_water_velocity', unit: 'm/s' },
      { name: 'northward_sea_water_velocity', unit: 'm/s' }
    ],
    formats: ['Zarr', 'SensorThings-JSON'],
    distributions: [
      { format: 'SensorThings API', url: 'https://oceanlab.example.no/sensorthings/v1.0/Datastreams/waves-currents' },
      { format: 'Zarr', url: 'https://oceanlab.example.no/data/oceanlab_waves_currents_2025_ongoing.zarr' }
    ],
    quality: { protocol: 'QARTOD', summary: 'Near-real-time velocity and wave integrity checks with latency alarms for dropped ensembles.' },
    standards: coreStandards,
    updatedAt: '2026-02-18T09:02:00Z',
    size: '1.4 GB',
    sampleVariables: ['significant_wave_height', 'wave_period', 'eastward_sea_water_velocity', 'northward_sea_water_velocity'],
    exampleObservation: {
      timestamp: '2026-02-18T09:00:00Z',
      significant_wave_height_m: 1.7,
      wave_period_s: 5.8,
      eastward_velocity_m_per_s: 0.21,
      northward_velocity_m_per_s: -0.09
    }
  },
  ds4: {
    nodeId: 'pml_apics_uk',
    locationName: 'PML-APICS (UK)',
    modalities: ['acoustics'],
    instruments: ['Hydrophone array'],
    parameters: [
      { name: 'sound_pressure_level', unit: 'dB re 1 uPa' },
      { name: 'power_spectral_density_bands', unit: 'dB re 1 uPa^2/Hz' },
      { name: 'soundscape_index', unit: 'unitless' }
    ],
    formats: ['Parquet', 'SensorThings-JSON'],
    distributions: [
      { format: 'SensorThings API', url: 'https://apics.example.uk/sensorthings/v1.0/Datastreams/passive-acoustics' },
      { format: 'Parquet', url: 'https://apics.example.uk/data/pml_passive_acoustics_soundscape_2025_ongoing.parquet' }
    ],
    quality: { protocol: 'Hydrophone QA/QC + Ocean Best Practices', summary: 'Clock drift correction, clipping flags, and PSD validation per processing burst.' },
    standards: coreStandards,
    updatedAt: '2026-02-18T07:55:00Z',
    size: '3.0 GB',
    sampleVariables: ['sound_pressure_level', 'psd_63_125hz', 'psd_1_2khz', 'biophony_index'],
    exampleObservation: {
      timestamp: '2026-02-18T07:55:00Z',
      spl_db_re_1uPa: 96.3,
      psd_63_125hz_db: 78.2,
      psd_1_2khz_db: 64.1,
      biophony_index: 0.58
    }
  },
  ds5: {
    nodeId: 'pml_apics_uk',
    locationName: 'PML-APICS (UK)',
    modalities: ['acoustics'],
    instruments: ['EK80'],
    parameters: [
      { name: 'volume_backscattering_strength_Sv_38kHz', unit: 'dB re 1 m-1' },
      { name: 'volume_backscattering_strength_Sv_120kHz', unit: 'dB re 1 m-1' },
      { name: 'biomass_proxy_index', unit: 'unitless' }
    ],
    formats: ['Zarr'],
    distributions: [
      { format: 'Zarr', url: 'https://apics.example.uk/data/pml_ek80_backscatter_2025.zarr' }
    ],
    quality: { protocol: 'EK80 calibration + acoustic QC', summary: 'Sphere calibration metadata and transient-noise masking applied to Sv products.' },
    standards: coreStandards,
    updatedAt: '2026-01-30T12:30:00Z',
    size: '4.7 GB',
    sampleVariables: ['sv_38khz', 'sv_120khz', 'biomass_proxy_index'],
    exampleObservation: {
      timestamp: '2025-11-15T12:30:00Z',
      sv_38khz_db_re_1m_minus1: -71.2,
      sv_120khz_db_re_1m_minus1: -66.4,
      biomass_proxy_index: 0.47
    }
  },
  ds6: {
    nodeId: 'pml_apics_uk',
    locationName: 'PML-APICS (UK)',
    modalities: ['cytometry'],
    instruments: ['Cytosub'],
    parameters: [
      { name: 'cell_count', unit: 'cells/mL' },
      { name: 'chlorophyll_fluorescence_red_channel', unit: 'relative_units' },
      { name: 'orange_fluorescence_channel', unit: 'relative_units' },
      { name: 'forward_scatter_proxy', unit: 'relative_units' }
    ],
    formats: ['NetCDF', 'SensorThings-JSON'],
    distributions: [
      { format: 'SensorThings API', url: 'https://apics.example.uk/sensorthings/v1.0/Datastreams/cytosub' },
      { format: 'NetCDF', url: 'https://apics.example.uk/data/pml_cytosub_cells_2025_ongoing.nc' }
    ],
    quality: { protocol: 'Cytosub acquisition QC', summary: 'Flow-rate checks, pulse-shape filtering, and bead normalization performed per run.' },
    standards: bioStandards,
    updatedAt: '2026-02-18T08:42:00Z',
    size: '820 MB',
    sampleVariables: ['cell_count', 'chlorophyll_fluorescence_red_channel', 'orange_fluorescence_channel'],
    exampleObservation: {
      timestamp: '2026-02-18T08:40:00Z',
      cell_count_cells_per_mL: 18200,
      red_fluorescence_ru: 0.68,
      orange_fluorescence_ru: 0.23
    }
  },
  ds7: {
    nodeId: 'tara_polar',
    locationName: 'Tara Polar Station (Arctic Drift)',
    modalities: ['met/ice', 'water_column', 'imaging'],
    instruments: ['Polar met package', 'Sea-ice condition sensor', 'CTD package', 'DO optode', 'UVP-6'],
    parameters: [
      { name: 'air_temperature', unit: 'degrees_C' },
      { name: 'sea_ice_fraction', unit: '0-1' },
      { name: 'ice_thickness', unit: 'm' },
      { name: 'sea_water_temperature', unit: 'degrees_C' },
      { name: 'practical_salinity', unit: 'PSU' },
      { name: 'dissolved_oxygen', unit: 'umol/kg' },
      { name: 'classified_plankton_objects', unit: 'count/L' }
    ],
    formats: ['NetCDF', 'Parquet', 'SensorThings-JSON'],
    distributions: [
      { format: 'SensorThings API', url: 'https://tara-polar.example.org/sensorthings/v1.0/Datastreams/drift-sentinels' },
      { format: 'NetCDF', url: 'https://tara-polar.example.org/data/tara_polar_sentinels_2024_ongoing.nc' },
      { format: 'Parquet', url: 'https://tara-polar.example.org/data/tara_drifting_track_2024_2026.parquet' }
    ],
    quality: { protocol: 'QARTOD + Polar observatory SOP', summary: 'UTC normalization, track-position QA, and stream-specific quality flags for met/ice/ocean signals.' },
    standards: bioStandards,
    updatedAt: '2026-02-18T06:30:00Z',
    size: '5.2 GB',
    sampleVariables: ['sea_ice_fraction', 'air_temperature', 'sea_water_temperature', 'dissolved_oxygen', 'classified_plankton_objects'],
    exampleObservation: {
      timestamp: '2026-02-18T06:00:00Z',
      latitude: 81.7,
      longitude: -8.9,
      sea_ice_fraction: 0.86,
      air_temperature_degrees_C: -18.4,
      sea_water_temperature_degrees_C: -1.2,
      dissolved_oxygen_umol_per_kg: 334
    }
  },
  ds8: {
    nodeId: 'tara_polar',
    locationName: 'Tara Polar Station (Arctic Drift)',
    modalities: ['biodiversity', 'water_column'],
    instruments: ['UVP-6', 'CTD package', 'Nutrient bottle workflow'],
    parameters: [
      { name: 'taxon_classification_outputs', unit: 'DarwinCore terms' },
      { name: 'nitrate', unit: 'umol/L' },
      { name: 'phosphate', unit: 'umol/L' },
      { name: 'silicate', unit: 'umol/L' }
    ],
    formats: ['Parquet', 'CSV'],
    distributions: [
      { format: 'Parquet', url: 'https://tara-polar.example.org/data/tara_drifting_track_2024_2026.parquet' },
      { format: 'CSV', url: 'https://tara-polar.example.org/data/tara_biodiversity_nutrients_2024_2026.csv' }
    ],
    quality: { protocol: 'WoRMS/OBIS validation + nutrient laboratory QA', summary: 'Taxonomy harmonization and nutrient QA records linked via PROV-O lineage notes.' },
    standards: bioStandards,
    updatedAt: '2026-01-31T18:00:00Z',
    size: '1.1 GB',
    sampleVariables: ['taxon_id_worms', 'occurrence_confidence_score', 'nitrate', 'phosphate', 'silicate'],
    exampleObservation: {
      timestamp: '2026-01-31T12:00:00Z',
      taxon_id_worms: 104464,
      occurrence_confidence_score: 0.88,
      nitrate_umol_per_L: 4.2,
      phosphate_umol_per_L: 0.41
    }
  }
};

const inferFormats = (access) => {
  const link = String(access || '').toLowerCase();
  if (link.includes('/sensorthings/')) return ['SensorThings-JSON'];
  if (link.endsWith('.nc')) return ['NetCDF'];
  if (link.endsWith('.zarr')) return ['Zarr'];
  if (link.endsWith('.parquet')) return ['Parquet'];
  if (link.endsWith('.csv')) return ['CSV'];
  return ['JSON'];
};

const explorerDatasets = sourceDatasets.map((dataset) => {
  const override = explorerOverrides[dataset.id] || {};
  const nodeId = override.nodeId || dataset.nodeId || 'oceanlab_no';
  const node = nodeMetadata[nodeId] || nodeMetadata.oceanlab_no;
  const formats = override.formats || inferFormats(dataset.access);

  return {
    ...dataset,
    nodeId,
    sourceNode: nodeId,
    locationName: override.locationName || node.locationName,
    modalities: override.modalities || [],
    instruments: override.instruments || (dataset.sensors || []).map((sensor) => sensor.model),
    parameters: override.parameters || [],
    formats,
    distributions: override.distributions || formats.map((format) => ({ format, url: dataset.access })),
    quality: override.quality || {
      protocol: dataset.provenance?.qc?.protocol || 'QARTOD',
      summary: dataset.provenance?.qc?.summary || 'QC summary pending.'
    },
    standards: override.standards || coreStandards,
    owner: dataset.organization,
    category: (override.modalities || []).join(', ') || 'multimodal',
    updatedAt: override.updatedAt || '2026-02-18T08:00:00Z',
    thumbnail: override.thumbnail || '',
    size: override.size || 'n/a',
    accessLevel: override.accessLevel || 'Open',
    sampleVariables: override.sampleVariables || [],
    exampleObservation: override.exampleObservation || {},
    temporal: {
      ...dataset.temporal,
      updateFrequency: dataset.temporal?.resolution || ''
    }
  };
});

const datasetById = Object.fromEntries(explorerDatasets.map((dataset) => [dataset.id, dataset]));

const selectedDatasetId = ref(null);
const inspectorMode = ref('form');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const formatSpatial = (dataset) => {
  if (dataset.spatial?.type === 'point' && dataset.spatial?.point) {
    return `${dataset.locationName} (${dataset.spatial.point.lat}, ${dataset.spatial.point.lon})`;
  }
  if (dataset.spatial?.type === 'bbox' && Array.isArray(dataset.spatial?.bbox)) {
    return `${dataset.locationName} bbox=${dataset.spatial.bbox.join(', ')}`;
  }
  return dataset.locationName;
};

const renderInspector = (datasetId) => {
  const container = document.getElementById('inspector-content');
  if (!container) return;

  const dataset = datasetById[datasetId];
  if (!dataset) return;

  if (inspectorMode.value === 'json') {
    const json = escapeHtml(JSON.stringify(dataset, null, 2));
    container.innerHTML = `<pre class="json-view">${json}</pre>
      <div style="margin-top:20px; padding-top:15px; border-top:1px solid var(--border); display:flex; gap:10px;">
        <button class="btn primary" style="flex:1; justify-content:center;"><i class="fa-solid fa-download"></i> Download</button>
        <button class="btn" style="flex:1; justify-content:center;"><i class="fa-solid fa-bell"></i> Subscribe</button>
      </div>`;
    return;
  }

  const parameterRows = dataset.parameters
    .map((parameter) => `<div class="kv-row"><span>${escapeHtml(parameter.name)}</span> <span>${escapeHtml(parameter.unit)}</span></div>`)
    .join('');

  const distributionRows = dataset.distributions
    .map((distribution) => `<div class="kv-row"><span>${escapeHtml(distribution.format)}</span> <span>${escapeHtml(distribution.url)}</span></div>`)
    .join('');

  const sampleRows = dataset.sampleVariables
    .map((item) => `<span class="pill">${escapeHtml(item)}</span>`)
    .join('');

  const observationRows = Object.entries(dataset.exampleObservation || {})
    .map(([key, value]) => `<div class="kv-row"><span>${escapeHtml(key)}</span> <span>${escapeHtml(String(value))}</span></div>`)
    .join('');

  const standards = dataset.standards.map((standard) => `<span class="pill">${escapeHtml(standard)}</span>`).join('');

  container.innerHTML = `
      <div class="kv"><span class="k">Dataset</span><span class="v">${escapeHtml(dataset.title)}</span></div>
      <div class="kv"><span class="k">Node / Origin</span><span class="v">${escapeHtml(dataset.nodeId)} (${escapeHtml(nodeMetadata[dataset.nodeId]?.label || dataset.nodeId)})</span></div>
      <div class="kv"><span class="k">Location</span><span class="v">${escapeHtml(formatSpatial(dataset))}</span></div>
      <div class="kv"><span class="k">Last updated</span><span class="v">${escapeHtml(dataset.updatedAt)}</span></div>

      <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">OVERVIEW</h3>
      <div class="kv">
        <div class="kv-row"><span>Status</span> <span>${escapeHtml(dataset.status)}</span></div>
        <div class="kv-row"><span>License</span> <span>${escapeHtml(dataset.license)}</span></div>
        <div class="kv-row"><span>Owner</span> <span>${escapeHtml(dataset.owner)}</span></div>
        <div class="kv-row"><span>Access</span> <span>${escapeHtml(dataset.accessLevel)}</span></div>
        <div class="kv-row"><span>Temporal</span> <span>${escapeHtml(`${dataset.temporal.start} -> ${dataset.temporal.end} (${dataset.temporal.updateFrequency})`)}</span></div>
      </div>

      <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">MODALITIES / INSTRUMENTS</h3>
      <div class="kv">
        <div class="kv-row"><span>Modalities</span> <span>${escapeHtml(dataset.modalities.join(', '))}</span></div>
        <div class="kv-row"><span>Instruments</span> <span>${escapeHtml(dataset.instruments.join(', '))}</span></div>
      </div>

      <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">PARAMETERS</h3>
      <div class="kv">${parameterRows}</div>

      <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">FORMATS / DISTRIBUTIONS</h3>
      <div class="kv">${distributionRows}</div>

      <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">QUALITY / STANDARDS</h3>
      <div class="kv">
        <div class="kv-row"><span>QC protocol</span> <span>${escapeHtml(dataset.quality.protocol)}</span></div>
        <div class="kv-row"><span>QC summary</span> <span>${escapeHtml(dataset.quality.summary)}</span></div>
      </div>
      <div class="topic-row" style="margin-top:8px;">${standards}</div>

      <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">PREVIEW</h3>
      <div class="topic-row">${sampleRows}</div>
      <div class="kv" style="margin-top:8px;">${observationRows}</div>

      <div style="margin-top:20px; padding-top:15px; border-top:1px solid var(--border); display:flex; gap:10px;">
        <button class="btn primary" style="flex:1; justify-content:center;">Download</button>
        <button class="btn" style="flex:1; justify-content:center;">Subscribe</button>
      </div>
    `;
};

const setInspectorMode = (mode) => {
  inspectorMode.value = mode;
  if (selectedDatasetId.value) {
    renderInspector(selectedDatasetId.value);
  }
};

const selectDataset = (datasetId) => {
  selectedDatasetId.value = datasetId;
  renderInspector(datasetId);
};

onMounted(() => {
  const L = window.L;
  if (!L) return;

  const map = L.map('map').setView([67.0, 2.0], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  Object.entries(nodeMetadata).forEach(([nodeId, node]) => {
    const marker = L.circleMarker([node.lat, node.lon], {
      radius: nodeId === 'tara_polar' ? 8 : 6,
      weight: 2
    }).addTo(map);
    marker.bindPopup(`<b>${escapeHtml(node.label)}</b><br>${escapeHtml(node.locationName)}<br>${escapeHtml(node.endpoint)}`);
  });

  const taraTrack = [
    [74.0, -38.0],
    [76.2, -26.0],
    [78.6, -18.0],
    [81.7, -8.9],
    [83.1, 6.2]
  ];

  L.polyline(taraTrack, { color: '#8B5CF6', weight: 3, dashArray: '5, 10' }).addTo(map);
});
</script>

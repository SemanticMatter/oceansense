<template>
  <div class="app page-index">
    <header class="topbar">
      <div class="brand">
        <i class="fa-solid fa-circle-nodes" style="color:var(--accent)"></i>
        <span>FJORDLAB DATA PORTAL</span>
      </div>
      <nav class="nav"  aria-label="Primary">
        <RouterLink to="/" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">
            <i class="fa-solid fa-compass"></i> Explorer
          </button>
        </RouterLink>
        <RouterLink to="/datadoc" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">
            <i class="fa-solid fa-file-alt"></i> Data Documentation
          </button>
        </RouterLink>
        <RouterLink to="/node" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">
            <i class="fa-solid fa-network-wired"></i> Node Registry
          </button>
        </RouterLink>
        <RouterLink to="/api_view" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">
            <i class="fa-solid fa-code"></i> Data Access & API
          </button>
        </RouterLink>
        <RouterLink to="/guidelines" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">
            <i class="fa-solid fa-compass-drafting"></i> Guidelines
          </button>
        </RouterLink>
      </nav>
    </header>

    <main id="page-discover" class="page active">
      <div class="workspace">
        <div class="ws-search">
          <div class="searchbar">
            <i class="fa-solid fa-magnifying-glass" style="color:var(--text-muted); margin-right:10px;"></i>
            <input
              placeholder='Filter: "Gunnerus" AND "Engine" AND "Motion"...'
              value='R/V Gunnerus Data Streams'
            />
          </div>
          <div style="display:flex; gap:8px;">
            <span class="chip">Platform: R/V Gunnerus <i class="fa-solid fa-xmark"></i></span>
            <span class="chip">Node: data@sintef <i class="fa-solid fa-xmark"></i></span>
          </div>
        </div>

        <aside class="panel">
          <div class="panel-header">
            <h2>Datasets (5 Found)</h2>
            <span class="pill status">Node Online</span>
          </div>
          <div class="panel-body">
            <article class="dataset-card" onclick="selectDataset(this, 'wind')">
              <div class="dataset-title">
                <div style="display:flex; justify-content:space-between;">
                  <h3>Gunnerus_MetStation_Wind</h3>
                  <span class="pill hz">1 Hz</span>
                </div>
              </div>
              <div class="mini-bars">
                <span class="pill">Type: <strong>Time Series</strong></span>
                <span class="pill">Sensor: <strong>Gill WindObserver</strong></span>
              </div>
              <p class="desc">Real-time wind speed and direction (True/Apparent) corrected for vessel motion.</p>
            </article>

            <article class="dataset-card" onclick="selectDataset(this, 'engine')">
              <div class="dataset-title">
                <div style="display:flex; justify-content:space-between;">
                  <h3>Gunnerus_Propulsion_Telemetry</h3>
                  <span class="pill hz">10 Hz</span>
                </div>
              </div>
              <div class="mini-bars">
                <span class="pill">Type: <strong>Engineering</strong></span>
                <span class="pill">Source: <strong>ECU/Modbus</strong></span>
              </div>
              <p class="desc">Telemetry from 3x Main Scania DI16 engines. RPM, Oil Temp, Exhaust Temp, Fuel Rate.</p>
            </article>

            <article class="dataset-card" onclick="selectDataset(this, 'motion')">
              <div class="dataset-title">
                <div style="display:flex; justify-content:space-between;">
                  <h3>Gunnerus_MRU_Motion</h3>
                  <span class="pill hz">100 Hz</span>
                </div>
              </div>
              <div class="mini-bars">
                <span class="pill">Type: <strong>High-Freq</strong></span>
                <span class="pill">Sensor: <strong>Seapath 380</strong></span>
              </div>
              <p class="desc">Precision positioning (Lat/Lon), Heave, Pitch, Roll, Velocity, and Acceleration vectors.</p>
            </article>

            <article class="dataset-card" onclick="selectDataset(this, 'media')">
              <div class="dataset-title">
                <div style="display:flex; justify-content:space-between;">
                  <h3>Gunnerus_Campaign_Media_2025</h3>
                  <span class="pill">Unstructured</span>
                </div>
              </div>
              <div class="mini-bars">
                <span class="pill">Type: <strong>Image/Video</strong></span>
                <span class="pill">Source: <strong>CCTV/Deck</strong></span>
              </div>
              <p class="desc">Synchronized imagery from deck cameras, ROV feeds, and event logs.</p>
            </article>
          </div>
        </aside>

        <section class="panel map">
          <div id="map"></div>

          <div
            style="position:absolute; bottom:20px; left:20px; right:20px; z-index:500; background:rgba(27,34,44,0.9); padding:10px; border-radius:8px; border:1px solid var(--border); display:flex; align-items:center; gap:15px; backdrop-filter:blur(5px);"
          >
            <i class="fa-solid fa-play" style="color:var(--text-muted);"></i>
            <div style="flex:1; height:4px; background:var(--border); position:relative;">
              <div style="position:absolute; left:20%; width:30%; height:100%; background:var(--accent);"></div>
              <div style="position:absolute; left:20%; top:-4px; width:12px; height:12px; background:white; border-radius:50%;"></div>
              <div style="position:absolute; left:50%; top:-4px; width:12px; height:12px; background:white; border-radius:50%;"></div>
            </div>
            <span class="pill">2024-01-01 -> Now</span>
          </div>
        </section>

        <aside class="panel inspector">
          <div class="panel-header">
            <h2>Data Inspector</h2>
            <span>
              <button
                id="btn-inspector-form"
                class="btn active"
                style="padding:2px 8px; font-size:0.7rem;"
                onclick="setInspectorMode('form')"
              >
                Form View
              </button>
              <button
                id="btn-inspector-json"
                class="btn ghost"
                style="padding:2px 8px; font-size:0.7rem; margin-left: 5px;"
                onclick="setInspectorMode('json')"
              >
                JSON View
              </button>
            </span>
          </div>
          <div class="panel-body" id="inspector-content">
            <div style="text-align:center; margin-top:50px; color:var(--text-faint);">
              <i class="fa-solid fa-arrow-pointer" style="margin-bottom:10px;"></i><br />
              Select a dataset to view<br />telemetry details
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import '../assets/styles/pages/index.css';

onMounted(() => {
  const L = window.L;
  if (!L) {
    return;
  }

  const map = L.map('map').setView([63.45, 10.4], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  const shipIcon = L.divIcon({
    className: 'ship-marker',
    html: '<i class="fa-solid fa-ship"></i>',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const trackLatChords = [
    [63.43, 10.39],
    [63.44, 10.38],
    [63.45, 10.35],
    [63.46, 10.3],
    [63.48, 10.25],
    [63.5, 10.2],
    [63.52, 10.15]
  ];

  L.polyline(trackLatChords, { color: '#8B5CF6', weight: 3, dashArray: '5, 10' }).addTo(map);

  const ship = L.marker([63.52, 10.15], { icon: shipIcon }).addTo(map);
  ship.bindPopup('<b>R/V Gunnerus</b><br>Speed: 12.4 kn<br>Heading: 310°');

  const datasetJson = {
    wind: {
      dataset: 'Gunnerus_MetStation_Wind',
      node_origin: 'data@sintef / Mast Top',
      frequency_hz: '1 Hz',
      live_values: {
        wind_speed_true: '8.2 m/s',
        wind_dir_true: '245°',
        air_temp: '4.1°C',
        pressure: '1012 hPa'
      },
      chart: 'Sparkline Chart',
    },
    engine: {
      dataset: 'Gunnerus_Propulsion',
      frequency_hz: '10 Hz',
      engines: [
        {
          name: 'Main Engine 1 (Scania DI16)',
          rpm: '1,520',
          load: '78%',
          oil_temp: '92°C',
          exhaust_temp: '410°C',
          fuel_rate: '194 g/kWh'
        },
        {
          name: 'Main Engine 2 (Scania DI16)',
          rpm: '1,515',
          load: '77%',
          oil_temp: '91°C',
          exhaust_temp: '390°C',
          fuel_rate: '191 g/kWh'
        },
        {
          name: 'Main Engine 3 (Scania DI16)',
          rpm: '1,490',
          load: '75%',
          oil_temp: '89°C',
          exhaust_temp: '406°C',
          fuel_rate: '203 g/kWh'
        }
      ],

    },
    motion: {
      dataset: 'Gunnerus_MRU_Motion',
      sensor: 'Seapath 380',
      frequency_hz: '100 Hz',
      position_attitude: {
        lat: '63.5201 N',
        lon: '10.1504 E',
        heading: '310.5°',
        roll: '1.2°',
        pitch: '0.4°',
        heave: '0.15 m'
      },
      dynamics: {
        sog: '12.4 kn',
        accel_z: '9.81 m/s²'
      },
    },
    media: {
      dataset: 'Gunnerus_Campaign_Media',
      items: '142 Images, 12 Videos',
      latest_captures: ['Deck Cam 1', 'Aft CCTV', 'ROV Feed', 'Nav Screen'],
      actions: ['Open Media Gallery']
    }
  };

  let inspectorMode = 'form';
  let selectedType = null;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

  const renderInspector = (type) => {
    const container = document.getElementById('inspector-content');
    if (!container) {
      return;
    }

    if (inspectorMode === 'json') {
      const payload = datasetJson[type] || {};
      const json = escapeHtml(JSON.stringify(payload, null, 2));
      container.innerHTML = `<pre class="json-view">${json}</pre>
                      <div style="margin-top:20px; padding-top:15px; border-top:1px solid var(--border); display:flex; gap:10px;">
                  <button class="btn primary" style="flex:1; justify-content:center;"><i class="fa-solid fa-download"></i> Download</button>
                  <button class="btn" style="flex:1; justify-content:center;"><i class="fa-solid fa-bell"></i> Subscribe</button>
                </div>`;
      
      return;
    }

    let content = '';
    if (type === 'wind') {
      content = `
            <div class="kv"><span class="k">Dataset</span><span class="v">Gunnerus_MetStation_Wind</span></div>
            <div class="kv"><span class="k">Node / Origin</span><span class="v">data@sintef / Mast Top</span></div>

            <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">LIVE VALUES (1 Hz)</h3>
            <div class="kv">
                <div class="kv-row"><span>Wind Speed (True)</span> <span>8.2 m/s</span></div>
                <div class="kv-row"><span>Wind Dir (True)</span> <span>245°</span></div>
                <div class="kv-row"><span>Air Temp</span> <span>4.1°C</span></div>
                <div class="kv-row"><span>Pressure</span> <span>1012 hPa</span></div>
            </div>
            <div style="margin-top:15px; height:100px; border:1px solid var(--border); background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:var(--text-faint);">
                [ Sparkline Chart ]
            </div>
        `;
    } else if (type === 'engine') {
      content = `
            <div class="kv"><span class="k">Dataset</span><span class="v">Gunnerus_Propulsion</span></div>
            <div class="kv"><span class="k">Frequency</span><span class="v" style="color:var(--freq)">10 Hz</span></div>

            <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">MAIN ENGINE 1 (Scania DI16)</h3>
            <div class="kv">
                <div class="kv-row"><span>RPM</span> <span>1,520</span></div>
                <div class="kv-row"><span>Load</span> <span>78%</span></div>
                <div class="kv-row"><span>Oil Temp</span> <span>92°C</span></div>
                <div class="kv-row"><span>Exhaust Temp</span> <span>410°C</span></div>
                <div class="kv-row"><span>Fuel Rate</span> <span>194 g/kWh</span></div>
            </div>

            <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">MAIN ENGINE 2 (Scania DI16)</h3>
            <div class="kv">
                <div class="kv-row"><span>RPM</span> <span>1,515</span></div>
                <div class="kv-row"><span>Load</span> <span>77%</span></div>
                <div class="kv-row"><span>Oil Temp</span> <span>91°C</span></div>
                <div class="kv-row"><span>Exhaust Temp</span> <span>390°C</span></div>
                <div class="kv-row"><span>Fuel Rate</span> <span>191 g/kWh</span></div>
            </div>

            <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">MAIN ENGINE 3 (Scania DI16)</h3>
            <div class="kv">
                <div class="kv-row"><span>RPM</span> <span>1,490</span></div>
                <div class="kv-row"><span>Load</span> <span>75%</span></div>
                <div class="kv-row"><span>Oil Temp</span> <span>89°C</span></div>
                <div class="kv-row"><span>Exhaust Temp</span> <span>406°C</span></div>
                <div class="kv-row"><span>Fuel Rate</span> <span>203 g/kWh</span></div>
            </div>
        `;
    } else if (type === 'motion') {
      content = `
            <div class="kv"><span class="k">Dataset</span><span class="v">Gunnerus_MRU_Motion</span></div>
            <div class="kv"><span class="k">Sensor</span><span class="v">Seapath 380</span></div>
            <div class="kv"><span class="k">Frequency</span><span class="v" style="color:var(--freq)">100 Hz</span></div>

            <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">POSITION & ATTITUDE</h3>
            <div class="kv">
                <div class="kv-row"><span>Lat</span> <span>63.5201 N</span></div>
                <div class="kv-row"><span>Lon</span> <span>10.1504 E</span></div>
                <div class="kv-row"><span>Heading</span> <span>310.5°</span></div>
                <div class="kv-row"><span>Roll</span> <span>1.2°</span></div>
                <div class="kv-row"><span>Pitch</span> <span>0.4°</span></div>
                <div class="kv-row"><span>Heave</span> <span>0.15 m</span></div>
            </div>

             <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">DYNAMICS</h3>
            <div class="kv">
                <div class="kv-row"><span>SOG</span> <span>12.4 kn</span></div>
                <div class="kv-row"><span>Accel Z</span> <span>9.81 m/s²</span></div>
            </div>
        `;
    } else if (type === 'media') {
      content = `
            <div class="kv"><span class="k">Dataset</span><span class="v">Gunnerus_Campaign_Media</span></div>
            <div class="kv"><span class="k">Items</span><span class="v">142 Images, 12 Videos</span></div>

            <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">LATEST CAPTURES</h3>
            <div class="media-grid">
                <div class="media-item" style="background:#222;">Deck Cam 1</div>
                <div class="media-item" style="background:#222;">Aft CCTV</div>
                <div class="media-item" style="background:#222;">ROV Feed</div>
                <div class="media-item" style="background:#222;">Nav Screen</div>
            </div>
            <button class="btn primary" style="width:100%; justify-content:center; margin-top:15px;">Open Media Gallery</button>
        `;
    }

    content += `
        <div style="margin-top:20px; padding-top:15px; border-top:1px solid var(--border); display:flex; gap:10px;">
            <button class="btn primary" style="flex:1; justify-content:center;">Download</button>
            <button class="btn" style="flex:1; justify-content:center;">Subscribe</button>
        </div>
    `;

    container.innerHTML = content;
  };

  window.setInspectorMode = (mode) => {
    inspectorMode = mode;
    document.getElementById('btn-inspector-form').classList.toggle('active', mode === 'form');
    document.getElementById('btn-inspector-json').classList.toggle('active', mode === 'json');
    document.getElementById('btn-inspector-json').classList.toggle('ghost', mode !== 'json');
    document.getElementById('btn-inspector-form').classList.toggle('ghost', mode !== 'form');
    if (selectedType) {
      renderInspector(selectedType);
    }
  };

  window.selectDataset = (el, type) => {
    document.querySelectorAll('.dataset-card').forEach((card) => card.classList.remove('active'));
    el.classList.add('active');
    selectedType = type;
    renderInspector(type);
  };
});
</script>

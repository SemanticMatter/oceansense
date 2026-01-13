<template>
  <div class="app page-node">
    <header class="topbar">
      <div class="brand">
        <i class="fa-solid fa-circle-nodes" style="color:var(--accent)"></i>
        <span>FJORDLAB DATA PORTAL</span>
      </div>
      <nav class="nav">
        <RouterLink to="/" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">Explorer</button>
        </RouterLink>
        <RouterLink to="/node" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">Node Registry</button>
        </RouterLink>
        <RouterLink to="/api_view" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">Data Access & API</button>
        </RouterLink>
        <RouterLink to="/datadoc" custom v-slot="{ navigate, isActive }">
          <button :class="{ active: isActive }" @click="navigate">Data Documentation</button>
        </RouterLink>
      </nav>
    </header>

    <div class="page">
      <div class="registry-workspace">
        <main class="main-area">
          <div>
            <h1>Node Registry</h1>
            <p>
              Configure the federated data layer. Each "Node" represents an external OGC SensorThings endpoint.
              The orchestrator queries these nodes in parallel to fulfill user requests.
            </p>

            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-val">4</span>
                <span class="stat-label">Total Nodes</span>
                <span class="stat-sub">Registered Endpoints</span>
              </div>
              <div class="stat-card">
                <span class="stat-val" style="color:var(--success)">3</span>
                <span class="stat-label">Online</span>
                <span class="stat-sub">100% Availability</span>
              </div>
              <div class="stat-card">
                <span class="stat-val" style="color:var(--warning)">1</span>
                <span class="stat-label">Degraded</span>
                <span class="stat-sub">High Latency (>500ms)</span>
              </div>
              <div class="stat-card">
                <span class="stat-val">MQTT</span>
                <span class="stat-label">Primary Protocol</span>
                <span class="stat-sub">1 Node(s) Streaming</span>
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="position:relative; width: 300px;">
              <i class="fa-solid fa-search" style="position:absolute; left:10px; top:10px; color:var(--text-muted)"></i>
              <input class="input" style="padding-left:35px;" placeholder="Search nodes..." />
            </div>
            <button class="btn primary" onclick="showAddNode()"><i class="fa-solid fa-plus"></i> Register Node</button>
          </div>

          <div class="nodes-grid">
            <div class="node-card active" onclick="loadNode('aalesund')">
              <div class="nc-header">
                <div>
                  <div class="nc-title">fjordlab_data@aalesund</div>
                  <div class="nc-sub">Aalesund, NO</div>
                </div>
                <div class="status-dot online" title="Online"></div>
              </div>
              <div style="display:flex; gap:5px; margin-bottom:10px;">
                <span class="tag">HTTP</span>
                <span class="tag">MQTT</span>
              </div>
              <div class="nc-sub">https://fjordlab.ntnu.no/api/v1</div>
              <div class="nc-metrics">
                <span class="metric" style="color:var(--success)"><i class="fa-solid fa-heart-pulse"></i> 24ms</span>
                <span class="metric"><i class="fa-solid fa-database"></i> 142Mb</span>
                <span class="metric"><i class="fa-solid fa-clock"></i> 2s ago</span>
              </div>
            </div>

            <div class="node-card" onclick="loadNode('sintef')">
              <div class="nc-header">
                <div>
                  <div class="nc-title">data@sintef</div>
                  <div class="nc-sub">Trondheim, NO</div>
                </div>
                <div class="status-dot online" title="Online"></div>
              </div>
              <div style="display:flex; gap:5px; margin-bottom:10px;">
                <span class="tag">HTTP</span>
                <span class="tag">MQTT</span>
              </div>
              <div class="nc-sub">https://data.sintef.no/api/</div>
              <div class="nc-metrics">
                <span class="metric" style="color:var(--success)"><i class="fa-solid fa-heart-pulse"></i> 45ms</span>
                <span class="metric"><i class="fa-solid fa-database"></i> 8.2Gb</span>
                <span class="metric"><i class="fa-solid fa-clock"></i> 1m ago</span>
              </div>
            </div>

            <div class="node-card" onclick="loadNode('remote03')">
              <div class="nc-header">
                <div>
                  <div class="nc-title">remote-node-03</div>
                  <div class="nc-sub">Svalbard, NO</div>
                </div>
                <div class="status-dot degraded" title="Degraded - High Latency"></div>
              </div>
              <div style="display:flex; gap:5px; margin-bottom:10px;">
                <span class="tag">HTTP</span>
                <span class="tag">AMQP</span>
              </div>
              <div class="nc-sub">https://satlink.svalbard.ntnu.no/st</div>
              <div class="nc-metrics">
                <span class="metric" style="color:var(--warning)"><i class="fa-solid fa-heart-pulse"></i> 850ms</span>
                <span class="metric"><i class="fa-solid fa-database"></i> 12k</span>
                <span class="metric"><i class="fa-solid fa-clock"></i> 15m ago</span>
              </div>
            </div>

            <div class="node-card" style="opacity:0.7;">
              <div class="nc-header">
                <div>
                  <div class="nc-title">dev-test-node-01</div>
                  <div class="nc-sub">Localhost</div>
                </div>
                <div class="status-dot offline" title="Offline"></div>
              </div>
              <div style="display:flex; gap:5px; margin-bottom:10px;">
                <span class="tag">HTTP</span>
              </div>
              <div class="nc-sub">http://localhost:8080/v1.1</div>
              <div class="nc-metrics">
                <span class="metric" style="color:var(--danger)"><i class="fa-solid fa-triangle-exclamation"></i> Timeout</span>
                <span class="metric"><i class="fa-solid fa-clock"></i> 4h ago</span>
              </div>
            </div>
          </div>
        </main>

        <aside class="inspector-panel" id="inspector">
          <div class="panel-header">
            <div>
              <h2 style="margin:0; font-size:1.1rem;">fjordlab_data@aalesund</h2>
              <span style="font-size:0.8rem; color:var(--success);"><i class="fa-solid fa-circle"></i> Operational</span>
            </div>
            <div style="display:flex; gap:5px;">
              <button class="btn btn-sm"><i class="fa-solid fa-arrows-rotate"></i></button>
              <button class="btn btn-sm"><i class="fa-solid fa-up-right-from-square"></i></button>
            </div>
          </div>

          <div class="panel-content">
            <div class="tabs">
              <div class="tab active" onclick="switchTab('config')">Configuration</div>
              <div class="tab" onclick="switchTab('health')">Health & Logs</div>
            </div>

            <div id="tab-config">
              <div class="form-group">
                <label class="form-label">Display Name</label>
                <input class="input" value="fjordlab_data@aalesund" />
              </div>

              <div class="form-group">
                <label class="form-label">Base HTTP URL</label>
                <input class="input" value="https://fjordlab.ntnu.no/api/v1" />
                <div style="margin-top:5px; font-size:0.7rem; color:var(--success);"><i class="fa-solid fa-check"></i> Valid OGC Endpoint</div>
              </div>

              <div class="form-group">
                <label class="form-label">MQTT Broker URL</label>
                <input class="input" value="mqtt://fjordlab.ntnu.no" />
              </div>

              <div class="form-group">
                <label class="form-label">Authentication</label>
                <select class="input">
                  <option>API Key</option>
                  <option>Bearer Token</option>
                  <option>None (Public)</option>
                </select>
              </div>

              <h3>Routing Settings</h3>
              <div
                class="form-group"
                style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-inset); padding:10px; border-radius:var(--r-6);"
              >
                <label class="form-label" style="margin:0">Enabled for Global Query</label>
                <input type="checkbox" checked style="accent-color:var(--accent); transform:scale(1.2);" />
              </div>
            </div>

            <div id="tab-health" style="display:none;">
              <div style="background:var(--bg-inset); padding:15px; border-radius:var(--r-6); margin-bottom:20px;">
                <label class="form-label">Capabilities Detected</label>
                <div style="display:flex; gap:5px; flex-wrap:wrap; margin-top:5px;">
                  <span class="tag">Datastreams</span>
                  <span class="tag">PSQL-API</span>
                  <span class="tag">TimescaleDB-API</span>
                  <span class="tag">S3</span>
                  <span class="tag">MultiDatastream</span>
                  <span class="tag">MQTT</span>
                  <span class="tag">AMQP</span>
                </div>
              </div>

              <label class="form-label">Connection Log</label>
              <div class="log-terminal">
                <div class="log-entry ok">[10:02:44] Heartbeat OK (24ms)</div>
                <div class="log-entry ok">[10:02:14] Heartbeat OK (28ms)</div>
                <div class="log-entry">[10:01:44] Syncing Metadata...</div>
                <div class="log-entry ok">[10:01:45] Sync Complete. 4 New Datastreams.</div>
                <div class="log-entry ok">[10:01:14] Heartbeat OK (22ms)</div>
                <div class="log-entry err">[09:55:00] Timeout (5000ms) - Retrying...</div>
              </div>
            </div>
          </div>

          <div class="panel-footer" style="display:flex; justify-content:space-between;">
            <button class="btn danger">Remove Node</button>
            <button class="btn primary">Save Changes</button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import '../assets/styles/pages/node.css';

onMounted(() => {
  window.switchTab = (tabName) => {
    document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));
    if (window.event?.target) {
      window.event.target.classList.add('active');
    }

    document.getElementById('tab-config').style.display = tabName === 'config' ? 'block' : 'none';
    document.getElementById('tab-health').style.display = tabName === 'health' ? 'block' : 'none';
  };

  window.loadNode = (id) => {
    document.querySelectorAll('.node-card').forEach((card) => card.classList.remove('active'));
    if (window.event?.currentTarget) {
      window.event.currentTarget.classList.add('active');
    }

    const titleMap = {
      aalesund: 'fjordlab_data@aalesund',
      sintef: 'data@sintef',
      remote03: 'remote-node-03'
    };

    const titleEl = document.querySelector('.inspector-panel h2');
    if (titleEl) {
      titleEl.innerText = titleMap[id] || 'Node Details';
    }
  };

  window.showAddNode = () => {
    const titleEl = document.querySelector('.inspector-panel h2');
    if (titleEl) {
      titleEl.innerText = 'Register New Node';
    }
    document.querySelectorAll('.input').forEach((input) => {
      input.value = '';
    });
  };
});
</script>

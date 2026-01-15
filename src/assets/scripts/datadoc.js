/* global L */
import { datasets, items, connections } from '../data/fjordlab-datasets';

export function initDatadoc() {
  
        /**
         * Deep Ocean prototype with a working FAIR wizard.
         */
  
      const state = {
        view: 'explorer',
        centerView: 'map',      // 'map' | 'graph'
        inspectorMode: 'form',  // 'form' | 'json'
        selectedDatasetId: null,
        query: '',
        datasetPage: 0,
        datasets: datasets.map((ds) => ({ ...ds })),
        items: items.map((item) => ({ ...item })),
        connections: connections.map((link) => ({ ...link })),
          wizard: {
          datasetId: null,
          stepIndex: 0,
          answers: {},
          tipHidden: false
          }
        };
  
        const wizardSteps = [
          {
              id: 'summary',
              section: 'Data Summary',
              title: 'Data Summary',
              subtitle: 'Basics, keywords, and coverage in one place.',
              fields: [
              { group:'Basics', key:'title', label:'Dataset title', type:'text', required:true, hint:'Keep it specific (region + variable + time span).' },
              { group:'Basics', key:'abstract', label:'Abstract / description', type:'textarea', required:true, hint:'Aim for ~2–5 sentences. Include what/where/when/how.' },
  
              { group:'Keywords', key:'keywords', label:'Keywords (comma-separated)', type:'text', required:true, hint:'Example: oslofjord, water quality, netcdf, turbidity' },
              { group:'Keywords', key:'discipline', label:'Discipline / domain', type:'text', required:false, hint:'Example: oceanography, coastal monitoring' },
  
              { group:'Coverage', key:'time_start', label:'Start date', type:'date', required:true },
              { group:'Coverage', key:'time_end', label:'End date', type:'date', required:true },
              { group:'Coverage', key:'spatial_desc', label:'Spatial description', type:'text', required:false, hint:'Example: Oslofjord bbox, Station M point, Nordic Seas region' }
              ]
          },
  
          {
              id: 'find',
              section: 'Findable',
              title: 'Findability',
              subtitle: 'PID, metadata standard, and contact details.',
              fields: [
              { group:'Identifier', key:'pid', label:'PID / DOI / handle', type:'text', required:true, hint:'Example: doi:10.xxxx/xxxxx (or planned PID)' },
              { group:'Identifier', key:'version', label:'Version', type:'text', required:true, hint:'Example: 1.0.0' },
  
              { group:'Metadata', key:'metadata_standard', label:'Metadata standard', type:'select', required:true, options:['DCAT', 'ISO 19115', 'EML', 'CF/ACDD', 'Other'] },
              { group:'Metadata', key:'metadata_other', label:'If “Other”, specify', type:'text', required:false },
  
              { group:'Contact', key:'contact_name', label:'Contact name', type:'text', required:true },
              { group:'Contact', key:'contact_email', label:'Contact email', type:'text', required:true }
              ]
          },
  
          {
              id: 'access',
              section: 'Accessible',
              title: 'Access',
              subtitle: 'How users get the data and any access controls.',
              fields: [
              { group:'Distribution', key:'access_url', label:'Access URL', type:'text', required:true, hint:'OPeNDAP, ERDDAP, HTTPS, S3, etc.' },
              { group:'Distribution', key:'access_protocol', label:'Protocol', type:'select', required:true, options:['HTTPS', 'OPeNDAP', 'ERDDAP', 'S3', 'Other'] },
  
              { group:'Policy', key:'auth', label:'Access control', type:'select', required:true, options:['Open', 'Registration', 'Institutional', 'Restricted'] },
              { group:'Policy', key:'auth_notes', label:'Policy notes', type:'textarea', required:false }
              ]
          },
  
          {
              id: 'interop',
              section: 'Interoperable',
              title: 'Interoperability',
              subtitle: 'Vocabularies, structure, and conventions.',
              fields: [
              { group:'Semantics', key:'vocab', label:'Vocabularies (comma-separated)', type:'text', required:true, hint:'Example: CF Standard Names, SeaDataNet P01, SOSA/SSN' },
              { group:'Semantics', key:'units', label:'Units convention', type:'text', required:false, hint:'Example: UDUNITS / CF conventions' },
  
              { group:'Structure', key:'format', label:'Primary format', type:'select', required:true, options:['NetCDF', 'CSV', 'Parquet', 'GeoTIFF', 'Other'] },
              { group:'Structure', key:'schema_notes', label:'Structure notes', type:'textarea', required:false, hint:'Variables, dimensions, conventions (CF/ACDD), etc.' }
              ]
          },
  
          {
              id: 'reuse',
              section: 'Reusable',
              title: 'Reuse & Provenance',
              subtitle: 'License, citation, and quality signals.',
              fields: [
              { group:'License', key:'license', label:'License', type:'select', required:true, options:['CC-BY-4.0', 'CC0-1.0', 'ODC-BY', 'Proprietary', 'Other'] },
              { group:'License', key:'license_other', label:'If “Other”, specify', type:'text', required:false },
  
              { group:'Citation', key:'citation', label:'Preferred citation', type:'textarea', required:true, hint:'Authors (Year). Title. Version. PID. Publisher.' },
              { group:'Citation', key:'contributors', label:'Contributors', type:'text', required:false },
  
              { group:'Quality', key:'processing_level', label:'Processing level', type:'text', required:true, hint:'Example: L2, L3, delayed-mode adjusted' },
              { group:'Quality', key:'qc_protocol', label:'QC protocol', type:'text', required:true, hint:'Example: QARTOD, Argo QC, product QC' },
              { group:'Quality', key:'provenance_notes', label:'Provenance notes', type:'textarea', required:false }
              ]
          },
  
          {
              id: 'ops',
              section: 'Operations',
              title: 'Operations & Risk',
              subtitle: 'Preservation, retention, and ethics/security.',
              fields: [
              { group:'Preservation', key:'retention', label:'Retention period', type:'select', required:true, options:['1 year', '5 years', '10 years', 'Indefinite'] },
              { group:'Preservation', key:'backup', label:'Backups / replication', type:'text', required:false },
  
              { group:'Ethics & Security', key:'sensitive', label:'Contains sensitive data?', type:'select', required:true, options:['No', 'Yes'] },
              { group:'Ethics & Security', key:'ethics_notes', label:'Notes / mitigations', type:'textarea', required:false }
              ]
          },
  
          {
              id: 'publish',
              section: 'Publish',
              title: 'Finish',
              subtitle: 'Apply changes and generate an updated score.',
              fields: [
              { key:'ready', label:'Ready to apply?', type:'select', required:true, options:['Yes', 'Not yet'] }
              ]
          }
          ];
  
        /* =========
           Leaflet map
           ========= */
      let map, layerGroup;
      let graphNodes = [];
      let graphLinks = [];
      let graphDimensions = { width: 0, height: 0 };
      let graphRenderTarget = null;
  
        function ensureMap() {
          if (map) return;
  
          map = L.map('map', { zoomControl: true }).setView([63.45, 10.4], 5);
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
  
          layerGroup = L.layerGroup().addTo(map);
        }
  
        function renderSpatialOnMap(ds) {
          ensureMap();
          layerGroup.clearLayers();
  
          if (!ds || !ds.spatial) {
            map.setView([63.45, 10.4], 5);
            return;
          }
  
          const s = ds.spatial;
  
          if (s.type === 'point' && s.point && Number.isFinite(s.point.lat) && Number.isFinite(s.point.lon)) {
            const lat = Number(s.point.lat);
            const lon = Number(s.point.lon);
            const marker = L.circleMarker([lat, lon], { radius: 7, weight: 2 }).addTo(layerGroup);
            marker.bindPopup(`<b>${escapeHtml(s.placeName || 'Location')}</b><br>${lat.toFixed(4)}, ${lon.toFixed(4)}`);
            map.setView([lat, lon], 6);
            return;
          }
  
          if (s.type === 'bbox' && Array.isArray(s.bbox) && s.bbox.length === 4) {
            const [minLon, minLat, maxLon, maxLat] = s.bbox.map(Number);
            if ([minLon, minLat, maxLon, maxLat].every(Number.isFinite)) {
              const bounds = [[minLat, minLon], [maxLat, maxLon]];
              L.rectangle(bounds, { weight: 2, dashArray: '6,8' }).addTo(layerGroup);
              map.fitBounds(bounds, { padding: [14, 14] });
              return;
            }
          }
  
          map.setView([63.45, 10.4], 5);
        }
  
        /* =========
           UI helpers
           ========= */
        function escapeHtml(str) {
          return (str ?? '').toString()
            .replaceAll('&','&amp;')
            .replaceAll('<','&lt;')
            .replaceAll('>','&gt;')
            .replaceAll('"','&quot;')
            .replaceAll("'","&#039;");
        }
  
        function formatTemporal(ds) {
          const t = ds?.temporal;
          if (!t?.start && !t?.end) return '—';
          const start = t?.start || '…';
          const end = t?.end || '…';
          const res = t?.resolution ? ` (${t.resolution})` : '';
          return `${start} → ${end}${res}`;
        }
  
        function formatSpatial(ds) {
          const s = ds?.spatial;
          if (!s) return '—';
          if (s.type === 'point' && s.point) return `${s.placeName || 'Point'} (${Number(s.point.lat).toFixed(2)}°, ${Number(s.point.lon).toFixed(2)}°)`;
          if (s.type === 'bbox' && Array.isArray(s.bbox)) return `${s.placeName || 'BBox'} (BBox)`;
          return s.placeName || '—';
        }
  
        function formatCompleteness(ds) {
          const pct = Math.round((ds?.completeness ?? 0) * 100);
          if (pct >= 85) return { label: `${pct}%`, cls: 'status' };
          if (pct >= 60) return { label: `${pct}%`, cls: 'warn' };
          return { label: `${pct}%`, cls: '' };
        }
  
        /* =========
           Rendering
           ========= */
        const ui = {
        navigate(view) {
        state.view = view;

        // pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${view}`)?.classList.add('active');

        // nav
        document.querySelectorAll('.doc-nav button').forEach(b => b.classList.remove('active'));
        const navId = view === 'explorer'
            ? 'nav-explorer'
            : (view === 'wizard' ? 'nav-wizard' : 'nav-review');

        const navBtn = document.getElementById(navId);
          if (navBtn) navBtn.classList.add('active');
  
          if (view === 'wizard') ui.renderWizard();
          if (view === 'review') ui.renderReview();
          if (view === 'explorer') setTimeout(() => { if (map) map.invalidateSize(); }, 60);
          },
  
  
          toggleWizardTip() {
              state.wizard.tipHidden = !state.wizard.tipHidden;
              ui.renderWizard();
              },
  
          setCenterView(mode) {
            state.centerView = mode;

            document.getElementById('btn-view-map').classList.toggle('active', mode === 'map');
            document.getElementById('btn-view-graph').classList.toggle('active', mode === 'graph');

            document.getElementById('map').classList.toggle('hidden', mode !== 'map');
            document.getElementById('graph-wrap').classList.toggle('hidden', mode !== 'graph');

            document.getElementById('center-title').textContent = mode === 'map' ? 'Geographic Preview' : 'Connections Map';

            const centerStage = document.querySelector('.center-stage');
            if (centerStage) {
              centerStage.classList.toggle('is-graph', mode === 'graph');
            }

            if (mode === 'map') setTimeout(() => { if (map) map.invalidateSize(); }, 60);
            if (mode === 'graph') ui.renderGraph();
          },
  
          setInspectorMode(mode) {
            state.inspectorMode = mode;
            document.getElementById('btn-inspector-form').classList.toggle('active', mode === 'form');
            document.getElementById('btn-inspector-json').classList.toggle('active', mode === 'json');
            document.getElementById('btn-inspector-json').classList.toggle('ghost', mode !== 'json');
            document.getElementById('btn-inspector-form').classList.toggle('ghost', mode !== 'form');
            ui.renderInspector();
          },
  
          clearSelection() {
            state.selectedDatasetId = null;
  
            // reset wizard selection/session
            state.wizard.datasetId = null;
            state.wizard.stepIndex = 0;
            state.wizard.answers = {};
  
            document.getElementById('chip-selected').style.display = 'none';
            document.getElementById('chip-selected-text').textContent = '';
            document.getElementById('inspector').innerHTML = `
              <div style="text-align:center; margin-top:50px; color:var(--text-faint);">
                <i class="fa-solid fa-arrow-pointer" style="margin-bottom:10px;"></i><br>
                Select a dataset to view<br>details
              </div>
            `;
            document.getElementById('range-pill').textContent = '—';
            document.querySelectorAll('.dataset-card').forEach(c => c.classList.remove('active'));
  
            renderSpatialOnMap(null);
            ui.renderReview();
            ui.renderGraph();
            if (state.view === 'wizard') ui.renderWizard();
          },
  
          renderDatasetList() {
            const container = document.getElementById('dataset-list');
            const q = (state.query || '').trim().toLowerCase();
  
            const filtered = state.datasets.filter(ds => {
              if (!q) return true;
              const hay = `${ds.title} ${ds.description} ${(ds.topics||[]).join(' ')}`.toLowerCase();
              return hay.includes(q);
            });

            const pageSize = 4;
            const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
            const page = Math.min(state.datasetPage, totalPages - 1);
            state.datasetPage = page;

            const start = page * pageSize;
            const visible = filtered.slice(start, start + pageSize);

            const countLabel = filtered.length
              ? `Datasets (${start + 1}-${Math.min(start + pageSize, filtered.length)} of ${filtered.length})`
              : 'Datasets (0 Found)';

            document.getElementById('datasets-title').textContent = countLabel;

            container.innerHTML = visible.map(ds => {
              const freqPill = ds.temporal?.resolution ? `<span class="pill hz">${escapeHtml(ds.temporal.resolution)}</span>` : `<span class="pill">Unspecified</span>`;
              const comp = formatCompleteness(ds);
              const compPill = `<span class="pill ${comp.cls}">${escapeHtml(comp.label)} Complete</span>`;
  
              return `
                <article class="dataset-card ${state.selectedDatasetId === ds.id ? 'active' : ''}" onclick="ui.selectDataset('${ds.id}')">
                  <div class="dataset-title">
                    <div style="display:flex; justify-content:space-between; gap:10px;">
                      <h3 title="${escapeHtml(ds.title)}">${escapeHtml(ds.title)}</h3>
                      <div style="display:flex; gap:6px; align-items:flex-start; flex-wrap:wrap; justify-content:flex-end;">
                        ${freqPill}
                      </div>
                    </div>
                  </div>
  
                  <div class="mini-bars">
                    <span class="pill">Org: <strong>${escapeHtml(ds.organization || '—')}</strong></span>
                    <span class="pill">Status: <strong>${escapeHtml(ds.status || '—')}</strong></span>
                    ${compPill}
                  </div>
  
                  <p class="desc">${escapeHtml(ds.description || '')}</p>
                </article>
              `;
            }).join('');

            const prevBtn = document.getElementById('dataset-prev');
            const nextBtn = document.getElementById('dataset-next');
            if (prevBtn) prevBtn.disabled = page === 0;
            if (nextBtn) nextBtn.disabled = page >= totalPages - 1;
          },
  
          selectDataset(id) {
            state.selectedDatasetId = id;
  
            // reset wizard session when switching datasets
            if (state.wizard.datasetId !== id) {
              state.wizard.datasetId = id;
              state.wizard.stepIndex = 0;
              state.wizard.answers = {};
            }
  
            const ds = state.datasets.find(d => d.id === id);
  
            // chip
            document.getElementById('chip-selected').style.display = 'inline-flex';
            document.getElementById('chip-selected-text').textContent = ds ? ds.title : id;
  
            ui.renderDatasetList();
            ui.renderInspector();
            ui.renderReview();
            ui.renderGraph();
  
            document.getElementById('range-pill').textContent = ds ? formatTemporal(ds) : '—';
            renderSpatialOnMap(ds);
  
            if (state.view === 'wizard') ui.renderWizard();
          },

          nextDatasetPage() {
            state.datasetPage += 1;
            ui.renderDatasetList();
          },

          prevDatasetPage() {
            state.datasetPage = Math.max(0, state.datasetPage - 1);
            ui.renderDatasetList();
          },
  
          renderInspector() {
            const container = document.getElementById('inspector');
            const ds = state.datasets.find(d => d.id === state.selectedDatasetId);
  
            if (!ds) return;
  
            if (state.inspectorMode === 'json') {
              container.innerHTML = `
                <div class="kv">
                  <span class="k">Dataset JSON</span>
                  <span class="v"><pre class="json-view">${escapeHtml(JSON.stringify(ds, null, 2))}</pre></span>
                </div>
              `;
              return;
            }
  
            const comp = formatCompleteness(ds);
            const compPill = `<span class="pill ${comp.cls}">${escapeHtml(comp.label)} Complete</span>`;
  
            container.innerHTML = `
              <div class="kv"><span class="k">Dataset</span><span class="v">${escapeHtml(ds.title)}</span></div>
              <div class="kv"><span class="k">Organization</span><span class="v">${escapeHtml(ds.organization || '—')}</span></div>
              <div class="kv"><span class="k">Access</span><span class="v">${escapeHtml(ds.access || '—')}</span></div>
  
              <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">OVERVIEW</h3>
              <div class="kv">
                <div class="kv-row"><span>Status</span> <span>${escapeHtml(ds.status || '—')}</span></div>
                <div class="kv-row"><span>License</span> <span>${escapeHtml(ds.license || '—')}</span></div>
                <div class="kv-row"><span>FAIR Completeness</span> <span>${escapeHtml(comp.label)}</span></div>
                <div class="kv-row"><span>Time</span> <span>${escapeHtml(formatTemporal(ds))}</span></div>
                <div class="kv-row"><span>Geo</span> <span>${escapeHtml(formatSpatial(ds))}</span></div>
              </div>
  
              <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">CONTEXT</h3>
              <div class="kv">
                <div class="kv-row"><span>Platform</span> <span>${escapeHtml(ds.platform?.name || '—')}</span></div>
                <div class="kv-row"><span>Processing</span> <span>${escapeHtml(ds.provenance?.processing_level || '—')}</span></div>
                <div class="kv-row"><span>QC Protocol</span> <span>${escapeHtml(ds.provenance?.qc?.protocol || '—')}</span></div>
              </div>
  
              <div style="display:flex; gap:8px; align-items:center; margin: 10px 0 4px;">
                <span class="pill info"><i class="fa-solid fa-tags"></i> Topics</span>
                ${compPill}
              </div>
              <div class="topic-row">
                ${(ds.topics || []).slice(0, 10).map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('')}
                ${(ds.topics || []).length > 10 ? `<span class="pill">+${(ds.topics||[]).length - 10}</span>` : ``}
              </div>
  
            `;
          },
  
          renderGraph() {
            const svg = document.getElementById('graph-svg');
            if (!svg) return;
            svg.innerHTML = '';

            const dsId = state.selectedDatasetId;
            if (!dsId) {
              svg.innerHTML = `
                <text x="50%" y="50%" text-anchor="middle" fill="${getComputedStyle(document.documentElement).getPropertyValue('--text-faint').trim()}" font-weight="700">
                  Select a dataset to see its connections
                </text>
              `;
              return;
            }
  
            const wrap = document.getElementById('graph-wrap');
            const rect = wrap ? wrap.getBoundingClientRect() : svg.getBoundingClientRect();
            const width = Math.max(300, rect.width || 0);
            const height = Math.max(260, rect.height || 0);
            svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

            const cx = width / 2;
            const cy = height * 0.35;
            const links = state.connections.filter(c => c.source === dsId || c.target === dsId);

            graphDimensions = { width, height };
            graphLinks = links.map((link, i) => {
              const otherId = link.source === dsId ? link.target : link.source;
              const item = state.items.find(x => x.id === otherId);
              return { ...link, otherId, item, index: i };
            }).filter((link) => link.item);

            const orbitR = Math.min(width, height) * 0.32;
            const nodeCount = graphLinks.length;

            graphNodes = [
              { id: dsId, x: cx, y: cy, type: 'dataset', label: 'Dataset' }
            ];

            graphLinks.forEach((link, i) => {
              const angle = (i / Math.max(1, nodeCount)) * 2 * Math.PI - Math.PI / 2;
              const x = cx + orbitR * Math.cos(angle);
              const y = cy + orbitR * Math.sin(angle);
              graphNodes.push({
                id: link.otherId,
                x,
                y,
                type: link.item.type,
                label: link.item.name,
                linkType: link.type
              });
            });

            graphRenderTarget = svg;
            renderGraphScene();
          },
  
          flashInspectorForItem(item, relType) {
            const container = document.getElementById('inspector');
            const ds = state.datasets.find(d => d.id === state.selectedDatasetId);
            if (!ds) return;
  
            if (state.inspectorMode === 'json') return;
  
            container.innerHTML = `
              <div class="kv"><span class="k">Linked Item</span><span class="v">${escapeHtml(item.name)}</span></div>
              <div class="kv"><span class="k">Relationship</span><span class="v">${escapeHtml(relType)}</span></div>
  
              <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 5px 0;">IN CONTEXT</h3>
              <div class="kv">
                <div class="kv-row"><span>Dataset</span><span>${escapeHtml(ds.title)}</span></div>
                <div class="kv-row"><span>Type</span><span>${escapeHtml(item.type)}</span></div>
                <div class="kv-row"><span>Hint</span><span>${escapeHtml(typeHint(item.type))}</span></div>
              </div>
  
            `;
          },
  
          renderReview() {
            const body = document.getElementById('review-body');
            const ds = state.datasets.find(d => d.id === state.selectedDatasetId);
  
            if (!ds) {
              body.innerHTML = `<div style="text-align:center; margin: 22px 0; color: var(--text-faint);">
                Select a dataset in Explorer to generate a review.
              </div>`;
              return;
            }
  
            const checks = [
              { label: 'Has a descriptive title', pass: !!ds.title },
              { label: 'Has a detailed description', pass: (ds.description || '').length > 40 },
              { label: 'Access link provided', pass: !!ds.access },
              { label: 'License defined', pass: !!ds.license },
              { label: 'Topics present', pass: (ds.topics || []).length > 0 },
              { label: 'Temporal coverage present', pass: !!ds.temporal?.start && !!ds.temporal?.end },
              { label: 'Spatial coverage present', pass: !!ds.spatial && (!!ds.spatial.point || !!ds.spatial.bbox) }
            ];
  
            const score = Math.round((checks.filter(c => c.pass).length / checks.length) * 100);
            const ringColor = score >= 85 ? 'var(--success)' : (score >= 60 ? 'var(--warning)' : 'var(--danger)');
  
            body.innerHTML = `
              <div class="kv" style="display:flex; align-items:center; justify-content:space-between; gap:14px;">
                <div>
                  <div style="color:var(--text-muted); font-weight:800; text-transform:uppercase; letter-spacing:0.6px; font-size:0.75rem;">Dataset</div>
                  <div style="margin-top:6px; font-weight:800; color:var(--text);">${escapeHtml(ds.title)}</div>
                </div>
                <div style="
                  width: 92px; height: 92px; border-radius: 50%;
                  border: 8px solid ${ringColor};
                  display:flex; align-items:center; justify-content:center;
                  font-weight: 900; font-size: 1.4rem; color: var(--text);
                  background: rgba(0,0,0,0.10);
                ">
                  ${score}%
                </div>
              </div>
  
              <h3 style="font-size:0.8rem; color:var(--text-muted); margin:15px 0 8px 0;">CHECKLIST</h3>
              <div class="kv">
                ${checks.map(c => `
                  <div class="kv-row">
                    <span>${escapeHtml(c.label)}</span>
                    <span style="font-family:var(--font-sans); font-weight:900; color:${c.pass ? 'var(--success)' : 'var(--text-faint)'};">
                      ${c.pass ? 'OK' : 'MISSING'}
                    </span>
                  </div>
                `).join('')}
              </div>
  
              <div style="margin-top:16px; display:flex; gap:10px;">
                <button class="btn" style="flex:1; justify-content:center;" onclick="ui.navigate('wizard')">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Improve via Wizard
                </button>
                <button class="btn primary" style="flex:1; justify-content:center;" onclick="ui.navigate('explorer')">
                  <i class="fa-solid fa-compass"></i> Back to Explorer
                </button>
              </div>
            `;
          },
  
          recomputeScore() {
            ui.renderReview();
          },
  
          /* =========================
             Wizard navigation + rendering
             ========================= */
          gotoStep(i) {
            const max = wizardSteps.length - 1;
            const next = Math.max(0, Math.min(max, i));
            state.wizard.stepIndex = next;
            ui.renderWizard();
          },
  
          nextStep() {
            ui.gotoStep(state.wizard.stepIndex + 1);
          },
  
          prevStep() {
            ui.gotoStep(state.wizard.stepIndex - 1);
          },
  
          renderWizard() {
            const ds = state.datasets.find(d => d.id === state.selectedDatasetId);
            const pill = document.getElementById('wizard-dataset-pill');
            const descEl = document.getElementById('wizard-dataset-desc');
            if (descEl) {
              descEl.textContent = ds
                  ? (ds.description || '—')
                  : 'No dataset selected — pick one in Explorer to begin.';
              descEl.title = ds ? (ds.description || '') : '';
            }
            if (pill) {
                pill.innerHTML = ds
                ? `<i class="fa-solid fa-database"></i> ${escapeHtml(ds.title)}`
                : `<i class="fa-solid fa-database"></i> No dataset selected`;
                pill.title = ds ? ds.title : 'No dataset selected';
            }
           
            if (!ds) {
              document.getElementById('wizard-title').textContent = 'Select a dataset';
              document.getElementById('wizard-subtitle').textContent = 'Choose a dataset in Explorer to start the wizard';
              document.getElementById('wizard-section-pill').textContent = '—';
              document.getElementById('wizard-progress').textContent = `0 / ${wizardSteps.length}`;
              document.getElementById('wizard-steps').innerHTML = `
                <div class="muted" style="line-height:1.5;">
                  Go to <strong>Explorer</strong>, select a dataset, then return here.
                </div>
                <div style="margin-top:12px;">
                  <button class="btn" onclick="ui.navigate('explorer')"><i class="fa-solid fa-compass"></i> Open Explorer</button>
                </div>
              `;
              document.getElementById('wizard-content').innerHTML = `
                <div class="kv">
                  <span class="k">Waiting for selection</span>
                  <span class="v" style="font-family:var(--font-sans); color:var(--text-muted);">
                    The wizard will attach answers to the selected dataset and update the Review score.
                  </span>
                </div>
              `;
              document.getElementById('wizard-checks').innerHTML = `
                <div class="muted" style="font-size:0.9rem; line-height:1.4;">
                  Select a dataset and start step-by-step. This panel updates with “done / missing” signals.
                </div>
              `;
              return;
            }
  
            if (state.wizard.datasetId !== ds.id) {
              state.wizard.datasetId = ds.id;
              state.wizard.stepIndex = 0;
              state.wizard.answers = {};
            }
  
            ui.renderWizardStepsList(ds);
            ui.renderWizardStepContent(ds);
            ui.renderWizardChecks(ds);
  
            const backBtn = document.querySelector('#page-wizard .ws-search .btn');
            const nextBtn = document.querySelector('#page-wizard .ws-search .btn.primary');
            if (backBtn) backBtn.disabled = state.wizard.stepIndex === 0;
            if (nextBtn) nextBtn.disabled = state.wizard.stepIndex >= wizardSteps.length - 1;
          },
  
          renderWizardStepsList(ds) {
            const stepsEl = document.getElementById('wizard-steps');
            const progressEl = document.getElementById('wizard-progress');
  
            const doneCount = wizardSteps.filter(s => ui.isStepDone(ds, s)).length;
            progressEl.textContent = `${doneCount} / ${wizardSteps.length}`;
  
            stepsEl.innerHTML = wizardSteps.map((s, idx) => {
              const active = idx === state.wizard.stepIndex;
              const done = ui.isStepDone(ds, s);
  
              return `
                <button class="wizard-step-btn ${active ? 'active' : ''}" onclick="ui.gotoStep(${idx})">
                  <div style="min-width:0;">
                    <div style="font-weight:900; color:${active ? 'var(--accent)' : 'var(--text)'};">
                      ${idx + 1}. ${escapeHtml(s.title)}
                    </div>
                    <small>${escapeHtml(s.section)} • ${escapeHtml(s.subtitle)}</small>
                  </div>
                  <span class="wizard-step-badge ${done ? 'done' : ''}">${done ? 'Done' : 'Todo'}</span>
                </button>
              `;
            }).join('');
          },
  
          renderWizardStepContent(ds) {
            const step = wizardSteps[state.wizard.stepIndex];
            const titleEl = document.getElementById('wizard-title');
            const subEl = document.getElementById('wizard-subtitle');
            const sectionPill = document.getElementById('wizard-section-pill');
            const contentEl = document.getElementById('wizard-content');
  
            titleEl.textContent = `${step.title}`;
            subEl.textContent = `${ds.title} • Step ${state.wizard.stepIndex + 1} of ${wizardSteps.length}`;
            sectionPill.textContent = step.section;
  
            const formHtml = step.fields.map(f => ui.renderWizardField(ds, step, f)).join('');
  
            const isLast = step.id === 'publish';
            const footer = isLast
              ? `
                <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
                  <button class="btn primary" onclick="ui.applyWizardToDatasetFromAnswers()">
                    <i class="fa-solid fa-check"></i> Apply to Dataset
                  </button>
                  <button class="btn" onclick="ui.navigate('review')">
                    <i class="fa-solid fa-chart-simple"></i> Go to Review
                  </button>
                </div>
              `
              : `
                <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
                  <button class="btn" onclick="ui.prevStep()"><i class="fa-solid fa-arrow-left"></i> Back</button>
                  <button class="btn primary" onclick="ui.nextStep()">Next <i class="fa-solid fa-arrow-right"></i></button>
                </div>
              `;
  
            const tip = state.wizard.tipHidden
              ? `
                  <div class="tip-bottom" style="margin-top:auto;">
                  <button class="btn ghost" onclick="ui.toggleWizardTip()">
                      <i class="fa-solid fa-eye"></i> Show tip
                  </button>
                  </div>
              `
              : `
                  <div class="callout tip-bottom">
                  <div class="hd">
                      <div class="left">
                      <i class="fa-solid fa-circle-info"></i> Tip
                      </div>
                      <button class="callout-close" type="button" onclick="ui.toggleWizardTip()">
                      Hide
                      </button>
                  </div>
                  <div style="line-height:1.4;">
                      Fill what you know now. You can return later—progress is tracked per step for this session.
                  </div>
                  </div>
              `;
  
            contentEl.innerHTML = `
              <div style="margin-top:14px;">
                  ${step.fields.length > 2 ? `<div class="wiz-grid">${formHtml}</div>` : formHtml}
              </div>
  
              ${footer}
  
              ${tip}
            `;
      
  
          },
  
          renderWizardField(ds, step, field) {
            const current = ui.getWizardValue(ds, step.id, field.key);
            const id = `wiz_${step.id}_${field.key}`;
            const req = field.required ? `<span style="color:var(--warning); font-weight:900;"> *</span>` : '';
            const hint = field.hint ? `<div class="muted" style="font-size:0.85rem; margin-top:6px;">${escapeHtml(field.hint)}</div>` : '';
            const onInput = `ui.setWizardAnswer('${step.id}','${field.key}', this.value)`;
  
            let inputHtml = '';
            if (field.type === 'textarea') {
              inputHtml = `<textarea id="${id}" rows="4" oninput="${onInput}">${escapeHtml(current || '')}</textarea>`;
            } else if (field.type === 'select') {
              const opts = (field.options || []).map(o =>
                `<option value="${escapeHtml(o)}" ${String(current) === String(o) ? 'selected' : ''}>${escapeHtml(o)}</option>`
              ).join('');
              inputHtml = `<select id="${id}" onchange="${onInput}">${opts}</select>`;
            } else {
              const type = field.type === 'date' ? 'date' : 'text';
              inputHtml = `<input id="${id}" type="${type}" value="${escapeHtml(current || '')}" oninput="${onInput}" />`;
            }
  
            return `
              <div class="field">
                <label for="${id}">${escapeHtml(field.label)}${req}</label>
                ${inputHtml}
                ${hint}
              </div>
            `;
          },
  
          setWizardAnswer(stepId, key, value) {
            state.wizard.answers[stepId] = state.wizard.answers[stepId] || {};
            state.wizard.answers[stepId][key] = value;
  
            const ds = state.datasets.find(d => d.id === state.selectedDatasetId);
            if (!ds) return;
  
            ui.renderWizardChecks(ds);
            ui.renderWizardStepsList(ds);
          },
  
          getWizardValue(ds, stepId, key) {
            const a = state.wizard.answers?.[stepId]?.[key];
            if (a != null && String(a).trim() !== '') return a;
  
            // dataset fallbacks
            if (key === 'title') return ds.title;
            if (key === 'abstract') return ds.description;
            if (key === 'license') return ds.license;
            if (key === 'access_url') return ds.access;
            if (key === 'keywords') return (ds.topics || []).join(', ');
            if (key === 'time_start') return ds.temporal?.start || '';
            if (key === 'time_end') return ds.temporal?.end || '';
            if (key === 'processing_level') return ds.provenance?.processing_level || '';
            if (key === 'qc_protocol') return ds.provenance?.qc?.protocol || '';
            return '';
          },
  
          isStepDone(ds, step) {
            return (step.fields || []).every(f => {
              if (!f.required) return true;
              const v = ui.getWizardValue(ds, step.id, f.key);
              return String(v || '').trim().length > 0;
            });
          },
  
          renderWizardChecks(ds) {
            const el = document.getElementById('wizard-checks');
            if (!el || !ds) return;
  
          const must = [
            { label:'Title present', ok: !!ui.getWizardValue(ds,'summary','title') },
            { label:'Description is detailed', ok: (ui.getWizardValue(ds,'summary','abstract') || '').length > 40 },
            { label:'Keywords provided', ok: (ui.getWizardValue(ds,'summary','keywords') || '').split(',').map(s=>s.trim()).filter(Boolean).length > 0 },
  
            { label:'PID / DOI declared', ok: !!ui.getWizardValue(ds,'find','pid') },
            { label:'Version declared', ok: !!ui.getWizardValue(ds,'find','version') },
            { label:'Contact name + email', ok: !!ui.getWizardValue(ds,'find','contact_name') && !!ui.getWizardValue(ds,'find','contact_email') },
  
            { label:'Access URL present', ok: !!ui.getWizardValue(ds,'access','access_url') },
            { label:'License selected', ok: !!ui.getWizardValue(ds,'reuse','license') },
  
            { label:'Vocabularies named', ok: !!ui.getWizardValue(ds,'interop','vocab') },
            { label:'QC/provenance basics', ok: !!ui.getWizardValue(ds,'reuse','processing_level') && !!ui.getWizardValue(ds,'reuse','qc_protocol') }
          ];
            const okCount = must.filter(m => m.ok).length;
            const score = Math.round((okCount / must.length) * 100);
            const ringColor = score >= 85 ? 'var(--success)' : (score >= 60 ? 'var(--warning)' : 'var(--danger)');
  
            el.innerHTML = `
              <div class="kv" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                <div>
                  <div style="color:var(--text-muted); font-weight:900; text-transform:uppercase; letter-spacing:0.6px; font-size:0.75rem;">
                    FAIRness level
                  </div>
                  <div style="margin-top:6px; font-weight:900;">${okCount} / ${must.length} checks</div>
                </div>
                <div style="
                  width: 64px; height: 64px; border-radius: 50%;
                  border: 6px solid ${ringColor};
                  display:flex; align-items:center; justify-content:center;
                  font-weight: 900; font-size: 1.05rem; color: var(--text);
                  background: rgba(0,0,0,0.10);
                ">${score}%</div>
              </div>
  
              <div class="kv" style="margin-top:10px;">
                ${must.map(m => `
                  <div class="kv-row">
                    <span>${escapeHtml(m.label)}</span>
                    <span style="font-family:var(--font-sans); font-weight:900; color:${m.ok ? 'var(--success)' : 'var(--text-faint)'};">
                      ${m.ok ? 'OK' : 'MISSING'}
                    </span>
                  </div>
                `).join('')}
              </div>
  
            `;
          },
  
      applyWizardToDatasetFromAnswers() {
      const id = state.selectedDatasetId;
      if (!id) return;
  
      const idx = state.datasets.findIndex(d => d.id === id);
      if (idx < 0) return;
  
      const ds = state.datasets[idx];
      const val = (stepId, key) => ui.getWizardValue(ds, stepId, key);
  
      const topics = (val('summary', 'keywords') || '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
  
      state.datasets[idx] = {
          ...ds,
          title: (val('summary','title') || ds.title).trim(),
          description: (val('summary','abstract') || ds.description).trim(),
          license: val('reuse','license') || ds.license,
          access: (val('access','access_url') || ds.access).trim(),
          topics: topics.length ? topics : ds.topics,
          temporal: {
          ...(ds.temporal || {}),
          start: (val('summary','time_start') || ds.temporal?.start || '').trim(),
          end: (val('summary','time_end') || ds.temporal?.end || '').trim()
          },
          provenance: {
              ...(ds.provenance || {}),
              processing_level: (val('reuse','processing_level') || ds.provenance?.processing_level || '').trim(),
              qc: {
                  ...(ds.provenance?.qc || {}),
                  protocol: (val('reuse','qc_protocol') || ds.provenance?.qc?.protocol || '').trim(),
                  summary: (val('reuse','provenance_notes') || ds.provenance?.qc?.summary || '').trim()
              }
          }
      };
  
      ui.renderDatasetList();
      ui.renderInspector();
      ui.renderReview();
      ui.renderGraph();
      ui.navigate('review');
      },
  };
  
        window.ui = ui;
  
        /* =========
           SVG helpers
           ========= */
        function drawLine(svg, x1, y1, x2, y2) {
          const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          el.setAttribute('x1', x1); el.setAttribute('y1', y1);
          el.setAttribute('x2', x2); el.setAttribute('y2', y2);
          el.setAttribute('class', 'link-line');
          svg.appendChild(el);
        }

        function drawEdgeLabel(svg, x, y, text) {
          const label = String(text || '').replace(/_/g, ' ');
          const padding = 6;
          const width = Math.max(32, label.length * 6 + padding * 2);
          const height = 18;
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', x - width / 2);
          rect.setAttribute('y', y - height / 2);
          rect.setAttribute('width', width);
          rect.setAttribute('height', height);
          rect.setAttribute('rx', 6);
          rect.setAttribute('class', 'edge-label-bg');
          svg.appendChild(rect);

          const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          el.setAttribute('x', x);
          el.setAttribute('y', y + 4);
          el.setAttribute('class', 'edge-label');
          el.textContent = label;
          svg.appendChild(el);
        }

        function drawNode(svg, cx, cy, r, style, type, onClick) {
          const shape = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          shape.setAttribute('class', 'node-shape');
          shape.dataset.nodeId = type === 'dataset' ? 'dataset' : '';
          let base;

          if (type === 'file') {
            base = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            base.setAttribute('x', cx - r);
            base.setAttribute('y', cy - r);
            base.setAttribute('width', r * 2);
            base.setAttribute('height', r * 2);
            base.setAttribute('rx', 4);
          } else if (type === 'doc') {
            base = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            base.setAttribute('points', `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`);
          } else if (type === 'platform') {
            base = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            base.setAttribute('points', `${cx},${cy - r} ${cx + r},${cy + r} ${cx - r},${cy + r}`);
          } else if (type === 'instrument') {
            base = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            base.setAttribute('points', `${cx - r},${cy} ${cx - r / 2},${cy - r} ${cx + r / 2},${cy - r} ${cx + r},${cy} ${cx + r / 2},${cy + r} ${cx - r / 2},${cy + r}`);
          } else if (type === 'dataset') {
            base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            base.setAttribute('cx', cx);
            base.setAttribute('cy', cy);
            base.setAttribute('r', r);
          } else {
            base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            base.setAttribute('cx', cx);
            base.setAttribute('cy', cy);
            base.setAttribute('r', r);
          }

          base.style.stroke = style.stroke;
          base.style.fill = style.fill;
          base.setAttribute('class', 'node-base');
          shape.appendChild(base);

          const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          icon.setAttribute('x', cx);
          icon.setAttribute('y', cy + 4);
          icon.setAttribute('class', 'node-icon');
          icon.textContent = type === 'dataset'
            ? 'DS'
            : type === 'file'
              ? 'F'
              : type === 'doc'
                ? 'D'
                : type === 'platform'
                  ? 'P'
                  : type === 'instrument'
                    ? 'I'
                    : type === 'service'
                      ? 'S'
                      : 'L';
          shape.appendChild(icon);

          if (onClick) {
            shape.addEventListener('click', (e) => { e.stopPropagation(); onClick(); });
            shape.style.cursor = 'pointer';
          }
          svg.appendChild(shape);
        }

        function drawText(svg, x, y, text, opts = {}) {
          const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          el.setAttribute('x', x); el.setAttribute('y', y);
          el.setAttribute('class', 'node-text');
          el.textContent = text;
          if (opts.opacity != null) el.style.opacity = opts.opacity;
          if (opts.fontSize != null) el.style.fontSize = `${opts.fontSize}px`;
          svg.appendChild(el);
        }
  
        function truncate(s, max) {
          s = (s ?? '').toString();
          return s.length > max ? s.slice(0, max - 1) + '…' : s;
        }

        function renderGraphScene() {
          const svg = graphRenderTarget;
          if (!svg) return;
          svg.innerHTML = '';

          const datasetNode = graphNodes.find((node) => node.type === 'dataset');
          if (!datasetNode) return;

          if (!graphLinks.length) {
            drawNode(svg, datasetNode.x, datasetNode.y, 26, { stroke: 'var(--accent)', fill: 'rgba(59,130,246,0.18)' }, 'dataset', () => ui.setInspectorMode(state.inspectorMode));
            drawText(svg, datasetNode.x, datasetNode.y + 48, 'Dataset');
            drawText(svg, datasetNode.x, datasetNode.y + 76, 'No linked items', { opacity: 0.7, fontSize: 10 });
            return;
          }

          graphLinks.forEach((link) => {
            const targetNode = graphNodes.find((node) => node.id === link.otherId);
            if (!targetNode) return;

            drawLine(svg, datasetNode.x, datasetNode.y, targetNode.x, targetNode.y);
            drawEdgeLabel(svg, (datasetNode.x + targetNode.x) / 2, (datasetNode.y + targetNode.y) / 2, link.type);

            const stroke = typeColor(targetNode.type);
            drawNode(svg, targetNode.x, targetNode.y, 18, { stroke, fill: 'rgba(255,255,255,0.95)' }, targetNode.type, () => ui.flashInspectorForItem(link.item, link.type));
            drawText(svg, targetNode.x, targetNode.y + 34, truncate(targetNode.label, 14), { opacity: 0.9 });
          });

          drawNode(svg, datasetNode.x, datasetNode.y, 26, { stroke: 'var(--accent)', fill: 'rgba(59,130,246,0.18)' }, 'dataset', () => ui.setInspectorMode(state.inspectorMode));
          drawText(svg, datasetNode.x, datasetNode.y + 48, 'Dataset');
        }

        function getNodeAtPosition(x, y) {
          return graphNodes.find((node) => {
            const r = node.type === 'dataset' ? 28 : 20;
            const dx = x - node.x;
            const dy = y - node.y;
            return Math.sqrt(dx * dx + dy * dy) <= r;
          });
        }

        function clamp(value, min, max) {
          return Math.max(min, Math.min(max, value));
        }

        function enableGraphDrag() {
          const svg = graphRenderTarget;
          if (!svg) return;

          let activeNode = null;
          let dragOffset = { x: 0, y: 0 };

          const onDown = (event) => {
            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const node = getNodeAtPosition(x, y);
            if (!node || node.type === 'dataset') {
              return;
            }
            activeNode = node;
            dragOffset = { x: x - node.x, y: y - node.y };
            svg.style.cursor = 'grabbing';
          };

          const onMove = (event) => {
            if (!activeNode) return;
            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left - dragOffset.x;
            const y = event.clientY - rect.top - dragOffset.y;
            activeNode.x = clamp(x, 24, graphDimensions.width - 24);
            activeNode.y = clamp(y, 24, graphDimensions.height - 24);
            renderGraphScene();
          };

          const onUp = () => {
            if (!activeNode) return;
            activeNode = null;
            svg.style.cursor = 'default';
          };

          svg.addEventListener('mousedown', onDown);
          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        }
  
        function typeColor(type) {
          if (type === 'file') return 'rgba(20,184,166,0.9)';
          if (type === 'doc') return 'rgba(245,158,11,0.9)';
          if (type === 'platform') return 'rgba(59,130,246,0.9)';
          if (type === 'instrument') return 'rgba(236,72,153,0.9)';
          if (type === 'service') return 'rgba(139,92,246,0.9)';
          return 'rgba(148,163,184,0.9)';
        }
  
        function typeHint(type) {
          if (type === 'file') return 'Data file or bundle attached to the dataset.';
          if (type === 'doc') return 'Documentation that explains methods/structure.';
          if (type === 'platform') return 'Observation platform/site context.';
          if (type === 'instrument') return 'Sensor/instrument used to measure variables.';
          if (type === 'service') return 'API/service endpoint that serves the dataset.';
          return 'Linked entity.';
        }
  
        /* =========
           Wire up events
           ========= */
                const search = document.getElementById('search');
          search.addEventListener('input', (e) => {
            state.query = e.target.value;
            state.datasetPage = 0;
            ui.renderDatasetList();
          });
  
          ui.renderDatasetList();
          ensureMap();

          const storedId = localStorage.getItem('fj_guidelines_dataset');
          if (storedId && state.datasets.some((ds) => ds.id === storedId)) {
            ui.selectDataset(storedId);
            const target = localStorage.getItem('fj_guidelines_target');
            if (target) {
              ui.navigate(target);
            }
            localStorage.removeItem('fj_guidelines_target');
          }

          ui.renderReview();
          ui.renderGraph();
          enableGraphDrag();
  
          window.addEventListener('resize', () => {
            if (map) map.invalidateSize();
            ui.renderGraph();
          });
        
}

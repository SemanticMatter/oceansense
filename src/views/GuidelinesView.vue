<template>
  <div class="page-guidelines">
    <main class="guidelines-main">
      <section class="hero">
        <div class="hero-content">
          <span class="pill info">Fjordlab Data Nodes</span>
          <h1>Connect your Pilot to Fjordlab Guidelines</h1>
          <p>
            Ingest telemetry, files, and workflows into a Fjordlab Data Node, then enrich your datasets through the
            federated layer with metadata, ontologies, notes, and associations.
          </p>
          <div class="hero-actions">
            <button
              class="btn primary"
              @click="goTo('node')"
            >
              <i class="fa-solid fa-network-wired"></i> Open Node Registry
            </button>
            <button
              class="btn"
              @click="goTo('datadoc')"
            >
              <i class="fa-solid fa-file-alt"></i> Data Documentation
            </button>
            <a
              class="btn ghost"
              href="#ingestion-scenarios"
            >
              <i class="fa-solid fa-list-check"></i> Jump to scenarios
            </a>
          </div>
        </div>
        <div class="hero-panel">
          <div class="hero-panel-card">
            <div class="hero-panel-header">
              <span class="pill">Quick start</span>
              <span class="pill status"><i class="fa-solid fa-signal"></i> Online</span>
            </div>
            <ol>
              <li>Choose an ingestion scenario for your pilot.</li>
              <li>Connect to a Data Node and validate the flow.</li>
              <li>Document and enrich the dataset in the federated layer.</li>
            </ol>
            <div class="hero-panel-actions">
              <button
                class="btn"
                @click="goTo('index')"
              >
                <i class="fa-solid fa-compass"></i> Explore catalog
              </button>
              <button
                class="btn"
                @click="goTo('api_view')"
              >
                <i class="fa-solid fa-code"></i> API reference
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="ingestion-scenarios"
        class="section"
      >
        <div class="section-head">
          <h2>Choose your ingestion scenario</h2>
          <p>Pick the flow that matches your pilot’s data capture pattern and jump into step-by-step guidance.</p>
        </div>

        <div class="card-grid">
          <article
            id="card-telemetry"
            class="scenario-card"
          >
            <div class="scenario-title">
              <h3>Live telemetry</h3>
              <span class="pill info">MQTT / AMQP</span>
            </div>
            <p class="muted">
              For high-frequency streams, sensors, and continuous monitoring.
            </p>
            <div class="card-meta">
              <div>
                <strong>When to use</strong>
                <p class="muted">
                  Real-time signals, operational dashboards, alerting.
                </p>
              </div>
              <div>
                <strong>What you need</strong>
                <p class="muted">
                  Broker URL, topics/queues, auth token or client certs.
                </p>
              </div>
              <div>
                <strong>Steps overview</strong>
                <p class="muted">
                  Configure node → publish payload → validate stream → document dataset.
                </p>
              </div>
            </div>
            <div class="card-actions">
              <a
                class="btn primary"
                href="#scenario-telemetry"
              >View steps</a>
              <button
                class="btn"
                @click="goTo('node')"
              >
                Node Registry
              </button>
              <button
                class="btn ghost"
                @click="goTo('datadoc')"
              >
                Documentation
              </button>
            </div>
          </article>

          <article
            id="card-files"
            class="scenario-card"
          >
            <div class="scenario-title">
              <h3>File uploads</h3>
              <span class="pill">Batch / S3</span>
            </div>
            <p class="muted">
              For periodic files, lab exports, or sensor drops.
            </p>
            <div class="card-meta">
              <div>
                <strong>When to use</strong>
                <p class="muted">
                  Daily/weekly exports, CSV/Parquet bundles, manual uploads.
                </p>
              </div>
              <div>
                <strong>What you need</strong>
                <p class="muted">
                  Upload endpoint, bucket credentials, folder conventions.
                </p>
              </div>
              <div>
                <strong>Steps overview</strong>
                <p class="muted">
                  Create dataset → upload file → validate schema → enrich metadata.
                </p>
              </div>
            </div>
            <div class="card-actions">
              <a
                class="btn primary"
                href="#scenario-files"
              >View steps</a>
              <button
                class="btn"
                @click="goTo('index')"
              >
                Discovery
              </button>
              <button
                class="btn ghost"
                @click="goTo('datadoc')"
              >
                Documentation
              </button>
            </div>
          </article>

          <article
            id="card-workflow"
            class="scenario-card"
          >
            <div class="scenario-title">
              <h3>Workflow-triggered ingestion</h3>
              <span class="pill warn">Webhooks</span>
            </div>
            <p class="muted">
              For pipeline events, scheduled pulls, or ETL flows.
            </p>
            <div class="card-meta">
              <div>
                <strong>When to use</strong>
                <p class="muted">
                  Processing pipelines, event-driven datasets, scheduled pulls.
                </p>
              </div>
              <div>
                <strong>What you need</strong>
                <p class="muted">
                  Webhook URL, scheduler, pipeline outputs.
                </p>
              </div>
              <div>
                <strong>Steps overview</strong>
                <p class="muted">
                  Trigger pipeline → push output → register dataset → document lineage.
                </p>
              </div>
            </div>
            <div class="card-actions">
              <a
                class="btn primary"
                href="#scenario-workflow"
              >View steps</a>
              <button
                class="btn"
                @click="goTo('api_view')"
              >
                API
              </button>
              <button
                class="btn ghost"
                @click="goTo('datadoc')"
              >
                Documentation
              </button>
            </div>
          </article>

          <article
            id="card-edge"
            class="scenario-card"
          >
            <div class="scenario-title">
              <h3>Edge processing</h3>
              <span class="pill status">Optional</span>
            </div>
            <p class="muted">
              For intermittent connectivity and local preprocessing.
            </p>
            <div class="card-meta">
              <div>
                <strong>When to use</strong>
                <p class="muted">
                  Remote deployments, cache-first workflows, offline sensors.
                </p>
              </div>
              <div>
                <strong>What you need</strong>
                <p class="muted">
                  Edge agent, local storage, retry and sync policy.
                </p>
              </div>
              <div>
                <strong>Steps overview</strong>
                <p class="muted">
                  Process at edge → batch forward → verify → document.
                </p>
              </div>
            </div>
            <div class="card-actions">
              <a
                class="btn primary"
                href="#scenario-edge"
              >View steps</a>
              <button
                class="btn"
                @click="goTo('node')"
              >
                Node Registry
              </button>
              <button
                class="btn ghost"
                @click="goTo('datadoc')"
              >
                Documentation
              </button>
            </div>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Step-by-step guides</h2>
          <p>Each scenario includes prerequisites, steps, example payloads, and operational guidance.</p>
        </div>

        <div class="accordion">
          <details
            id="scenario-telemetry"
            open
          >
            <summary>
              <div>
                <h3>Live telemetry</h3>
                <span class="muted">MQTT / AMQP • JSON / Protobuf • topic/queue-based</span>
              </div>
              <span class="pill">Streaming</span>
            </summary>
            <div class="accordion-body">
              <div class="grid-2">
                <div>
                  <h4>Prerequisites</h4>
                  <ul>
                    <li>Node endpoint and broker credentials.</li>
                    <li>Topic or queue naming convention.</li>
                    <li>Auth token or client certificate.</li>
                  </ul>
                </div>
                <div>
                  <h4>Common pitfalls</h4>
                  <ul>
                    <li>Payload timestamps missing timezone info.</li>
                    <li>Topic names not matching registry rules.</li>
                    <li>High-frequency bursts without backpressure.</li>
                  </ul>
                </div>
              </div>

              <div class="steps">
                <div class="step">
                  1. Register your Data Node and verify broker connectivity.
                </div>
                <div class="step">
                  2. Publish a sample message and validate the schema.
                </div>
                <div class="step">
                  3. Monitor ingestion health (latency, dropout, retries).
                </div>
                <div class="step">
                  4. Document dataset metadata and map semantic fields.
                </div>
              </div>

              <div class="snippet">
                <div class="snippet-title">
                  Example payload
                </div>
                <pre>{
  "timestamp": "2025-01-18T14:22:04Z",
  "device_id": "buoy-014",
  "measurements": {
    "temperature": 6.2,
    "salinity": 34.8
  }
}</pre>
              </div>

              <div class="note-row">
                <div>
                  <h4>Security notes</h4>
                  <p class="muted">
                    Use TLS, rotate credentials, and grant least-privilege publish scopes.
                  </p>
                </div>
                <div class="button-row">
                  <button
                    class="btn"
                    @click="goTo('node')"
                  >
                    Open Node Registry
                  </button>
                  <button
                    class="btn ghost"
                    @click="goToDocumentation('wizard')"
                  >
                    Document dataset
                  </button>
                </div>
              </div>
            </div>
          </details>

          <details id="scenario-files">
            <summary>
              <div>
                <h3>File uploads</h3>
                <span class="muted">HTTP upload • S3-compatible • batch drops</span>
              </div>
              <span class="pill">Batch</span>
            </summary>
            <div class="accordion-body">
              <div class="grid-2">
                <div>
                  <h4>Prerequisites</h4>
                  <ul>
                    <li>Upload endpoint or bucket credentials.</li>
                    <li>Folder conventions for date + station.</li>
                    <li>Schema reference (CSV/Parquet/JSON).</li>
                  </ul>
                </div>
                <div>
                  <h4>Common pitfalls</h4>
                  <ul>
                    <li>Missing metadata sidecar files.</li>
                    <li>Inconsistent column names across batches.</li>
                    <li>Large uploads without checksums.</li>
                  </ul>
                </div>
              </div>

              <div class="steps">
                <div class="step">
                  1. Create or pick a dataset container in the catalog.
                </div>
                <div class="step">
                  2. Upload files following the naming convention.
                </div>
                <div class="step">
                  3. Validate schema and completeness.
                </div>
                <div class="step">
                  4. Attach metadata, units, and location coverage.
                </div>
              </div>

              <div class="snippet">
                <div class="snippet-title">
                  Example folder structure
                </div>
                <pre>pilot-oslofjord/
  2025-01-18/
    station-01.csv
    station-01.json
  2025-01-19/
    station-01.csv</pre>
              </div>

              <div class="note-row">
                <div>
                  <h4>Security notes</h4>
                  <p class="muted">
                    Prefer short-lived upload credentials and checksum validation.
                  </p>
                </div>
                <div class="button-row">
                  <button
                    class="btn"
                    @click="goTo('index')"
                  >
                    Open Discovery
                  </button>
                  <button
                    class="btn ghost"
                    @click="goToDocumentation('wizard')"
                  >
                    Document dataset
                  </button>
                </div>
              </div>
            </div>
          </details>

          <details id="scenario-workflow">
            <summary>
              <div>
                <h3>Workflow-triggered ingestion</h3>
                <span class="muted">Webhooks • scheduled pulls • pipeline outputs</span>
              </div>
              <span class="pill warn">Pipeline</span>
            </summary>
            <div class="accordion-body">
              <div class="grid-2">
                <div>
                  <h4>Prerequisites</h4>
                  <ul>
                    <li>Webhook URL or scheduler credentials.</li>
                    <li>Pipeline output format definitions.</li>
                    <li>Lineage metadata for provenance.</li>
                  </ul>
                </div>
                <div>
                  <h4>Common pitfalls</h4>
                  <ul>
                    <li>Missing retry logic for failed runs.</li>
                    <li>Misaligned schedule vs. data availability.</li>
                    <li>Opaque transformations without notes.</li>
                  </ul>
                </div>
              </div>

              <div class="steps">
                <div class="step">
                  1. Register the pipeline output as a dataset.
                </div>
                <div class="step">
                  2. Trigger ingestion upon workflow completion.
                </div>
                <div class="step">
                  3. Attach lineage, processing, and QC notes.
                </div>
                <div class="step">
                  4. Validate dataset associations to the pilot.
                </div>
              </div>

              <div class="snippet">
                <div class="snippet-title">
                  Example webhook payload
                </div>
                <pre>{
  "event": "pipeline.completed",
  "dataset": "pilot-stationm",
  "output_uri": "s3://pilot-output/stationm/2025-01-18.parquet"
}</pre>
              </div>

              <div class="note-row">
                <div>
                  <h4>Security notes</h4>
                  <p class="muted">
                    Protect webhooks with signed payloads and restrict egress IPs.
                  </p>
                </div>
                <div class="button-row">
                  <button
                    class="btn"
                    @click="goTo('api_view')"
                  >
                    API Reference
                  </button>
                  <button
                    class="btn ghost"
                    @click="goToDocumentation('wizard')"
                  >
                    Document dataset
                  </button>
                </div>
              </div>
            </div>
          </details>

          <details id="scenario-edge">
            <summary>
              <div>
                <h3>Edge processing</h3>
                <span class="muted">Local preprocessing • cache-first • intermittent connectivity</span>
              </div>
              <span class="pill status">Edge</span>
            </summary>
            <div class="accordion-body">
              <div class="grid-2">
                <div>
                  <h4>Prerequisites</h4>
                  <ul>
                    <li>Edge agent + local storage.</li>
                    <li>Sync and retry policy.</li>
                    <li>On-device monitoring.</li>
                  </ul>
                </div>
                <div>
                  <h4>Common pitfalls</h4>
                  <ul>
                    <li>Clock drift on isolated devices.</li>
                    <li>Local cache filling without backpressure.</li>
                    <li>Missing integrity checks.</li>
                  </ul>
                </div>
              </div>

              <div class="steps">
                <div class="step">
                  1. Preprocess data at the edge (filter, aggregate).
                </div>
                <div class="step">
                  2. Buffer to local storage with retry logic.
                </div>
                <div class="step">
                  3. Forward to Data Node when online.
                </div>
                <div class="step">
                  4. Document provenance and transformations.
                </div>
              </div>

              <div class="snippet">
                <div class="snippet-title">
                  Example sync policy
                </div>
                <pre>cache.maxSize = "20GB"
retry.backoff = "exponential"
flush.onConnection = true</pre>
              </div>

              <div class="note-row">
                <div>
                  <h4>Security notes</h4>
                  <p class="muted">
                    Encrypt data at rest and rotate edge credentials regularly.
                  </p>
                </div>
                <div class="button-row">
                  <button
                    class="btn"
                    @click="goTo('node')"
                  >
                    Node Registry
                  </button>
                  <button
                    class="btn ghost"
                    @click="goToDocumentation('wizard')"
                  >
                    Document dataset
                  </button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>After ingestion: document and enrich your dataset</h2>
          <p>
            The federated layer documentation flow is already available. Use this checklist to open the right views and
            keep pilot metadata consistent.
          </p>
        </div>

        <div class="doc-panel">
          <div class="doc-selector">
            <div>
              <h3>Pick a dataset</h3>
              <p class="muted">
                Choose a dataset to jump directly into the documentation flow.
              </p>
            </div>
            <div class="selector-controls">
              <select
                v-model="selectedDatasetId"
                class="input"
              >
                <option value="">
                  Select dataset
                </option>
                <option
                  v-for="dataset in datasets"
                  :key="dataset.id"
                  :value="dataset.id"
                >
                  {{ dataset.title }}
                </option>
              </select>
              <button
                class="btn"
                :disabled="!selectedDatasetId"
                @click="goToDocumentation('explorer')"
              >
                Open documentation
              </button>
            </div>
          </div>

          <div
            v-if="selectedDataset"
            class="doc-summary"
          >
            <div>
              <h4>{{ selectedDataset.title }}</h4>
              <p class="muted">
                {{ selectedDataset.description }}
              </p>
            </div>
            <div class="pill-row">
              <span class="pill info">{{ selectedDataset.status }}</span>
              <span class="pill">{{ selectedDataset.license }}</span>
              <span class="pill hz">{{ selectedDataset.temporal.resolution }}</span>
            </div>
          </div>

          <div class="checklist">
            <div class="check-item">
              <div>
                <h4>Discover dataset</h4>
                <p class="muted">
                  Locate your dataset in the catalog or discovery view.
                </p>
              </div>
              <button
                class="btn"
                @click="goTo('index')"
              >
                Discovery
              </button>
            </div>
            <div class="check-item">
              <div>
                <h4>Attach metadata</h4>
                <p class="muted">
                  Add schema, units, sampling rate, location, and device details.
                </p>
              </div>
              <button
                class="btn"
                :disabled="!selectedDatasetId"
                @click="goToDocumentation('wizard')"
              >
                Metadata
              </button>
            </div>
            <div class="check-item">
              <div>
                <h4>Map ontology concepts</h4>
                <p class="muted">
                  Link fields to controlled vocabularies and ontologies.
                </p>
              </div>
              <button
                class="btn"
                :disabled="!selectedDatasetId"
                @click="goToDocumentation('wizard')"
              >
                Ontologies
              </button>
            </div>
            <div class="check-item">
              <div>
                <h4>Add notes & documents</h4>
                <p class="muted">
                  Capture runbooks, quality notes, and related files.
                </p>
              </div>
              <button
                class="btn"
                :disabled="!selectedDatasetId"
                @click="goToDocumentation('wizard')"
              >
                Notes
              </button>
            </div>
            <div class="check-item">
              <div>
                <h4>Associate with pilots</h4>
                <p class="muted">
                  Connect datasets to observatories, pilots, or projects.
                </p>
              </div>
              <button
                class="btn"
                :disabled="!selectedDatasetId"
                @click="goToDocumentation('review')"
              >
                Associations
              </button>
            </div>
            <div class="check-item">
              <div>
                <h4>Versioning & lineage</h4>
                <p class="muted">
                  Record processing levels and provenance notes.
                </p>
              </div>
              <button
                class="btn"
                :disabled="!selectedDatasetId"
                @click="goToDocumentation('review')"
              >
                Lineage
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Pilot templates</h2>
          <p>Quick mappings to align real-world setups with the ingestion scenarios.</p>
        </div>
        <div class="template-grid">
          <article class="template-card">
            <h3>Industrial sensors (PLC + MQTT gateway)</h3>
            <p class="muted">
              Use live telemetry with topic-based streams and edge buffering for resilience.
            </p>
            <div class="pill-row">
              <span class="pill">Telemetry</span>
              <span class="pill">Edge</span>
            </div>
          </article>
          <article class="template-card">
            <h3>Environmental monitoring station (batch uploads)</h3>
            <p class="muted">
              File uploads with daily CSV drops and schema validation.
            </p>
            <div class="pill-row">
              <span class="pill">Batch</span>
              <span class="pill">Metadata</span>
            </div>
          </article>
          <article class="template-card">
            <h3>Research vessel operations (workflow ingestion)</h3>
            <p class="muted">
              Pipeline-triggered ingestion for processing outputs and enriched lineage notes.
            </p>
            <div class="pill-row">
              <span class="pill warn">Pipeline</span>
              <span class="pill">Lineage</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import '../assets/styles/pages/guidelines.css';
import { datasets } from '../assets/data/fjordlab-datasets';

const router = useRouter();
const selectedDatasetId = ref('');

const selectedDataset = computed(() => datasets.find((ds) => ds.id === selectedDatasetId.value));

const goTo = (routeName) => {
  router.push({ name: routeName });
};

const goToDocumentation = (target) => {
  if (selectedDatasetId.value) {
    localStorage.setItem('fj_guidelines_dataset', selectedDatasetId.value);
  }
  if (target) {
    localStorage.setItem('fj_guidelines_target', target);
  }
  router.push({ name: 'datadoc' });
};

onMounted(() => {
  document.body.classList.add('scrollable');
});

onBeforeUnmount(() => {
  document.body.classList.remove('scrollable');
});
</script>

<template>
  <div class="page-api">
    <div class="page">
      <div class="doc-workspace">
        <nav class="sidebar">
          <div class="api-nav-group">
            <div class="api-nav-header">
              Getting Started
            </div>
            <a
              href="#overview"
              class="api-link active"
            >Overview</a>
            <a
              href="#auth"
              class="api-link"
            >Base URL & Auth</a>
            <a
              href="#quickstart"
              class="api-link"
            >Quickstart Examples</a>
          </div>

          <div class="api-nav-group">
            <div class="api-nav-header">
              Data Model
            </div>
            <a
              href="#entities"
              class="api-link"
            >Core Entities</a>
            <a
              href="#query"
              class="api-link"
            >Query Options</a>
            <a
              href="#cud"
              class="api-link"
            >Create / Update / Delete</a>
          </div>

          <div class="api-nav-group">
            <div class="api-nav-header">
              Advanced
            </div>
            <a
              href="#batch"
              class="api-link"
            >Batch Requests</a>
            <a
              href="#encoding"
              class="api-link"
            >Efficient Encodings</a>
            <a
              href="#mqtt"
              class="api-link"
            >MQTT & Real-time</a>
          </div>

          <div class="api-nav-group">
            <div class="api-nav-header">
              Standards
            </div>
            <a
              href="#conformance"
              class="api-link"
            >OGC Conformance</a>
          </div>
        </nav>

        <main class="main-content">
          <section id="overview">
            <h1>Data Access & API</h1>
            <p>
              The OceanSense DATA PORTAL exposes a unified programmatic interface based on the
              <strong>OGC SensorThings API (v1.1)</strong> standard. This open, geospatial-enabled standard allows for
              the interconnection of IoT devices, data, and applications over the Web. Our implementation aggregates
              data from distributed nodes (federation) into a single logical entity model consisting of Things,
              Datastreams, Sensors, and Observations.
            </p>

            <div class="info-box">
              <div class="ib-item">
                <label>Base URL Template</label>
                <span>https://{host}/api/v1/</span>
              </div>
              <div class="ib-item">
                <label>Authentication</label>
                <span>Bearer Token (JWT)</span>
              </div>
              <div class="ib-item">
                <label>Protocols</label>
                <span>HTTP (REST) & MQTT</span>
              </div>
              <div class="ib-item">
                <label>Formats</label>
                <span>JSON, JSON-LD</span>
              </div>
            </div>
          </section>

          <section id="auth">
            <h2>Base URL & Authentication</h2>
            <p>
              All API endpoints are relative to the federation entry point. Replace <code>{host}</code> with your
              specific regional gateway or the central orchestrator.
            </p>
            <div class="code-block">
              https://federation.OceanSense.no/api/v1/
            </div>

            <p>
              Requests must include the <code>Authorization</code> header using a valid API Key or OAuth2 Bearer token.
            </p>
            <div class="code-block">
              <span class="code-comment">// Header Example</span>
              Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
              Accept: application/json
            </div>
          </section>

          <section id="quickstart">
            <h2>Quickstart Examples</h2>

            <h3>1. List Things</h3>
            <div class="code-block">
              <span class="code-method">GET</span> <span class="code-url">/Things</span>
              <span class="code-comment">// 200 OK - Returns list of registered things (vessels, buoys, sites)</span>
            </div>

            <h3>2. Filter Observations by Time</h3>
            <div class="code-block">
              <span class="code-method">GET</span> <span class="code-url">/Observations?$filter=phenomenonTime gt 2025-01-01T00:00:00Z</span>
              <span class="code-comment">// 200 OK - Returns observations after Jan 1st, 2025</span>
            </div>

            <h3>3. Expand Relations</h3>
            <div class="code-block">
              <span class="code-method">GET</span> <span class="code-url">/Datastreams(1)?$expand=Observations</span>
              <span class="code-comment">// 200 OK - Returns Datastream 1 and its nested Observations</span>
            </div>

            <h3>4. Select Specific Fields</h3>
            <div class="code-block">
              <span class="code-method">GET</span> <span class="code-url">/Things?$select=name,description,properties</span>
              <span class="code-comment">// 200 OK - Returns only requested fields to reduce payload size</span>
            </div>

            <h3>5. Pagination</h3>
            <div class="code-block">
              <span class="code-method">GET</span> <span class="code-url">/Observations?$top=50&$skip=100</span>
              <span class="code-comment">// 200 OK - Skips first 100, returns next 50 records</span>
            </div>

            <h3>6. Create Observation</h3>
            <div class="code-block">
              <span class="code-method">POST</span> <span class="code-url">/Observations</span>
              {
              "phenomenonTime": "2025-12-15T10:00:00Z",
              "result": 12.5,
              "Datastream": { "@iot.id": 1 }
              }
              <span class="code-comment">// 201 Created</span>
            </div>
          </section>

          <section id="entities">
            <h2>Core Entities & Endpoints</h2>
            <p>The following table lists the primary collections available in the API.</p>
            <table>
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Collection URL</th>
                  <th>Example Item URL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Thing</td>
                  <td><code>/api/v1/Things</code></td>
                  <td><code>/api/v1/Things(1)</code></td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td><code>/api/v1/Locations</code></td>
                  <td><code>/api/v1/Locations(1)</code></td>
                </tr>
                <tr>
                  <td>Datastream</td>
                  <td><code>/api/v1/Datastreams</code></td>
                  <td><code>/api/v1/Datastreams(10)</code></td>
                </tr>
                <tr>
                  <td>Sensor</td>
                  <td><code>/api/v1/Sensors</code></td>
                  <td><code>/api/v1/Sensors(5)</code></td>
                </tr>
                <tr>
                  <td>ObservedProperty</td>
                  <td><code>/api/v1/ObservedProperties</code></td>
                  <td><code>/api/v1/ObservedProperties(2)</code></td>
                </tr>
                <tr>
                  <td>Observation</td>
                  <td><code>/api/v1/Observations</code></td>
                  <td><code>/api/v1/Observations(999)</code></td>
                </tr>
                <tr>
                  <td>FeatureOfInterest</td>
                  <td><code>/api/v1/FeaturesOfInterest</code></td>
                  <td><code>/api/v1/FeaturesOfInterest(1)</code></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="query">
            <h2>Query Options</h2>
            <p>The API supports powerful system query options to refine results.</p>

            <div class="info-box">
              <div class="ib-item">
                <label>$filter</label><span>Expression to filter results</span>
              </div>
              <div class="ib-item">
                <label>$expand</label><span>Inline related entities</span>
              </div>
              <div class="ib-item">
                <label>$select</label><span>Limit fields returned</span>
              </div>
              <div class="ib-item">
                <label>$orderby</label><span>Sort results</span>
              </div>
              <div class="ib-item">
                <label>$top / $skip</label><span>Pagination control</span>
              </div>
              <div class="ib-item">
                <label>$count</label><span>Return total count</span>
              </div>
            </div>

            <div class="code-block">
              <span class="code-comment">// Complex Query Example</span>
              GET /Datastreams?$filter=name eq 'Wind Speed'&$expand=Observations($top=5;$orderby=phenomenonTime desc)
            </div>
          </section>

          <section id="cud">
            <h2>Create, Update, Delete</h2>
            <p>Standard HTTP methods are used for entity lifecycle management.</p>

            <h3>Create</h3>
            <p>
              Use <code>POST</code> to create new entities. The response will include a <code>Location</code> header to the
              new resource.
            </p>

            <h3>Update</h3>
            <p>
              Use <code>PATCH</code> to partially update an entity (preferred). Use <code>PUT</code> for full replacement.
            </p>
            <div class="code-block">
              <span class="code-method">PATCH</span> <span class="code-url">/Things(1)</span>
              { "description": "Updated description for R/V Gunnerus" }
              <span class="code-comment">// 200 OK</span>
            </div>

            <h3>Delete</h3>
            <div class="code-block">
              <span class="code-method">DELETE</span> <span class="code-url">/Observations(999)</span>
              <span class="code-comment">// 204 No Content</span>
            </div>
          </section>

          <section id="batch">
            <h2>Batch Requests</h2>
            <p>
              Submit multiple requests in a single HTTP call to reduce latency. Send a JSON array of requests to the
              <code>$batch</code> endpoint.
            </p>
            <div class="code-block">
              <span class="code-method">POST</span> <span class="code-url">/api/v1/$batch</span>
              {
              "requests": [
              { "method": "POST", "url": "Observations", "body": { ... } },
              { "method": "GET", "url": "Things(1)" }
              ]
              }
            </div>
          </section>

          <section id="encoding">
            <h2>Efficient Encodings (Data Array)</h2>
            <p>
              For large datasets, use the Data Array format to reduce JSON verbosity by separating keys from values.
            </p>
            <div class="code-block">
              <span class="code-comment">// Response Format</span>
              {
              "Datastream": { "@iot.id": 1 },
              "components": ["phenomenonTime", "result"],
              "dataArray": [
              ["2025-01-01T10:00:00Z", 12.4],
              ["2025-01-01T10:01:00Z", 12.6]
              ]
              }
            </div>
          </section>

          <section id="mqtt">
            <h2>MQTT (Streams / Realtime)</h2>

            <h3>Creating Observations</h3>
            <p>Publish JSON payloads to the following topic structure to ingest data.</p>
            <div class="code-block">
              <span class="code-comment">Topic:</span> api/v1/Datastreams({id})/Observations
              <span class="code-comment">Payload:</span> { "result": 15.5, "phenomenonTime": "..." }
            </div>

            <h3>Receiving Updates</h3>
            <p>Subscribe to receive push updates when new data arrives.</p>
            <div class="code-block">
              <span class="code-comment">Subscribe:</span> api/v1/Datastreams(1)/Observations
            </div>
          </section>

          <section id="conformance">
            <h2>OGC Conformance</h2>
            <p>The following table maps the standard OGC requirements classes to this API implementation.</p>

            <table class="conf-table">
              <thead>
                <tr>
                  <th style="width: 25%;">
                    Requirements class id
                  </th>
                  <th style="width: 45%;">
                    Requirements
                  </th>
                  <th style="width: 30%;">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="conf-id">
                    req/datamodel/thing
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/thing/properties</li>
                      <li>api/v1/datamodel/thing/relations</li>
                    </ul>
                  </td>
                  <td>Thing entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/location
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/location/properties</li>
                      <li>api/v1/datamodel/location/relations</li>
                    </ul>
                  </td>
                  <td>Location entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/historical-location
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/historical-location/properties</li>
                      <li>api/v1/datamodel/historical-location/relations</li>
                    </ul>
                  </td>
                  <td>HistoricalLocation entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/datastream
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/datastream/properties</li>
                      <li>api/v1/datamodel/datastream/relations</li>
                    </ul>
                  </td>
                  <td>Datastream entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/sensor
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/sensor/properties</li>
                      <li>api/v1/datamodel/sensor/relations</li>
                    </ul>
                  </td>
                  <td>Sensor entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/observed-property
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/observed-property/properties</li>
                      <li>api/v1/datamodel/observed-property/relations</li>
                    </ul>
                  </td>
                  <td>ObservedProperty entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/observation
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/observation/properties</li>
                      <li>api/v1/datamodel/observation/relations</li>
                    </ul>
                  </td>
                  <td>Observation entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/feature-of-interest
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/feature-of-interest/properties</li>
                      <li>api/v1/datamodel/feature-of-interest/relations</li>
                    </ul>
                  </td>
                  <td>FeatureOfInterest entity</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/datamodel/entity-control-information
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/datamodel/entity-control-information/common-control-information</li>
                    </ul>
                  </td>
                  <td>Entities’ common control information</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/resource-path
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/resource-path/resource-path-to-entities</li>
                    </ul>
                  </td>
                  <td>Addressing to the entities of the SensorThings API service</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/request-data
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/request-data/order</li>
                      <li>api/v1/request-data/expand</li>
                      <li>api/v1/request-data/select</li>
                      <li>api/v1/request-data/status-code</li>
                      <li>api/v1/request-data/query-status-code</li>
                      <li>api/v1/request-data/orderby</li>
                      <li>api/v1/request-data/top</li>
                      <li>api/v1/request-data/skip</li>
                      <li>api/v1/request-data/count</li>
                      <li>api/v1/request-data/filter</li>
                      <li>api/v1/request-data/built-in-filter-operations</li>
                      <li>api/v1/request-data/built-in-query-functions</li>
                      <li>api/v1/request-data/pagination</li>
                    </ul>
                  </td>
                  <td>Requesting data with system query options</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/create-update-delete
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/create-update-delete/create-entity</li>
                      <li>api/v1/create-update-delete/link-to-existing-entities</li>
                      <li>api/v1/create-update-delete/deep-insert</li>
                      <li>api/v1/create-update-delete/deep-insert-status-code</li>
                      <li>api/v1/create-update-delete/update-entity</li>
                      <li>api/v1/create-update-delete/delete-entity</li>
                      <li>api/v1/create-update-delete/historical-location-auto-creation</li>
                      <li>api/v1/create-update-delete/update-entity-put</li>
                      <li>api/v1/create-update-delete/update-entity-jsonpatch</li>
                    </ul>
                  </td>
                  <td>Creating, updating, and deleting entities</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/batch-request
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/batch-request/batch-request</li>
                    </ul>
                  </td>
                  <td>Processing multiple requests with a single request</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/multi-datastream
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/multi-datastream/properties</li>
                      <li>api/v1/multi-datastream/relations</li>
                      <li>api/v1/multi-datastream/constraints</li>
                    </ul>
                  </td>
                  <td>Handling complex observations with complex results (especially arrays)</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/data-array
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/data-array/data-array</li>
                    </ul>
                  </td>
                  <td>Serving Observations with the efficient data array encoding</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/create-observations-via-mqtt
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/create-observations-via-mqtt/observations-creation</li>
                    </ul>
                  </td>
                  <td>Creating observations through MQTT</td>
                </tr>
                <tr>
                  <td class="conf-id">
                    req/receive-updates-via-mqtt
                  </td>
                  <td>
                    <ul>
                      <li>api/v1/receive-updates-via-mqtt/receive-updates</li>
                    </ul>
                  </td>
                  <td>Receiving updates through MQTT</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import '../assets/styles/pages/api_view.css';

onMounted(() => {
  document.body.classList.add('scrollable');
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelectorAll('.api-link').forEach((link) => link.classList.remove('active'));
      anchor.classList.add('active');

      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

onBeforeUnmount(() => {
  document.body.classList.remove('scrollable');
});
</script>

export const datasets = [
  {
    id: 'ds1',
    title: 'OceanLab Norway Live Imaging and Optics (SilCam + UVP-6)',
    description: 'Real-time plankton and particle observations from the fixed OceanLab observatory in Trondheimfjord. Particle size spectra and abundance indicators are derived by image segmentation/classification from SilCam and UVP-6 streams.',
    organization: 'OceanLab / NTNU',
    license: 'CC-BY-4.0',
    access: 'https://oceanlab.example.no/sensorthings/v1.0/Datastreams/imaging-optics',
    status: 'Live',
    topics: ['oceansense', 'oceanlab', 'imaging', 'optics', 'silcam', 'uvp-6', 'plankton', 'particles'],
    completeness: 0.87,
    spatial: { type: 'point', placeName: 'OceanLab (Trondheimfjord, Norway)', point: { lon: 10.39, lat: 63.44 }, crs: 'EPSG:4326', depth_m: { min: 2, max: 200 } },
    temporal: { start: '2025-01-15', end: '2026-02-18', resolution: '1min' },
    platform: { type: 'fixed_station', name: 'OceanLab Fixed Observatory', identifier: 'OCEANLAB-NO-FIXED-01' },
    sensors: [
      {
        role: 'Imaging',
        make: 'SINTEF Ocean',
        model: 'SilCam',
        parameters: ['particle_size_distribution (um bins)', 'particle_count_per_L', 'abundance_indicator (count_per_L)']
      },
      {
        role: 'Optical plankton profiling',
        make: 'Hydroptic',
        model: 'UVP-6',
        parameters: ['particle_size_spectrum (um bins)', 'zooplankton_object_count_per_L', 'classification_confidence']
      }
    ],
    provenance: {
      processing_level: 'L1',
      qc: { protocol: 'Ocean Best Practices + imaging QA/QC', summary: 'Automated blur/exposure checks and classifier drift monitoring before hourly aggregation.' }
    }
  },
  {
    id: 'ds2',
    title: 'OceanLab Water Column Physics and Biogeochemistry (CTD, DO, PAR, CDOM)',
    description: 'Multimodal water-column observations from OceanLab Norway with harmonized CF variable naming and units. Includes CTD hydrography plus dissolved oxygen, PAR, and CDOM optical proxies.',
    organization: 'OceanLab / NTNU',
    license: 'CC-BY-4.0',
    access: 'https://oceanlab.example.no/data/oceanlab_ctd_do_par_cdom_2024.nc',
    status: 'Published',
    topics: ['oceansense', 'oceanlab', 'ctd', 'dissolved-oxygen', 'par', 'cdom', 'netcdf', 'qartod'],
    completeness: 0.94,
    spatial: { type: 'point', placeName: 'OceanLab (Trondheimfjord, Norway)', point: { lon: 10.39, lat: 63.44 }, crs: 'EPSG:4326', depth_m: { min: 0, max: 250 } },
    temporal: { start: '2024-01-01', end: '2025-12-31', resolution: '10min' },
    platform: { type: 'fixed_station', name: 'OceanLab Fixed Observatory', identifier: 'OCEANLAB-NO-FIXED-01' },
    sensors: [
      {
        role: 'Water column',
        make: 'Sea-Bird',
        model: 'SBE 37-SMP CTD',
        parameters: [
          'sea_water_temperature (degrees_C; standard_name: sea_water_temperature)',
          'practical_salinity (PSU; standard_name: practical_salinity)'
        ]
      },
      {
        role: 'Dissolved oxygen',
        make: 'Aanderaa',
        model: 'Optode 4835',
        parameters: ['dissolved_oxygen (umol/kg; standard_name: mole_concentration_of_dissolved_molecular_oxygen_in_sea_water)']
      },
      {
        role: 'PAR',
        make: 'LI-COR',
        model: 'LI-192',
        parameters: ['photosynthetically_available_radiation (umol photons m-2 s-1)']
      },
      {
        role: 'CDOM',
        make: 'Turner Designs',
        model: 'Cyclops-7',
        parameters: ['cdom_absorption_440nm (1/m; in-situ fluorometric proxy)']
      }
    ],
    provenance: {
      processing_level: 'L2',
      qc: { protocol: 'QARTOD', summary: 'Automated range/spike/gradient tests and delayed manual review for maintenance windows.' }
    }
  },
  {
    id: 'ds3',
    title: 'OceanLab Waves and Currents Dynamics (Wave Sensor + ADCP)',
    description: 'Hydrodynamic time series from the OceanLab fixed observatory, including significant wave height/wave period and ADCP current vectors (u/v) for near-real-time conditions.',
    organization: 'OceanLab / NTNU',
    license: 'CC-BY-4.0',
    access: 'https://oceanlab.example.no/sensorthings/v1.0/Datastreams/waves-currents',
    status: 'Live',
    topics: ['oceansense', 'oceanlab', 'waves', 'currents', 'adcp', 'dynamics'],
    completeness: 0.89,
    spatial: { type: 'point', placeName: 'OceanLab (Trondheimfjord, Norway)', point: { lon: 10.39, lat: 63.44 }, crs: 'EPSG:4326', depth_m: { min: 0, max: 120 } },
    temporal: { start: '2025-05-01', end: '2026-02-18', resolution: '10min' },
    platform: { type: 'fixed_station', name: 'OceanLab Fixed Observatory', identifier: 'OCEANLAB-NO-FIXED-01' },
    sensors: [
      {
        role: 'Wave dynamics',
        make: 'Nortek',
        model: 'AWAC',
        parameters: ['significant_wave_height (m)', 'wave_period (s)']
      },
      {
        role: 'Currents',
        make: 'Teledyne RDI',
        model: 'Workhorse ADCP',
        parameters: [
          'eastward_sea_water_velocity (m/s; standard_name: eastward_sea_water_velocity)',
          'northward_sea_water_velocity (m/s; standard_name: northward_sea_water_velocity)'
        ]
      }
    ],
    provenance: {
      processing_level: 'L1',
      qc: { protocol: 'QARTOD', summary: 'Near-real-time current and wave checks with latency alerts for dropped ensembles.' }
    }
  },
  {
    id: 'ds4',
    title: 'PML-APICS Passive Acoustics Soundscape (Hydrophone Array)',
    description: 'Continuous hydrophone observations at APICS (Plymouth, UK) providing broadband sound pressure level and derived soundscape indices for biodiversity and anthropogenic noise context.',
    organization: 'Plymouth Marine Laboratory (PML)',
    license: 'CC-BY-4.0',
    access: 'https://apics.example.uk/sensorthings/v1.0/Datastreams/passive-acoustics',
    status: 'Live',
    topics: ['oceansense', 'pml', 'apics', 'hydrophone', 'soundscape', 'biodiversity'],
    completeness: 0.83,
    spatial: { type: 'point', placeName: 'PML-APICS (Plymouth, UK)', point: { lon: -4.14, lat: 50.25 }, crs: 'EPSG:4326', depth_m: { min: 5, max: 90 } },
    temporal: { start: '2025-03-01', end: '2026-02-18', resolution: '1min' },
    platform: { type: 'fixed_station', name: 'APICS Observatory Node', identifier: 'PML-APICS-UK-01' },
    sensors: [
      {
        role: 'Passive acoustics',
        make: 'Ocean Sonics',
        model: 'Hydrophone Array',
        parameters: [
          'sound_pressure_level (dB re 1 uPa)',
          'power_spectral_density_bands (dB re 1 uPa^2/Hz)',
          'biophony_anthrophony_indices'
        ]
      }
    ],
    provenance: {
      processing_level: 'L1',
      qc: { protocol: 'Hydrophone QA/QC + Ocean Best Practices', summary: 'Clock drift correction, clipping detection, and PSD quality flags per burst.' }
    }
  },
  {
    id: 'ds5',
    title: 'PML-APICS EK80 Backscatter for Biomass Proxy (38/120 kHz)',
    description: 'Active acoustics time series from EK80 at APICS with calibrated Sv products used as fish/zooplankton biomass proxies across 38 and 120 kHz channels.',
    organization: 'Plymouth Marine Laboratory (PML)',
    license: 'CC-BY-4.0',
    access: 'https://apics.example.uk/data/pml_ek80_backscatter_2025.zarr',
    status: 'Published',
    topics: ['oceansense', 'pml', 'apics', 'ek80', 'active-acoustics', 'sv', 'zarr'],
    completeness: 0.90,
    spatial: { type: 'bbox', placeName: 'Western English Channel (APICS domain)', bbox: [-4.5, 49.9, -3.8, 50.5], crs: 'EPSG:4326', depth_m: { min: 10, max: 120 } },
    temporal: { start: '2025-01-01', end: '2025-12-31', resolution: '5min' },
    platform: { type: 'fixed_station', name: 'APICS Observatory Node', identifier: 'PML-APICS-UK-01' },
    sensors: [
      {
        role: 'Active acoustics',
        make: 'Kongsberg',
        model: 'EK80',
        parameters: [
          'volume_backscattering_strength_Sv_38kHz (dB re 1 m-1)',
          'volume_backscattering_strength_Sv_120kHz (dB re 1 m-1)',
          'biomass_proxy_index'
        ]
      }
    ],
    provenance: {
      processing_level: 'L2',
      qc: { protocol: 'EK80 calibration + QARTOD-inspired acoustic QC', summary: 'Sphere-calibrated Sv, transient noise removal, and beam consistency checks.' }
    }
  },
  {
    id: 'ds6',
    title: 'PML-APICS Cytosub Flow Cytometry (Phytoplankton and Microbial Cells)',
    description: 'Automated Cytosub measurements at APICS reporting cell counts and fluorescence channel proxies for phytoplankton/microbial community dynamics.',
    organization: 'Plymouth Marine Laboratory (PML)',
    license: 'CC-BY-4.0',
    access: 'https://apics.example.uk/sensorthings/v1.0/Datastreams/cytosub',
    status: 'Live',
    topics: ['oceansense', 'pml', 'apics', 'cytosub', 'cytometry', 'phytoplankton', 'microbial'],
    completeness: 0.85,
    spatial: { type: 'point', placeName: 'PML-APICS (Plymouth, UK)', point: { lon: -4.14, lat: 50.25 }, crs: 'EPSG:4326', depth_m: { min: 1, max: 40 } },
    temporal: { start: '2025-04-01', end: '2026-02-18', resolution: '10min' },
    platform: { type: 'fixed_station', name: 'APICS Observatory Node', identifier: 'PML-APICS-UK-01' },
    sensors: [
      {
        role: 'Cytometry',
        make: 'Cytobuoy',
        model: 'Cytosub',
        parameters: [
          'cell_count (cells/mL)',
          'chlorophyll_fluorescence_red_channel (relative_units)',
          'orange_fluorescence_channel (relative_units)',
          'forward_scatter_proxy'
        ]
      }
    ],
    provenance: {
      processing_level: 'L1',
      qc: { protocol: 'Cytosub acquisition QC + bead normalization', summary: 'Pulse-shape filtering, flow-rate checks, and calibration bead tracking for each run.' }
    }
  },
  {
    id: 'ds7',
    title: 'Tara Polar Station Drifting Sentinels (Atmosphere, Sea-Ice, Ocean, Biology)',
    description: 'Long-term polar drift stream integrating atmosphere, sea-ice condition, and ocean CTD/DO data, plus UVP-6 biology indicators. Geometry is represented as a moving track (time-varying point series) summarized by a polar bbox in EPSG:4326.',
    organization: 'Tara Ocean Foundation / Polar Partners',
    license: 'CC-BY-4.0',
    access: 'https://tara-polar.example.org/sensorthings/v1.0/Datastreams/drift-sentinels',
    status: 'Live',
    topics: ['oceansense', 'tara', 'arctic', 'drifting-station', 'sea-ice', 'ctd', 'dissolved-oxygen', 'biodiversity', 'nutrient-dynamics'],
    completeness: 0.80,
    spatial: { type: 'bbox', placeName: 'Arctic Drift Corridor (Tara track envelope)', bbox: [-45, 72, 35, 86], crs: 'EPSG:4326', depth_m: { min: 0, max: 1000 } },
    temporal: { start: '2024-06-01', end: '2026-02-18', resolution: 'hourly' },
    platform: { type: 'drifting_station', name: 'Tara Polar Station', identifier: 'TARA-POLAR-DRIFT-01' },
    sensors: [
      {
        role: 'Atmosphere',
        make: 'Vaisala',
        model: 'WXT536',
        parameters: ['air_temperature (degrees_C)', 'wind_speed (m/s)', 'sea_level_pressure (hPa)']
      },
      {
        role: 'Sea-ice condition',
        make: 'Campbell Scientific',
        model: 'Polar Ice Monitoring Suite',
        parameters: ['sea_ice_fraction (0-1)', 'ice_thickness (m)']
      },
      {
        role: 'Water column',
        make: 'Sea-Bird',
        model: 'SBE 37-SMP CTD',
        parameters: [
          'sea_water_temperature (degrees_C; standard_name: sea_water_temperature)',
          'practical_salinity (PSU; standard_name: practical_salinity)'
        ]
      },
      {
        role: 'Dissolved oxygen',
        make: 'Aanderaa',
        model: 'Optode 4835',
        parameters: ['dissolved_oxygen (umol/kg; standard_name: mole_concentration_of_dissolved_molecular_oxygen_in_sea_water)']
      },
      {
        role: 'Biology imaging',
        make: 'Hydroptic',
        model: 'UVP-6',
        parameters: ['particle_size_distribution (um bins)', 'classified_plankton_objects_per_L', 'nutrient_dynamics_context (nitrate/phosphate from matched bottle samples)']
      }
    ],
    provenance: {
      processing_level: 'L1',
      qc: { protocol: 'QARTOD + Polar observatory SOP (Ocean Best Practices)', summary: 'UTC timestamp normalization, drift-track geolocation checks, and stage-wise QC flags for atmosphere/sea-ice/ocean streams.' }
    }
  },
  {
    id: 'ds8',
    title: 'Tara Polar Biodiversity and Nutrient Dynamics Synthesis (Track-Referenced)',
    description: 'Published synthesis aligning UVP-6 biodiversity products with drifting trajectory segments and bottle-sample nutrient dynamics. The drifting geometry is stored as time-varying points and distributed as track-referenced tables.',
    organization: 'Tara Ocean Foundation / Polar Partners',
    license: 'CC-BY-4.0',
    access: 'https://tara-polar.example.org/data/tara_drifting_track_2024_2026.parquet',
    status: 'Published',
    topics: ['oceansense', 'tara', 'biodiversity', 'nutrient-dynamics', 'drifting-track', 'parquet'],
    completeness: 0.88,
    spatial: { type: 'bbox', placeName: 'Arctic Drift Corridor (Tara track envelope)', bbox: [-45, 72, 40, 86], crs: 'EPSG:4326', depth_m: { min: 0, max: 1000 } },
    temporal: { start: '2024-06-01', end: '2026-01-31', resolution: 'daily' },
    platform: { type: 'drifting_station', name: 'Tara Polar Station', identifier: 'TARA-POLAR-DRIFT-01' },
    sensors: [
      {
        role: 'Biology imaging',
        make: 'Hydroptic',
        model: 'UVP-6',
        parameters: ['taxon_classification_outputs (WoRMS-aligned)', 'particle_size_spectrum (um bins)', 'occurrence_confidence_score']
      },
      {
        role: 'Water column context',
        make: 'Sea-Bird',
        model: 'SBE 37-SMP CTD',
        parameters: ['sea_water_temperature (degrees_C)', 'practical_salinity (PSU)']
      },
      {
        role: 'Nutrient dynamics',
        make: 'Discrete bottle workflow',
        model: 'Shipboard autoanalyzer',
        parameters: ['nitrate (umol/L)', 'phosphate (umol/L)', 'silicate (umol/L)']
      }
    ],
    provenance: {
      processing_level: 'L2',
      qc: { protocol: 'WoRMS/OBIS validation + laboratory nutrient QA', summary: 'Taxonomic harmonization, CF-compliant units, and PROV-O lineage linking raw observations to synthesis tables.' }
    }
  }
];

export const items = [
  { id: 'f1', type: 'file', name: 'oceanlab_imaging_optics_2025_ongoing.parquet' },
  { id: 'f2', type: 'file', name: 'oceanlab_ctd_do_par_cdom_2024.nc' },
  { id: 'f3', type: 'file', name: 'oceanlab_waves_currents_2025_ongoing.zarr' },
  { id: 'f4', type: 'file', name: 'pml_passive_acoustics_soundscape_2025_ongoing.parquet' },
  { id: 'f5', type: 'file', name: 'pml_ek80_backscatter_2025.zarr' },
  { id: 'f6', type: 'file', name: 'pml_cytosub_cells_2025_ongoing.nc' },
  { id: 'f7', type: 'file', name: 'tara_drifting_track_2024_2026.parquet' },
  { id: 'f8', type: 'file', name: 'tara_polar_sentinels_2024_ongoing.nc' },
  { id: 'f9', type: 'file', name: 'tara_biodiversity_nutrients_2024_2026.csv' },
  { id: 'd1', type: 'doc', name: 'oceanlab_imaging_calibration_sheet_2025.pdf' },
  { id: 'd2', type: 'doc', name: 'oceanlab_ctd_qc_report_2024_2025.md' },
  { id: 'd3', type: 'doc', name: 'oceanlab_dynamics_deployment_log_2025.md' },
  { id: 'd4', type: 'doc', name: 'pml_hydrophone_calibration_2025.pdf' },
  { id: 'd5', type: 'doc', name: 'pml_apics_qc_report_2025.md' },
  { id: 'd6', type: 'doc', name: 'pml_ek80_calibration_report_2025.pdf' },
  { id: 'd7', type: 'doc', name: 'tara_drifting_deployment_log_2024_2026.md' },
  { id: 'd8', type: 'doc', name: 'tara_fair_metadata_readme_2026.md' },
  { id: 'pl1', type: 'platform', name: 'OceanLab Fixed Observatory' },
  { id: 'pl2', type: 'platform', name: 'APICS Observatory Node' },
  { id: 'pl3', type: 'platform', name: 'Tara Polar Station (drifting)' },
  { id: 'inst1', type: 'instrument', name: 'SilCam' },
  { id: 'inst2', type: 'instrument', name: 'UVP-6' },
  { id: 'inst3', type: 'instrument', name: 'CTD package (SBE 37)' },
  { id: 'inst4', type: 'instrument', name: 'DO optode' },
  { id: 'inst5', type: 'instrument', name: 'PAR sensor' },
  { id: 'inst6', type: 'instrument', name: 'CDOM fluorometer' },
  { id: 'inst7', type: 'instrument', name: 'Wave sensor' },
  { id: 'inst8', type: 'instrument', name: 'ADCP / current meter' },
  { id: 'inst9', type: 'instrument', name: 'Hydrophone array' },
  { id: 'inst10', type: 'instrument', name: 'EK80 echosounder' },
  { id: 'inst11', type: 'instrument', name: 'Cytosub' },
  { id: 'inst12', type: 'instrument', name: 'Polar met package' },
  { id: 'inst13', type: 'instrument', name: 'Sea-ice condition sensor' },
  { id: 'svc1', type: 'service', name: 'OceanLab SensorThings node' },
  { id: 'svc2', type: 'service', name: 'PML-APICS SensorThings node' },
  { id: 'svc3', type: 'service', name: 'Tara Polar SensorThings node' }
];

export const connections = [
  { source: 'ds1', target: 'f1', type: 'part_of' },
  { source: 'ds1', target: 'pl1', type: 'observed_at' },
  { source: 'ds1', target: 'inst1', type: 'measured_by' },
  { source: 'ds1', target: 'inst2', type: 'measured_by' },
  { source: 'ds1', target: 'd1', type: 'documented_by' },
  { source: 'ds1', target: 'svc1', type: 'served_by' },
  { source: 'ds2', target: 'f2', type: 'part_of' },
  { source: 'ds2', target: 'pl1', type: 'observed_at' },
  { source: 'ds2', target: 'inst3', type: 'measured_by' },
  { source: 'ds2', target: 'inst4', type: 'measured_by' },
  { source: 'ds2', target: 'inst5', type: 'measured_by' },
  { source: 'ds2', target: 'inst6', type: 'measured_by' },
  { source: 'ds2', target: 'd2', type: 'documented_by' },
  { source: 'ds2', target: 'svc1', type: 'served_by' },
  { source: 'ds3', target: 'f3', type: 'part_of' },
  { source: 'ds3', target: 'pl1', type: 'observed_at' },
  { source: 'ds3', target: 'inst7', type: 'measured_by' },
  { source: 'ds3', target: 'inst8', type: 'measured_by' },
  { source: 'ds3', target: 'd3', type: 'documented_by' },
  { source: 'ds3', target: 'svc1', type: 'served_by' },
  { source: 'ds4', target: 'f4', type: 'part_of' },
  { source: 'ds4', target: 'pl2', type: 'observed_at' },
  { source: 'ds4', target: 'inst9', type: 'measured_by' },
  { source: 'ds4', target: 'd4', type: 'documented_by' },
  { source: 'ds4', target: 'd5', type: 'documented_by' },
  { source: 'ds4', target: 'svc2', type: 'served_by' },
  { source: 'ds5', target: 'f5', type: 'part_of' },
  { source: 'ds5', target: 'pl2', type: 'observed_at' },
  { source: 'ds5', target: 'inst10', type: 'measured_by' },
  { source: 'ds5', target: 'd6', type: 'documented_by' },
  { source: 'ds5', target: 'd5', type: 'documented_by' },
  { source: 'ds5', target: 'svc2', type: 'served_by' },
  { source: 'ds6', target: 'f6', type: 'part_of' },
  { source: 'ds6', target: 'pl2', type: 'observed_at' },
  { source: 'ds6', target: 'inst11', type: 'measured_by' },
  { source: 'ds6', target: 'd5', type: 'documented_by' },
  { source: 'ds6', target: 'svc2', type: 'served_by' },
  { source: 'ds7', target: 'f7', type: 'part_of' },
  { source: 'ds7', target: 'f8', type: 'part_of' },
  { source: 'ds7', target: 'pl3', type: 'observed_at' },
  { source: 'ds7', target: 'inst2', type: 'measured_by' },
  { source: 'ds7', target: 'inst3', type: 'measured_by' },
  { source: 'ds7', target: 'inst4', type: 'measured_by' },
  { source: 'ds7', target: 'inst12', type: 'measured_by' },
  { source: 'ds7', target: 'inst13', type: 'measured_by' },
  { source: 'ds7', target: 'd7', type: 'documented_by' },
  { source: 'ds7', target: 'd8', type: 'documented_by' },
  { source: 'ds7', target: 'svc3', type: 'served_by' },
  { source: 'ds8', target: 'f7', type: 'part_of' },
  { source: 'ds8', target: 'f9', type: 'part_of' },
  { source: 'ds8', target: 'f8', type: 'part_of' },
  { source: 'ds8', target: 'pl3', type: 'observed_at' },
  { source: 'ds8', target: 'inst2', type: 'measured_by' },
  { source: 'ds8', target: 'inst3', type: 'measured_by' },
  { source: 'ds8', target: 'd7', type: 'documented_by' },
  { source: 'ds8', target: 'd8', type: 'documented_by' },
  { source: 'ds8', target: 'svc3', type: 'served_by' }
];

export const getUsername = () => localStorage.getItem('username');

export const classes = [
  'Drug',
  'Diagnosis',
  'Finding',
  'Anatomy',
  'Question',
  'LabSet',
  'MedSet',
  'ConvSet',
  'Misc',
  'Symptom',
  'Symptom-Finding',
  'Specimen',
  'Misc-Order',
  'Workflow',
  'State',
  'Program',
  'Aggregate-Measurement',
  'Indicator',
  'Health-Care-Monitoring-Topics',
  'Radiology-Imaging-Procedure',
  'Frequency',
  'Pharmacologic-Drug-Class',
  'Units-of-Measure',
  'Organism',
  'Drug-form',
  'Medical-supply',
  'InteractSet',
  'Test',
  'Procedure',
];

export const DATA_TYPES = [
  'Boolean',
  'Coded',
  'Complex',
  'Document',
  'Date',
  'Time',
  'Datetime',
  'Structured-Numeric',
  'Rule',
  'Numeric',
  'N/A',
  'Text',
];

export const INTERNAL_MAPPING_DEFAULT_SOURCE = 'CIEL';
export const CIEL_SOURCE_URL = '/orgs/CIEL/sources/CIEL/';

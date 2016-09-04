/*
  This is the dolphin shared library. This library permit to make icons or
  clickable items for showing files and folders.
*/

// NOTE: Here a NightDocument is required to make the icons and clickable HTML
//       elements.

'use strict';

/** The registry module
  * @type {object} */
const reg = require('registry');

// If the registry module failed to load...
if(e(reg))
  // Error
  return new NightError('Failed to load the "registry" module');

/** A <NightDocument> instance for work
  * @type {NightDocument} */
const doc = new NightDocument();

/**
  * Get informations about a file type
  * @param {string} filetype
  * @returns {object|void}
  */
$export.getFileType = filetype => reg.read(`files-type/${filetype}`);

/**
  * Get the icon of a file type
  * @param {string} filetype
  * @returns {string|void}
  */
$export.getIcon = filetype => ($export.getFileType(filetype) || {}).icon;

/**
  * Get the description of a file type
  * @param {string} filetype
  * @returns {string|void}
  */
$export.getDescription = filetype => ($export.getFileType(filetype) || {}).descriptor;
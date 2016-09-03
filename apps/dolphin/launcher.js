'use strict';

(function() {
  /** The dolphin's path
    * @type {string} */
  let path = document.currentScript // Get the current <script> element
              .getAttribute('src')  // Get it's source (e.g. /apps/dolphin/launcher.js)
              .split(SEP_REGEXP)    // Split by separators
              .slice(0, -1)         // Remove the last part (the launcher's name)
              .join('/');           // Join by slah (result e.g. /apps/dolphin)

  // Load the launcher's stylesheet
  /** The windows stylesheet
    * @type {string} */
  let stylesheet;

  // Try to read the file
  try { stylesheet = fs.readFileSync(n(path + '/' + 'launcher.css', true), SYSTEM_ENCODING); }
  // If the opening fails...
  catch(e) { error(tr('Failed to load the launcher stylesheet'), e); }

  // Make a DOM element
  /** The windows stylesheet DOM element
    * @type {Element} */
  let style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = stylesheet;
  document.body.insertBefore(style, document.body.firstChild);

  // Make the windows container visible
  wdock.style.display = 'block';

  // Load the translation
  /** The translation package path
    * @type {string} */
  let tr_path = n(path + '/translations/' + language + '.ntp', true);

  // Try to check if the file exists...
  try {
    // If the file exists...
    if(fs.lstatSync(tr_path).isFile()) {
      // Load the translation package
      let err = Night.require('translate', { ticket: { '*': true } }).load(language, tr_path);
      // If an error occured
      if(e(err))
        // Make it fatal
        // This sentence is translated in the system's native translations
        // packages because it permit applications to display a loading error
        // for their own packages.
        error(tr('Failed to load the translation package for "${language}"', {language}), err);
    }
  } catch(e) {}

  /* =====================
   * = Launcher elements =
   * ===================== */

  /** The launcher element
    * @type {ELement} */
  let launcher = document.createElement('div');
  launcher.setAttribute('id', 'launcher');
  document.body.appendChild(launcher);

  /** The task bar
    * @type {ELement} */
  let taskbar = document.createElement('div');
  taskbar.setAttribute('id', 'taskbar');
  document.body.appendChild(taskbar);
})();

import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  VULCANIZE_SOURCES : string[] = [
     `src/static/polymer.html`
  ];

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      {src: `src/static/bower/webcomponentsjs/webcomponents-lite.js`, inject:'libs', vendor: true}
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });

    this.SYSTEM_CONFIG_DEV.paths['@vaadin/angular2-polymer'] = `${this.APP_BASE}node_modules/@vaadin/angular2-polymer`;
    this.SYSTEM_CONFIG_DEV.packageConfigPaths.push(`/node_modules/@vaadin/*/package.json`);
    this.SYSTEM_BUILDER_CONFIG.packages['@vaadin/angular2-polymer'] = {
            main: 'index.js',
            defaultExtension : 'js'
    };

    this.mergeObject(this.PLUGIN_CONFIGS, {
      'gulp-vulcanize' : {
        stripComments: true,
        inlineScripts: true,
        inlineCss: true
      }
    });
  }

}

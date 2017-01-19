function getCode() {
    return "import { BrowserModule } from \'@angular\/platform-browser\';\r\nimport { CommonModule } from \'@angular\/common\';\r\nimport { NgModule } from \'@angular\/core\';\r\nimport { FormsModule } from \'@angular\/forms\';\r\nimport { HttpModule } from \'@angular\/http\';\r\n\r\nimport { COMPONENTS } from \'.\/components\';\r\nimport { DIRECTIVES } from \'.\/directives\';\r\nimport { FILTERS } from \'.\/filters\';\r\nimport { SERVICES } from \'.\/services\';\r\n\r\nimport { AppComponent } from \'.\/app.component\';\r\n\r\n@NgModule({\r\n  declarations: [\r\n    AppComponent,\r\n    ...COMPONENTS,\r\n    ...DIRECTIVES,\r\n    ...FILTERS\r\n  ],\r\n  imports: [\r\n    BrowserModule,\r\n    CommonModule,\r\n    FormsModule,\r\n    HttpModule\r\n  ],\r\n  providers: [\r\n    ...SERVICES\r\n  ],\r\n  bootstrap: [AppComponent]\r\n})\r\nexport class AppModule {}";
}

function getExitCode() {
    return 'Please hold\n\nngOnDestroy() {\n\twindow.location.href = \'http:\/\/ng1.lsharir.com\';\n}\n';
}

function getPreloadBS() {
    return [
        '\n\nConnection established',
        '\n\nRequesting files...',
        '\n\nImporting components...',
        '\n\nInitiating NgZones...',
        '\n\nParsing TypeScript...',
        '\n\nEngaging the flux capacitor...',
        '\n\nReceiving packets...',
        '\n\nEnhancing web experience...',
        '\n\nLoading assets...',
        '\n\nApplication ready to bootstrap!'
    ];
}
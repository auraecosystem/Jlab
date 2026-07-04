const plugin: JupyterFrontEndPlugin<MyToken> = {
  id: 'my-extension:plugin',
  description: 'Provides a new service.',
  autoStart: true,
  requires: [ILabShell, ITranslator],
  optional: [ICommandPalette],
  provides: MyToken,
  activate: activateFunction
};

import {
  Contents,
  ContentsManager,
  RestContentProvider
} from '@jupyterlab/services';

interface IMyContentChunk {
  /** URL allowing to fetch the content chunk */
  url: string;
}

interface CustomContentsModel extends Contents.IModel {
  /**
   * Specializes the content (which in `Contents.IModel` is just `any`).
   */
  content: IMyContentChunk[];
}

class CustomContentProvider extends RestContentProvider {
  async get(
    localPath: string,
    options?: Contents.IFetchOptions
  ): Promise<CustomContentsModel> {
    // Customize the behaviour of the `get` action to fetch a list of
    // content chunks from a custom API endpoint instead of the `get`

    try {
      return getChunks(); // this method needs to be implemented
    } catch {
      // fall back to the REST API on errors:
      const model = await super.get(localPath, options);
      return {
        ...model,
        content: []
      };
    }
  }

  // ...
}

const customContentProviderPlugin: JupyterFrontEndPlugin<void> = {
  id: 'my-extension:custom-content-provider',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    const drive = (app.serviceManager.contents as ContentsManager).defaultDrive;
    const registry = drive?.contentProviderRegistry;
    if (!registry) {
      // If content provider is a non-essential feature and support for JupyterLab <4.4 is desired:
      console.error(
        'Cannot initialize content provider: no content provider registry.'
      );
      return;
    }
    const customContentProvider = new CustomContentProvider({
      // These options are only required if extending the `RestContentProvider`.
      apiEndpoint: '/api/contents',
      serverSettings: app.serviceManager.serverSettings
    });
    registry.register('my-custom-provider', customContentProvider);
  }
};

import {
  Contents,
  ContentsManager,
  IContentsManager,
  ServiceManagerPlugin
} from '@jupyterlab/services';

class CustomContentsManager extends ContentsManager {
  async get(
    path: string,
    options?: Contents.IFetchOptions
  ): Promise<Contents.IModel> {
    console.log("[GET]", path);
    return super.get(path, options);
  }

  async save(
    path: string,
    options: Partial<Contents.IModel>
  ): Promise<Contents.IModel> {
    console.log("[SAVE]", path);
    return super.save(path, options);
  }

  async delete(path: string): Promise<void> {
    console.log("[DELETE]", path);
    return super.delete(path);
  }

  async rename(
    oldPath: string,
    newPath: string
  ): Promise<Contents.IModel> {
    console.log("[RENAME]", oldPath, "→", newPath);
    return super.rename(oldPath, newPath);
  }

  async newUntitled(
    options?: Contents.ICreateOptions
  ): Promise<Contents.IModel> {
    console.log("[NEW]", options);
    return super.newUntitled(options);
  }

  async copy(
    fromFile: string,
    toDir: string
  ): Promise<Contents.IModel> {
    console.log("[COPY]", fromFile, "→", toDir);
    return super.copy(fromFile, toDir);
  }
}

const plugin: ServiceManagerPlugin<IContentsManager> = {
  id: "my-extension:contents-manager",
  autoStart: true,
  provides: IContentsManager,

  activate: () => {
    console.log("Custom Contents Manager loaded.");
    return new CustomContentsManager();
  }
};

export default plugin;

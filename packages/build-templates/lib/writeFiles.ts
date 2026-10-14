import fsPromise from 'node:fs/promises';

import { eslintConfigName } from './constants';

import { getContent } from './getContent';
import { getFolders } from './getFolders';

type WriteFiles = () => Promise<void>;

export const writeFiles: WriteFiles = async () => {
  const allFolders = getFolders();

  await Promise.all(
    allFolders.map(async (folder) => {
      const { path, meta } = folder;
      const { config, language, languagePreference, hasPrettier, strictConfig } = meta;

      if (!config) return;

      const writePath = [path, eslintConfigName].join('/');
      const data = getContent({
        type: config,
        language: language as NonNullable<typeof language>,
        languagePreference: languagePreference as NonNullable<typeof languagePreference>,
        configurations: {
          prettier: !!hasPrettier,
        },
        strictConfig: strictConfig ?? [],
      });

      return fsPromise.writeFile(writePath, data, {
        encoding: 'utf8',
      });
    }),
  );
};

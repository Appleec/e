import pc from 'ansis';
import path from 'node:path';
import prompts from 'prompts';

import {
  configs,
  defaults,
  eslintConfigName,
  formatters,
  languages,
  legacyConfigs,
  runtimes,
  strictConfigs,
} from '@/constants';
import { createESLintConfigFile } from '@/helpers/createEslintConfigFile';
import { getCommands } from '@/helpers/getCommands';
import { getConfigUrl } from '@/helpers/getConfigUrl';
import { getEslintArgs } from '@/helpers/getEslintArgs';
import { installPackages } from '@/helpers/installPackages';
import { exit, handleSigTerm, onCancel, onPromptState } from '@/utils/functions';

process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

const run = async (cliOpts: Record<string, any> = {}) => {
  let args = { ...getEslintArgs(cliOpts) };

  // 1. Config type
  if (args.config === null || args.config === undefined) {
    const { configBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'configBoolean',
        message: 'Config?',
        initial: defaults.config === configs.EXTENDED,
        active: 'Extended',
        inactive: 'Legacy',
        onState: onPromptState,
      },
      { onCancel },
    );

    const config = configBoolean ? configs.EXTENDED : configs.LEGACY;
    args = {
      ...args,
      config,
      ...(config === configs.EXTENDED ? { legacyConfig: null } : { runtime: null }),
    };
  }

  // 2. Language
  if (args.language === null || args.language === undefined) {
    const { languageBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'languageBoolean',
        message: `Are you using ${pc.blue('typescript')}?`,
        initial: defaults.language === languages.TYPESCRIPT,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      { onCancel },
    );

    args = { ...args, language: languageBoolean ? languages.TYPESCRIPT : languages.JAVASCRIPT };
  }

  // 3. Formatter
  if (args.formatter === formatters.NONE) {
    args = { ...args, formatter: null };
  } else if (args.formatter === null || args.formatter === undefined) {
    const { formatterBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'formatterBoolean',
        message: `Are you using ${pc.cyan('prettier')}?`,
        initial: defaults.formatter === formatters.PRETTIER,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      { onCancel },
    );

    args = { ...args, formatter: formatterBoolean ? formatters.PRETTIER : null };
  }

  // 4. Runtime (Extended only)
  if (args.config === configs.EXTENDED) {
    if (!args.runtime) {
      const { runtime } = await prompts(
        {
          type: 'select',
          name: 'runtime',
          message: 'Are you using?',
          choices: [
            {
              title: 'Node',
              description: pc.green('You are using Node or any other frameworks of it'),
              value: runtimes.NODE,
            },
            {
              title: 'React',
              description: pc.cyan('You are using React.js library'),
              value: runtimes.REACT,
            },
            {
              title: 'Next',
              description: pc.blackBright('You are using Next.js framework'),
              value: runtimes.NEXT,
            },
          ],
          onState: onPromptState,
        },
        { onCancel },
      );

      args = { ...args, runtime };
    }

    // 5. Strict configs (Extended only)
    if (args.strictConfig?.includes(strictConfigs.NONE)) {
      args = { ...args, strictConfig: null };
    } else if (!args.strictConfig) {
      const { hasStrictConfig } = await prompts(
        {
          type: 'toggle',
          name: 'hasStrictConfig',
          message: `Do you want to add ${pc.cyan('strict')} configs?`,
          initial: defaults.strictConfig,
          active: 'Yes',
          inactive: 'No',
          onState: onPromptState,
        },
        { onCancel },
      );

      if (hasStrictConfig) {
        const { strictConfig } = await prompts(
          {
            type: 'multiselect',
            name: 'strictConfig',
            message: 'Select Strict Configs:',
            min: 1,
            choices: [
              {
                title: 'Import',
                description: pc.yellow('Strict Import config'),
                value: strictConfigs.IMPORT,
              },
              ...(args.runtime && [runtimes.REACT, runtimes.NEXT].includes(args.runtime)
                ? [{ title: 'React', description: pc.cyan('Strict React config'), value: strictConfigs.REACT }]
                : []),
              ...(args.language === languages.TYPESCRIPT
                ? [{ title: 'TypeScript', description: pc.blue('Strict TypeScript config'), value: strictConfigs.TYPESCRIPT }]
                : []),
            ],
            onState: onPromptState,
          },
          { onCancel },
        );

        args = { ...args, strictConfig };
      } else {
        args = { ...args, strictConfig: null };
      }
    }
  }

  // 6. Legacy config (Legacy only)
  if (args.config === configs.LEGACY) {
    if (!args.legacyConfig) {
      const { legacyConfig } = await prompts(
        {
          type: 'select',
          name: 'legacyConfig',
          message: 'Are you using?',
          choices: [
            {
              title: 'Base Config',
              description: pc.green('@elinzy/eslint-config-extended base'),
              value: legacyConfigs.BASE,
            },
            {
              title: 'React Config',
              description: pc.cyan('@elinzy/eslint-config-extended react'),
              value: legacyConfigs.REACT,
            },
          ],
          onState: onPromptState,
        },
        { onCancel },
      );

      args = { ...args, legacyConfig };
    }

    if (args.legacyConfig === legacyConfigs.REACT) {
      const { reactHooks } = await prompts(
        {
          type: 'toggle',
          name: 'reactHooks',
          message: 'Are you using hooks?',
          initial: defaults.legacyReactHooks,
          active: 'Yes',
          inactive: 'No',
          onState: onPromptState,
        },
        { onCancel },
      );

      args = { ...args, legacyConfig: reactHooks ? legacyConfigs.REACT_HOOKS : args.legacyConfig };
    }
  }

  // 7. Create file
  if (args.createEslintFile === null) {
    const { createEslintFile } = await prompts(
      {
        type: 'toggle',
        name: 'createEslintFile',
        message: `Should I create an ${pc.blue(eslintConfigName)} file for you?`,
        initial: defaults.createEslintFile,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      { onCancel },
    );

    args = { ...args, createEslintFile };
  }

  // 8. Skip install
  if (args.skipInstall === null) {
    const { skipInstall } = await prompts(
      {
        type: 'toggle',
        name: 'skipInstall',
        message: 'Do you want to skip the package installation?',
        initial: defaults.skipInstall,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      { onCancel },
    );

    args = { ...args, skipInstall };
  }

  const configUrl = getConfigUrl({
    config: args.config,
    language: args.language,
    formatter: args.formatter,
    runtime: args.runtime,
    strictConfig: args.strictConfig,
    legacyConfig: args.legacyConfig,
  });

  const commands = getCommands({ formatter: args.formatter });
  const command = commands.join(' ');
  console.log();

  if (args.createEslintFile) {
    const outputPath = path.resolve(process.cwd(), eslintConfigName);
    await createESLintConfigFile({ configPath: configUrl.path, outputPath });
  }

  if (args.skipInstall) {
    console.log(
      `${pc.yellow('No Worries')}, you can install the packages yourself using your ${pc.blue('favourite')} package manager (pnpm, maybe?)`,
    );
    console.log();
    console.log(pc.cyan('Command:'));
    console.log(pc.blue(command));
  } else {
    console.log(pc.blue('Installing packages using pnpm, please wait...'));

    await installPackages({ formatter: args.formatter });
    console.log();
    console.log(pc.yellow('Installation Completed'));
    console.log();
    console.log(pc.cyan('Executed Command:'));
    console.log(pc.blue(command));
  }

  console.log();
  console.log(pc.cyan(args.createEslintFile ? 'Created Config:' : 'Config:'));
  console.log(configUrl.url);

  console.log();
};

export const eslint = async (opts: Record<string, any> = {}) => {
  try {
    await run(opts);
  } catch (error) {
    if (error instanceof Error) {
      exit(error);
    } else {
      console.error(error);
    }
  }
};

export default eslint;
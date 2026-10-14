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
import { installPackages } from '@/helpers/installPackages';
import { exit, handleSigTerm, onCancel, onPromptState } from '@/utils/functions';

interface EslintArgs {
  config: string | null;
  language: string | null;
  formatter: string | null;
  runtime: string | null;
  strictConfig: string[] | null;
  legacyConfig: string | null;
  createEslintFile: boolean | null;
  skipInstall: boolean | null;
}

export const eslint = async () => {
  process.on('SIGINT', handleSigTerm);
  process.on('SIGTERM', handleSigTerm);

  let args: EslintArgs = {
    config: null,
    language: null,
    formatter: null,
    runtime: null,
    strictConfig: null,
    legacyConfig: null,
    createEslintFile: null,
    skipInstall: null,
  };

  // 1. Config type
  if (args.config === null) {
    const { configBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'configBoolean',
        message: 'Config type?',
        initial: defaults.config === configs.EXTENDED,
        active: 'Extended (flat config)',
        inactive: 'Legacy (.eslintrc)',
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
  if (args.language === null) {
    const { languageBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'languageBoolean',
        message: `Are you using ${pc.blue('TypeScript')}?`,
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
  } else if (args.formatter === null) {
    const { formatterBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'formatterBoolean',
        message: `Are you using ${pc.cyan('Prettier')}?`,
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
  if (args.config === configs.EXTENDED && !args.runtime) {
    const { runtime } = await prompts(
      {
        type: 'select',
        name: 'runtime',
        message: 'Which runtime?',
        choices: [
          { title: 'Node.js', description: pc.green('Node.js backend or library'), value: runtimes.NODE },
          { title: 'React', description: pc.cyan('React.js with JSX'), value: runtimes.REACT },
          { title: 'Next.js', description: pc.blackBright('Next.js framework'), value: runtimes.NEXT },
        ],
        onState: onPromptState,
      },
      { onCancel },
    );

    args = { ...args, runtime };
  }

  // 5. Strict configs (Extended only)
  if (args.config === configs.EXTENDED) {
    if (args.strictConfig?.includes(strictConfigs.NONE)) {
      args = { ...args, strictConfig: null };
    } else if (!args.strictConfig) {
      const { hasStrictConfig } = await prompts(
        {
          type: 'toggle',
          name: 'hasStrictConfig',
          message: `Add ${pc.yellow('strict')} configs?`,
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
            message: 'Select strict configs:',
            min: 1,
            choices: [
              { title: 'Import', description: pc.yellow('Strict import rules'), value: strictConfigs.IMPORT },
              ...(args.runtime && [runtimes.REACT, runtimes.NEXT].includes(args.runtime)
                ? [{ title: 'React', description: pc.cyan('Strict React rules'), value: strictConfigs.REACT }]
                : []),
              ...(args.language === languages.TYPESCRIPT
                ? [{ title: 'TypeScript', description: pc.blue('Strict TypeScript rules'), value: strictConfigs.TYPESCRIPT }]
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
  if (args.config === configs.LEGACY && !args.legacyConfig) {
    const { legacyConfig } = await prompts(
      {
        type: 'select',
        name: 'legacyConfig',
        message: 'Which legacy base?',
        choices: [
          { title: 'Base', description: pc.green('@elinzy/eslint-config-extended base'), value: legacyConfigs.BASE },
          { title: 'React', description: pc.cyan('@elinzy/eslint-config-extended react'), value: legacyConfigs.REACT },
        ],
        onState: onPromptState,
      },
      { onCancel },
    );

    args = { ...args, legacyConfig };

    if (args.legacyConfig === legacyConfigs.REACT) {
      const { reactHooks } = await prompts(
        {
          type: 'toggle',
          name: 'reactHooks',
          message: 'Using React Hooks?',
          initial: defaults.legacyReactHooks,
          active: 'Yes',
          inactive: 'No',
          onState: onPromptState,
        },
        { onCancel },
      );

      args = { ...args, legacyConfig: reactHooks ? legacyConfigs.REACT_HOOKS : legacyConfigs.REACT };
    }
  }

  // 7. Create file
  if (args.createEslintFile === null) {
    const { createEslintFile } = await prompts(
      {
        type: 'toggle',
        name: 'createEslintFile',
        message: `Create ${pc.blue(eslintConfigName)} file?`,
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
        message: 'Skip package installation?',
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
    config: args.config!,
    language: args.language!,
    formatter: args.formatter,
    runtime: args.runtime,
    strictConfig: args.strictConfig,
    legacyConfig: args.legacyConfig,
  });

  console.log();
  console.log(pc.cyan('Template:'), configUrl.path);

  if (args.createEslintFile && configUrl) {
    const outputPath = path.resolve(process.cwd(), eslintConfigName);
    await createESLintConfigFile({
      configPath: configUrl.path,
      outputPath,
    });
  }

  if (args.skipInstall) {
    const commands = getCommands({ formatter: args.formatter });
    console.log();
    console.log(pc.yellow('Install manually:'));
    console.log(pc.blue(commands.join(' ')));
  } else {
    console.log();
    console.log(pc.blue('Installing packages...'));
    await installPackages({ formatter: args.formatter });
    console.log(pc.green('Installation complete!'));
  }

  console.log();
};

// Run when executed directly
export default eslint;
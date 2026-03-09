import { describe, it } from 'vitest';

import { exec } from './child_process';

describe('eCore', () => {
    it('should done', async () => {
        // git symbolic-ref --short HEAD
        const result = await exec('ls', [
            '-l',
        ], { dryRun: false, logger: true, abbrev: true, throwOnError: true });

        console.log('=>', result);
    });
});

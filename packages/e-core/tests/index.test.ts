import { describe, it } from 'vitest';

import { exec, execSync } from '../dist';
import * as c from '../dist/color';

describe('eCore', () => {
    it('should done', async () => {
        // git symbolic-ref --short HEAD
        // const result = await exec('ls', [
        //     '-l',
        // ], { dryRun: false, logger: true, abbrev: true, throwOnError: true })
        //
        // console.log('=>', result)

      console.log('=>', c.bgRed('dfsf'));
    })
})

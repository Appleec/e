import { describe, it, expect, beforeEach } from 'vitest'
import { GitError } from '../src'

describe('Errors', () => {
    describe('GitError', () => {
        let error: GitError;
        beforeEach(() => {
            error = new GitError(1, "Operation failed");
        });
        it("should be an instance of error", () => {
            expect(error).toBeInstanceOf(Error);
        });

        it("should include error message and exit code in error", () => {
            // console.log('=>', error.toString())
            expect(error.toString()).toMatch(/(Operation failed).*(1)/);
        });
    })
})

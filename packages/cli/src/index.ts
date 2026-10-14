#!/usr/bin/env node

// import c from 'ansis'
// import prompts from 'prompts'

// Args
import { getArgs } from '@/helpers/getArgs'

// Utils
import { exit } from '@/utils';

const main = async () => {
  console.log('=>');
  let args = getArgs();
}

main()
  .catch((error) => {
    if (error instanceof Error) {
      exit(error);
    } else {
      console.error(error)
    }
  });



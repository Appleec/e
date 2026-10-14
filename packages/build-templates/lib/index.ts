import { createDirectories } from './createDirectories';
import { writeFiles } from './writeFiles';

const run = async () => {
  await createDirectories();
  await writeFiles();
};

try {
  await run();
  console.log('Done');
} catch (error) {
  console.error(error);
}

/**
 * Parse environment variable
 * @param value
 */
function parseEnv(value: any) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(value)) return Number(value);
  return value;
}

export default parseEnv;

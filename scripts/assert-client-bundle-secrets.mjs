import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const clientBundleDirectory = join(process.cwd(), ".next", "static");
const forbidden = [
  "ARANTES_OS_INTEGRATION_KEY",
  "ARANTES_OS_HMAC_SECRET",
  "ARANTES_OS_PUBLIC_LEADS_URL",
];

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? filesUnder(path) : [path];
    }),
  );
  return files.flat();
}

for (const file of await filesUnder(clientBundleDirectory)) {
  const contents = await readFile(file, "utf8");
  const exposed = forbidden.find((value) => contents.includes(value));

  if (exposed) {
    throw new Error(`${exposed} foi incluída no bundle do navegador: ${file}`);
  }
}

console.log("Bundle do navegador sem credenciais da integração.");

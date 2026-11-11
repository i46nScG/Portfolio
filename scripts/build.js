const { watch } = require("node:fs");
const { mkdir, readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");
const { minify } = require("terser");

const sourcePath = path.resolve(__dirname, "../src/index.js");
const outputPath = path.resolve(__dirname, "../public/assets/index.js");
const watchMode = process.argv.includes("--watch");

let buildInProgress = false;
let rebuildRequested = false;
let debounceTimer;

async function build() {
    if (buildInProgress) {
        rebuildRequested = true;
        return;
    }

    buildInProgress = true;
    try {
        const source = await readFile(sourcePath, "utf8");
        const result = await minify(source);
        if (!result.code) {
            throw new Error("Terser did not produce JavaScript output.");
        }

        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, `${result.code}\n`);
        console.log(`Built ${path.relative(process.cwd(), outputPath)}`);
    } catch (error) {
        console.error(error);
        if (!watchMode) {
            process.exitCode = 1;
        }
    } finally {
        buildInProgress = false;
        if (rebuildRequested) {
            rebuildRequested = false;
            void build();
        }
    }
}

void build();

if (watchMode) {
    const watcher = watch(path.dirname(sourcePath), (_eventType, filename) => {
        if (!filename || filename.toString() !== path.basename(sourcePath)) {
            return;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => void build(), 100);
    });
    watcher.on("error", (error) => {
        console.error(error);
        process.exitCode = 1;
    });
    console.log(`Watching ${path.relative(process.cwd(), sourcePath)}`);
}

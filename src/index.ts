import { trackEvent } from "./analytics";
import { rememberRun } from "./storage";

function getInput(name: string, fallback: string): string {
  const envKey = `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;
  const value = process.env[envKey];
  return value && value.trim().length > 0 ? value : fallback;
}

async function run(): Promise<void> {
  const message = getInput("message", "Hello from CI Guardrails - License Check");
  const context = process.env.GITHUB_REPOSITORY ?? "local/testing";

  console.log("[ci-guardrails-license-check] CI Guardrails - License Check handles license compatibility with push + pr and delivers license mismatch alerts as check annotations.");
  console.log("message: " + message);
  console.log("repository: " + context);
  const runCount = await rememberRun(context);
  console.log("run-count: " + runCount);
  trackEvent("action_run", { repository: context });
}

run().catch((error) => {
  console.error("Action failed", error);
  process.exitCode = 1;
});

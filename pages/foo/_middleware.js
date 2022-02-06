import { configure, getConfig } from "aaa-repro-config";
import { getEdgeFlags, getConfig as getEdgeConfig } from "aaa-repro-edge";

// even though getEdgeConfig is just a reexport of getConfig, these
// functions are not strictly equal. but they should be?
//
// this happens because aaa-repro-config gets inlined into the bundle twice
// run "npm run build" and open ".next/server/pages/foo/_middleware.js" to verify
//
// then search for "./node_modules/aaa-repro-config/happykit-flags-config.esm.js"
// and you'll see it twice in there
console.log(getConfig === getEdgeConfig ? "same config" : "different config");

export async function middleware(request) {
  // this sets "config" to true in aaa-repro-config
  configure();

  // this is the "getConfig" from aaa-repro-config
  console.log("config", getConfig());

  // this is the reexport of "getConfig" from aaa-repro-edge
  console.log("edge config", getEdgeConfig());

  // this function uses getConfig internally, but still sees null instead of true
  // it is as if configure() was never called
  // this happens because there seem to be two instances of the aaa-repro-config module
  const flagBag = getEdgeFlags({ request });

  return new Response(JSON.stringify(flagBag), {
    headers: { "content-type": "application/json" },
  });
}

// Exercises the /contact delivery path with fetch mocked. Run: npm run test:contact
import assert from "node:assert/strict";
import { deliverContact } from "../src/lib/contact-delivery.ts";

const submission = { name: "Jordan", email: "jordan@acme.dev", topic: "Business plan", company: "Acme", message: "Hi" };
let calls = [];

function mockFetch(fail) {
  calls = [];
  globalThis.fetch = (async (input, init) => {
    const url = String(input);
    calls.push(`${init?.method ?? "GET"} ${url}`);
    const body = url.endsWith("/contacts/upsert") ? { contact: { id: "c1" } } : { id: "ok" };
    return new Response(JSON.stringify(fail(url) ? { message: "boom" } : body), {
      status: fail(url) ? 500 : 200,
      headers: { "content-type": "application/json" },
    });
  });
}

Object.assign(process.env, { GHL_API_TOKEN: "test", GHL_LOCATION_ID: "loc", RESEND_API_KEY: "re_test" });
console.error = () => {}; // the failure paths log by design

mockFetch(() => false);
assert.equal(await deliverContact(submission), "ghl");
assert.deepEqual(calls, [
  "POST https://services.leadconnectorhq.com/contacts/upsert",
  "POST https://services.leadconnectorhq.com/contacts/c1/notes",
  "DELETE https://services.leadconnectorhq.com/contacts/c1/tags",
  "POST https://services.leadconnectorhq.com/contacts/c1/tags",
]);

mockFetch((url) => url.includes("leadconnectorhq"));
assert.equal(await deliverContact(submission), "email");
assert.ok(calls.some((c) => c.includes("api.resend.com")), "falls back to Resend");

mockFetch(() => true);
assert.equal(await deliverContact(submission), "failed");

delete process.env.GHL_API_TOKEN;
mockFetch(() => false);
assert.equal(await deliverContact(submission), "email");
assert.ok(!calls.some((c) => c.includes("leadconnectorhq")), "skips GHL without config");

process.stdout.write("contact delivery: 4 cases pass\n");

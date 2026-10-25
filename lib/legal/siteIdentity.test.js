import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  publisherName,
  publisherEmail,
  hostingProviderLines,
  tradeName,
  publisherSiren,
  publisherAddress,
  publicationDirector,
} from "./siteIdentity.js";

describe("legal site identity", () => {
  it("names the EI publisher with trade name, SIREN, address and contact email", () => {
    assert.equal(publisherName, "Benjamin De Pourquery EI");
    assert.equal(tradeName, "Glint");
    assert.match(publisherSiren.replace(/ /g, ""), /^\d{9}$/);
    assert.match(publisherAddress, /24200 Sarlat-la-Canéda/);
    assert.equal(publicationDirector, "Benjamin De Pourquery");
    assert.equal(publisherEmail, "glintapps@proton.me");
    assert.match(publisherEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("includes the Vercel hosting address from vercel.com legal pages", () => {
    assert.match(hostingProviderLines.en, /440 N Barranca Avenue #4133/);
    assert.match(hostingProviderLines.en, /Covina, CA 91723/);
    assert.equal(hostingProviderLines.fr.includes("États-Unis"), true);
  });
});

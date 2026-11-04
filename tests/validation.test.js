import test from "node:test";
import assert from "node:assert/strict";
import {
  passwordError,
  safeCallback,
  validateImageFile,
  formatDate,
} from "../src/lib/validation.js";

test("password accepts the assignment's exact six-character minimum", () => {
  assert.equal(passwordError("Abcdef"), "");
  assert.ok(passwordError("Abcde"));
});
test("password requires upper and lowercase letters", () => {
  assert.ok(passwordError("abcdef"));
  assert.ok(passwordError("ABCDEF"));
  assert.equal(passwordError("Read12"), "");
});
test("password rejects excessively long values", () =>
  assert.ok(passwordError("Ab".repeat(65))));
test("callback preserves an internal book and its query", () => {
  assert.equal(
    safeCallback("/books/0123456789abcdef01234567?from=home"),
    "/books/0123456789abcdef01234567?from=home",
  );
});
test("callback blocks external, protocol-relative and backslash destinations", () => {
  for (const value of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/\nevil",
    "javascript:alert(1)",
    null,
  ])
    assert.equal(safeCallback(value), "/");
});
test("callback avoids a login/register redirect loop", () => {
  assert.equal(safeCallback("/login?callbackUrl=/login"), "/");
  assert.equal(safeCallback("/register"), "/");
});
test("cover rejects non-image types and oversized uploads", () => {
  assert.ok(validateImageFile({ type: "image/svg+xml", size: 1 }));
  assert.ok(validateImageFile({ type: "image/jpeg", size: 6 * 1024 * 1024 }));
  assert.equal(validateImageFile({ type: "image/webp", size: 1000 }), "");
});
test("dates use a stable calendar representation", () => {
  assert.equal(formatDate("2026-11-03T12:00:00.000Z"), "3 Nov 2026");
});

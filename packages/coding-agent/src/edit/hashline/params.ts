/**
 * Arktype schema for the `edit` tool's hashline mode payload. The schema is
 * deliberately permissive (allows extra keys) so providers can attach extra
 * keys without rejection; only `input` is required.
 *
 * `input` is declared as a required (non-optional) string so the wire JSON
 * schema exposed to the model marks it `required` without a nullable branch.
 * OpenAI-style strict-mode normalization (`enforceStrictSchema`) leaves
 * required string properties untouched, so the model cannot legally emit
 * `{ "input": null }` — eliminating the null-input retry loop that weaker
 * schema-following models (notably GLM-5.x via OpenRouter) fell into.
 *
 * History: an `_input` provider-emitted alias was previously accepted via a
 * morph (commit 0246904). The Zod→ArkType migration (a050474) accidentally
 * declared `_input?` as a property, which strict-mode normalization promoted
 * to a second required nullable field, confusing models into emitting
 * `input: null`. The alias has been removed because keeping it would require
 * `input` to be optional in the morph's base (the shape `arkToWireSchema` emits
 * via `fallback: ctx => ctx.base`), which re-introduces the nullable branch.
 */
import { type } from "arktype";

export const hashlineEditParamsSchema = type({ input: "string" });

export type HashlineParams = Parameters<typeof hashlineEditParamsSchema.assert>[0];

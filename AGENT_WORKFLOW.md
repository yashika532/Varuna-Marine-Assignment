# AI Agent Workflow Log

## Agents Used
- ChatGPT (GPT-5)
- GitHub Copilot (VS Code inline completions)

## Prompts & Outputs

### Example 1 — Setting up Backend Architecture
**Prompt:**  
> “Create a clean hexagonal architecture backend for FuelEU Maritime using Node.js, TypeScript, and PostgreSQL with routes, compliance, banking, and pooling modules.”

**AI Output (simplified):**  
- Generated folder structure: `src/adapters`, `src/core`, `src/infrastructure`.  
- Sample `server.ts` with Express setup.  
- Connection pool setup using `pg`.  
- Sample `routes.router.ts` and `compliance.router.ts`.

**Refinement:**  
Manually adjusted imports, removed redundant boilerplate, and added `dotenv` configuration.  
Validated TypeScript compatibility and corrected import paths for `pool`.

---

### Example 2 — Fixing Frontend Comparison Page
**Prompt:**  
> “I’m getting an error while fetching baseline and comparison data. Fix the API logic and handle undefined values gracefully.”

**AI Output:**  
Added null-checks and ensured the map function handled missing responses gracefully.

**Refinement:**  
Verified API response in browser `Network` tab, added conditional rendering in `ComparePage.tsx`.

---

## Validation / Corrections
- Tested API endpoints via Postman (`/routes`, `/routes/comparison`, `/compliance/cb`, `/banking/bank`).
- Used console logging for SQL query verification.
- Manually validated frontend React components using Vite dev server.

---

## Observations
- **Saved Time:** Rapid code scaffolding for backend, especially folder setup and repetitive route definitions.
- **AI Failures:** AI initially hallucinated certain Postgres columns (`year`, `cb_gco2eq`), requiring manual migration correction.
- **Effective Use:** Used ChatGPT for logic clarity, Copilot for repetitive typing and small fix suggestions.
- **Biggest Win:** Full-stack connectivity setup (proxy + backend routes) was debugged faster with AI-guided reasoning.

---

## Best Practices Followed
- Kept `.env` secure and added `.gitignore` for sensitive data.
- Verified all AI-generated code with console logs and Postman.
- Maintained strict TypeScript mode and separated adapters from domain logic.
- Used AI incrementally (prompt → verify → test → refine).

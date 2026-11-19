import { defineCliConfig } from 'sanity/cli'
export default defineCliConfig({
  api: { projectId: '3p5mllwc', dataset: 'production' },
  // The Studio is served by the website at /studio (built into dist/studio by `npm run build`).
  project: { basePath: '/studio' },
})

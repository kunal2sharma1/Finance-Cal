const repository = process.env.GITHUB_REPOSITORY
const token = process.env.GITHUB_TOKEN
const statusFile = process.env.STATUS_FILE
const branch = process.env.STATUS_BRANCH || 'ci-status'
const workflow = process.env.WORKFLOW_NAME || 'GitHub Actions workflow'
const jobStatus = process.env.JOB_STATUS || 'unknown'

if (!repository || !token || !statusFile) {
  throw new Error('Missing required CI status environment variables')
}

const ownerRepo = repository
const apiBase = `https://api.github.com/repos/${ownerRepo}/contents/${statusFile}`
const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
}

const status = jobStatus === 'success'
  ? 'passed'
  : jobStatus === 'cancelled'
    ? 'cancelled'
    : 'failed'

const payload = {
  workflow,
  branch: process.env.GITHUB_REF_NAME || null,
  commit: process.env.GITHUB_SHA || null,
  status,
  updated_at: new Date().toISOString(),
  run_id: Number(process.env.GITHUB_RUN_ID || 0),
  run_number: Number(process.env.GITHUB_RUN_NUMBER || 0),
  run_url: `${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${repository}/actions/runs/${process.env.GITHUB_RUN_ID}`,
}

const encoded = Buffer.from(`${JSON.stringify(payload, null, 2)}\n`, 'utf8').toString('base64')

const currentResponse = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, { headers })
let currentSha = null
if (currentResponse.ok) {
  const current = await currentResponse.json()
  currentSha = current.sha || null
} else if (currentResponse.status !== 404) {
  throw new Error(`Unable to read ${statusFile}: ${currentResponse.status} ${await currentResponse.text()}`)
}

const body = {
  message: `chore: update ${statusFile}`,
  content: encoded,
  branch,
}
if (currentSha) body.sha = currentSha

const updateResponse = await fetch(apiBase, {
  method: 'PUT',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

if (!updateResponse.ok) {
  throw new Error(`Unable to publish ${statusFile}: ${updateResponse.status} ${await updateResponse.text()}`)
}

console.log(JSON.stringify(payload))

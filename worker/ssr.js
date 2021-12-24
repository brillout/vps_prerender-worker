import { createPageRenderer } from 'vite-plugin-ssr'
import { prerender } from 'vite-plugin-ssr/cli'
// `importBuild.js` enables us to bundle our worker code into a single file, see https://vite-plugin-ssr.com/cloudflare-workers and https://vite-plugin-ssr.com/importBuild.js
import '../dist/server/importBuild.js'

export { handleSsr }

const renderPage = createPageRenderer({ isProduction: true })

async function handleSsr(url) {

  if(url.endsWith('/prerender')) {
    const pageContextInit = {
      fetch: (...args) => fetch(...args),
    }
    let content = ''
    const onPagePrerender = async (pageContext) => {
      const { filePath, fileContent } = pageContext._prerenderResult
      content += '<div><b>' + filePath + '</b><pre style="color: #aaa">'
      content += escapeHtml(fileContent)
      content += '\n'
      content += (await pageContext._getPageAssets()).map(asset => JSON.stringify(asset)).join('\n')
      content += '</pre></div><br/>'
    }
    await prerender({ pageContextInit, onPagePrerender })
    const body = `<html><body style="font: sans-serif">${content}</body></html>`
    return new Response(body, {
      headers: { 'content-type': 'text/html' },
      status: 200,
    })
  }

  const pageContextInit = {
    url,
    fetch: (...args) => fetch(...args),
  }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext
  if (!httpResponse) {
    return null
  } else {
    const { body, statusCode, contentType } = httpResponse
    return new Response(body, {
      headers: { 'content-type': contentType },
      status: statusCode,
    })
  }
}

function escapeHtml(unsafeString) {
  // Source: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript/6234804#6234804
  const safe = unsafeString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
  return safe
}

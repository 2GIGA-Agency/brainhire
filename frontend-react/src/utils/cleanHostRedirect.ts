export function cleanHostRedirect(targetPath?: string): void {
  const rawHost = window.location.host;

  const match = rawHost.match(/^bh\d+\.(.+)$/);
  if (!match) {
    return;
  }

  const cleanedHost = match[1];

  const protocol = window.location.protocol;
  let newUrl = protocol + '//' + cleanedHost;

  if (typeof targetPath === 'string' && targetPath.trim() !== '') {
    const normalized = targetPath.startsWith('/') ? targetPath : '/' + targetPath;
    newUrl += normalized;
  } else {
    newUrl += window.location.pathname + window.location.search + window.location.hash;
  }

  window.location.replace(newUrl);
}

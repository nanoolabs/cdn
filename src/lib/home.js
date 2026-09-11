export const homePage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NANOO CDN | EDGE ECOSYSTEMS</title>
    <meta name="description" content="NANOO CDN - high performance edge asset delivery on Cloudflare Workers and Backblaze B2">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://cdn.nanoolabs.dev">
    <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
    <meta name="theme-color" content="#fcfcfc" media="(prefers-color-scheme: light)">
    <!-- TODO: og:image pending, create asset before sharing on social -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="NANOO CDN">
    <meta property="og:title" content="NANOO CDN | Edge Delivery Network">
    <meta property="og:description" content="High performance edge asset delivery on Cloudflare Workers and Backblaze B2">
    <meta property="og:url" content="https://cdn.nanoolabs.dev">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="NANOO CDN | Edge Delivery Network">
    <meta name="twitter:description" content="High performance edge asset delivery on Cloudflare Workers and Backblaze B2">
    <link rel="icon" href="/assets/favicon.svg">
    <link rel="stylesheet" href="/assets/nanoo.min.css">
    <link rel="stylesheet" href="/assets/cdn.css">
    <script>
    (function() {
      var t = localStorage.getItem('nlbs-theme');
      if (t) document.documentElement.setAttribute('data-theme', t);
    })();
    </script>
</head>
<body class="home">
    <header>
        <a href="https://nanoolabs.dev" class="nl-link header-brand">NANOO LABS</a>
        <div class="header-actions">
            <button onclick="toggleTheme()" aria-label="Toggle theme" class="theme-toggle">
              <svg class="icon-sun" width="16" height="16"><use href="/assets/icons.svg#icon-sun"/></svg>
              <svg class="icon-moon" width="16" height="16"><use href="/assets/icons.svg#icon-moon"/></svg>
            </button>
        </div>
    </header>

    <main>
        <div class="hero">
            <h1 class="nl-h1">High performance <span class="hero-accent">edge</span> delivery network.</h1>
            <p class="nl-text-mute">Optimize for low-latency asset distribution and secure origin-shielding using Cloudflare Workers and S3-compatible storage.</p>
        </div>

        <div class="specs">
            <div class="spec-item">
                <span class="spec-label">Architecture</span>
                <span class="spec-value">Edge Proxy</span>
            </div>
            <div class="spec-item">
                <span class="spec-label" style="--label-color:var(--accent-violet)">Protocol</span>
                <span class="spec-value">AWS SigV4</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Region</span>
                <span class="spec-value">Global / Multi-zone</span>
            </div>
            <div class="spec-item">
                <span class="spec-label" style="--label-color:var(--accent-violet)">Latency</span>
                <span class="spec-value">&lt; 10ms TTFB</span>
            </div>
        </div>
    </main>

    <footer>
        <span class="nl-text-mute">&copy; 2026 NANOO LABS</span>
        <span class="version-badge">V{{VERSION}}</span>
    </footer>

    <script>
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nlbs-theme', theme);
    }
    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');
    }
    </script>
</body>
</html>
`

export const errorPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 | NOT FOUND</title>
    <link rel="icon" href="/assets/favicon.svg">
    <link rel="stylesheet" href="/assets/nanoo.min.css">
    <link rel="stylesheet" href="/assets/cdn.css">
</head>
<body class="error">
    <div class="container">
        <div class="error-title">ERROR CODE: 404</div>
        <div class="nl-text-mute error-subtitle">RESOURCE NOT FOUND OR RESTRICTED [ ∅_∅ ]</div>
    </div>
</body>
</html>
`

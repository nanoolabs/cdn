# Nanoo CDN Architecture

Edge proxy for private Backblaze B2 bucket via Cloudflare Workers.

## Request flow

```mermaid
graph TD
    A[User Request] --> B[Sanitize Path]
    B --> C{Origin/Referer Allowed?}
    C -- No --> D[Return 403 Forbidden]
    C -- Yes --> E{Method OPTIONS?}

    E -- Yes --> F[Return CORS Preflight]
    E -- No --> G{Root Path /?}

    G -- Yes --> H[Return Home Page]
    G -- No --> I{Method GET/HEAD?}

    I -- No --> J[Return 405 Method Not Allowed]
    I -- Yes --> K{Edge Cache HIT?}

    K -- Yes --> L[Return Cached Response]
    K -- No --> M{List Bucket Request?}

    M -- Yes --> N[Return 404 Not Found]
    M -- No --> O[Sign Request SigV4]

    O --> P[Fetch from B2 Origin]
    P --> Q{Response OK?}

    Q -- Yes --> R[Cache & Return]
    Q -- No --> S[Return 404 Error Page]
```

## Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant W as Worker
    participant E as Edge Cache
    participant B as Backblaze B2

    U->>W: GET /assets/image.png
    W->>W: Validate Origin & Referer
    alt Not Allowed
        W-->>U: 403 Forbidden
    else Allowed
        W->>E: Check Cache
        alt Cache HIT
            E-->>U: Return File
        else Cache MISS
            W->>W: Sign Request (SigV4)
            W->>B: Fetch from Origin
            B-->>W: 200 OK
            W->>E: Store in Cache
            W-->>U: Return File
        end
    end
```

## Project structure

```
src/
├── index.js          # Worker entrypoint, request routing, CORS, caching
└── lib/
    ├── signer.js     # AWS SigV4 signing via aws4fetch
    ├── cache.js      # Cloudflare Cache API wrapper
    ├── utils.js      # Path sanitization, header filtering
    └── home.js       # Inline HTML templates (home + error page)
public/
├── assets/
│   ├── nanoo.min.css   # Design system (@nlbs/css, vendored)
│   ├── cdn.css          # Page-specific layout + font-face
│   ├── icons.svg        # SVG sprite (sun/moon theme icons)
│   └── fonts/           # Geist Mono woff2
```

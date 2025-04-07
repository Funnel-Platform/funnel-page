Chat GPT chat: https://chatgpt.com/share/671286e6-23d8-8001-9240-58657b676ea9

Lambda@Edge function for `__DOMAIN__` replacements using CloudFront with S3: `Lambda@Edge.js` file

## Requirements
- Must be SEO friendly (eg, domain or site name to physically appear in generated source code)
- Could be hosted with Amazon S3 static site, or Cloudflare pages, or Render.com? Open to ideas 
- Should be able to terraform to other hosting providers as easy as possible
- Should have easy way to determine which domains exist on which hosting provider
- Must be able to handle multiple domains
- Do not want multiple S3 buckets for each domain
- Do not want multiple `.env` files for each domain
- Do not want multiple Github Action files for each domain
- Should be able to host another domain with minimal changes (eg, add site name, logo, favicon, done)
- Want the ability to spin up another domain easy (less DevOps time, less steps, easy as possible)

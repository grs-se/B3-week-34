# Angular Deployment & Optimization Challenge

## Goal

Learn how to build an optimized production Angular app, deploy it to Netlify (a free hosting platform), and apply performance best practices.

## What You'll Do

- Create a production build of your Angular app with optimizations.

- Deploy your app to Netlify Hosting.

- Learn Angular performance optimization tips.

- Analyze your bundle size using source map explorer.

## Step-by-Step Instructions

### 1. Build Your Angular App for Production

Run this command in your Angular project folder:

```bash
Copy
Edit
ng build --configuration production
```

#### What happens

- AOT compilation: Compiles your templates ahead-of-time to speed up rendering.

- Minification: Reduces JS file size by removing whitespace, shortening variable names, etc.

- Tree-shaking: Removes unused code from your bundle.

- Lazy loading: Automatically loads feature modules only when needed.

Your optimized files will be output to:

```bash
/dist/your-project-name/
```

### 2. Deploy to Netlify Hosting

Step 1: Create a free account

- Go to Netlify and sign up for a free account.

Step 2: Deploy your site

- You can deploy by dragging and dropping your /dist/your-project-name folder to Netlify's web UI.

OR

Use the Netlify CLI:

``` bash
npm install -g netlify-cli
```

Login with your account:

```bash
netlify login
```

Deploy your app:

```bash
netlify deploy --dir=dist/your-project-name
```

Follow prompts for a draft deploy.

When ready, publish your deploy with:

```bash
netlify deploy --prod --dir=dist/your-project-name
```

Visit the URL provided by Netlify to see your live app!

### 3. Explore Other Hosting Options (Optional)

- GitHub Pages: Free hosting for static sites, ideal for demos.

- AWS S3 + CloudFront: Scalable, CDN-powered hosting for production apps.

### 4. Performance Optimization Tips

- Lazy loading: Split your app into modules loaded on demand.

- OnPush change detection: Use ChangeDetectionStrategy.OnPush in components for faster rendering.

- Optimize images: Compress and serve responsive images.

- Minimize dependencies: Only install what you need; avoid heavy libraries.

Analyze your bundle size:

Generate stats JSON file:

```bash
ng build --stats-json
Use source map explorer to analyze:
```

```bash
npx source-map-explorer dist/your-project-name/main.*.js
```

Visualize which files or packages consume most space.

Identify optimization opportunities.

### What This Teaches

- How to create an optimized production Angular build.

- Steps to deploy your Angular app to Netlify free hosting.

- Practical performance optimization strategies.

- How to analyze and reduce bundle sizes for better app speed.

### Summary

- Always build for production before deployment.

- Netlify offers easy, free hosting with drag-and-drop or CLI.

- Optimize your app for speed and size.

- Regularly analyze your bundles and dependencies.

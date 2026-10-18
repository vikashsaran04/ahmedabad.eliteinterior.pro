import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        companyProfile: resolve(__dirname, 'company-profile.html'),
        founders: resolve(__dirname, 'founders.html'),
        services: resolve(__dirname, 'services.html'),
        projects: resolve(__dirname, 'projects.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
        caseStudySample: resolve(__dirname, 'case-studies/sample-3bhk-interior-ahmedabad.html'),
        testimonials: resolve(__dirname, 'testimonials.html'),
        ahmedabadExpertise: resolve(__dirname, 'ahmedabad-interior-expertise.html'),
        costGuide: resolve(__dirname, 'interior-cost-guide.html'),
        interiorGuides: resolve(__dirname, 'interior-guides.html'),
        faq: resolve(__dirname, 'faq.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});

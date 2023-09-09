/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;'
      }
    }
  },
  plugins: [react()]
});

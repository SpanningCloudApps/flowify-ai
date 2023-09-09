/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
})

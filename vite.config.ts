import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import {resolve} from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const serveConfig={
  plugins: [
    vue(), 
    vuejsx({}),
    createSvgIconsPlugin({iconDirs:[resolve(process.cwd(),'public/icons')],symbolId:'icon-[dir]-[name]'})
  ],
  resolve:{
    alias:{
      '@':resolve(__dirname,'src'),
    }
  },
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      ...serveConfig
    }
  } else {
    return {
      ...serveConfig,
      base:'./',
      build:{
        rollupOptions:{
          output:{
            manualChunks:(id)=>{
              if (id.includes('node_modules')) {
                　　      return id.toString().split('node_modules/')[1].split('/')[0].toString();
                　　  }
            },
        　　entryFileNames: 'js/[name].[hash].js',
        　　chunkFileNames: 'js/[name].[hash].js',
        　　assetFileNames: '[ext]/[name].[hash].[ext]',
          }
        }
      }
    }
  }
})

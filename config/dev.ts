import type { UserConfigExport } from "@tarojs/cli";
export default {
  defineConstants: {
    BASE_URL: '"http://106.52.168.94:8800/api/user"',
    WS_URL: '"ws://106.52.168.94:8800/api/user/chat/ws"'
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport<'webpack5'>

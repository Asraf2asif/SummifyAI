import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import postcssImport from "postcss-import";
import postcssUnroot from "postcss-unroot";
import postcssColorRgb from "postcss-color-rgb";
import postcssPseudoelements from "postcss-pseudoelements";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssNested from "postcss-nested";
import postcssNesting from "postcss-nesting";
import postcssSelectorMatches from "postcss-selector-matches";
import postcssCustomProperties from "postcss-custom-properties";
import postcssMediaMinmax from "postcss-media-minmax";
import postcssUtilities from "postcss-utilities";
import postcsscolorRgbaFallback from "postcss-color-rgba-fallback";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

var browserslistStr = "cover 99.5%";

export default defineConfig({
  plugins: [
    legacy({
      targets: [browserslistStr],
    }),
  ],

  css: {
    postcss: {
      plugins: [
        postcssImport(),
        postcssUnroot({ method: "copy" }),
        postcssColorRgb(),
        postcssPseudoelements(),
        postcssFlexbugsFixes(),
        postcssNested(),
        postcssNesting(),
        postcssSelectorMatches(),
        postcssCustomProperties({ preserve: false }),
        postcssMediaMinmax(),
        postcssUtilities({ ie8: true }),
        postcsscolorRgbaFallback({ oldie: true }),
        autoprefixer({ overrideBrowserslist: browserslistStr }),
        cssnano({ preset: "default" }),
      ],
    },
  },
});

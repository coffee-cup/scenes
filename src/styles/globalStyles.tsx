// styles/globalStyles.tsx
import tw, { theme, globalStyles as twinGlobalStyles } from "twin.macro";
import { globalCss } from "../stitches.config";

const customStyles = {
  body: {
    WebkitTapHighlightColor: theme`colors.accent`,
    ...tw`antialiased text-fg bg-bg leading-relaxed font-sans`,
  },
};

export const globalStyles = () => {
  globalCss(customStyles)();
  globalCss(twinGlobalStyles as Record<any, any>)();
};

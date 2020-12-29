import React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";
import { useTheme } from "../../lib/theme";

function BillingImage() {
  const theme = useTheme();
  return (
    <Svg viewBox="0 0 1080 683.5" style={{ width: "100%", height: 250 }}>
      <G id="prefix__Ilustraciones">
        <Circle
          id="prefix__Circulo_4_"
          cx={321.3}
          cy={359.7}
          r={137.2}
          fill={theme.colors.primary}
        />
        <Path
          fill={theme.colors.dark}
          d="M947.6 607.3h-67.7V295.5c0-1.3-1.1-2.4-2.4-2.4h-88.8v-76.5c0-1.3-1.1-2.4-2.4-2.4H548.6V73.8c0-1.3-1.1-2.4-2.4-2.4h-285c-1.3 0-2.4 1.1-2.4 2.4V264c-47.7 16.9-82 62.5-82 116 0 24.6 7.2 48.3 20.9 68.6l61.1 98.4v60.4H132.4c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h815.2c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.5-2.4-2.5zm-505 0V358h288.1v249.4H442.6zm54.8-309.4h233.3v55.3H442.6v-55.3h54.8zM639.5 219v74.1H499.8V219h139.7zm144.3 78.9v55.3h-48.3v-55.3h48.3zM735.5 358h48.3v37.5l10.4-10.5 7.4 10.5 8.1-20.9 7.4 20.9 6.2-8.1 7.5 8.1V358h44.5v249.4H735.5V358zm139.6-4.8h-44.5v-55.3h44.5v55.3zm-91.2-60.1H644.3V219H784v74.1zm-240.1-78.8h-46.4c-1.3 0-2.4 1.1-2.4 2.4v76.5h-29.1v-217h23.9v44.7l7.6-5.1 7.6 5.1 7.9-3.5 7.3 3.5V76.2h23.6v138.1zM263.5 76.2h197.6v217h-21c-1.3 0-2.4 1.1-2.4 2.4v311.8H303.2l6.2-9.9h121.1c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4H312.3l6.2-9.9h112c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4h-109l6.2-9.9h102.9c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4h-99.9l71.4-114.8c0-.1.1-.1.1-.2 13.6-20.2 20.7-43.8 20.7-68.3 0-67.8-55.2-123-123-123-12.6 0-24.8 1.9-36.2 5.4V76.2zm-62 369.6c-13.1-19.5-20-42.3-20-65.9 0-65.2 53-118.3 118.2-118.3s118.2 53.1 118.2 118.3c0 23.6-7 46.4-20.1 65.9-.1.1-.2.2-.2.4L306 593.7l-6.3 10.1-6.3-10.1-18.2-29.3L201.6 446c0-.1 0-.1-.1-.2zm62 108.7l5.8 9.3c-.5.4-.9 1.1-.9 1.8 0 1.3 1.1 2.4 2.4 2.4h1.1l6.2 9.9h-7.3c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4H281l6.2 9.9h-16.4c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h19.4l6.2 9.9h-32.8v-52.8z"
        />
        <Path
          fill={theme.colors.dark}
          d="M683.5 530.6c-.1-.1-.2-.2-.4-.3h-.1c-.1-.1-.2-.1-.3-.2h-.1c-.1 0-.2-.1-.4-.1h-1c-.1 0-.2.1-.3.1h-.1c-.1 0-.2.1-.3.2 0 0-.1 0-.1.1-.1.1-.3.2-.4.3l-8.7 8.7c-.9.9-.9 2.4 0 3.4s2.4.9 3.4 0l4.6-4.6v39.9c0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4V538l4.6 4.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.4 0-3.4l-8.6-8.6zM509 262.1c.4.4 1 .6 1.5.6h.2l99.1-8.5c1.3-.1 2.3-1.3 2.2-2.6l-1.7-19.5c-.1-.6-.4-1.2-.8-1.6-.5-.4-1.1-.6-1.7-.5l-99.1 8.5c-1.3.1-2.3 1.3-2.2 2.6l1.7 19.5c0 .5.3 1.1.8 1.5zm96.8-27.3l1.3 14.8-94.4 8.1-1.3-14.8 94.4-8.1zM573.2 260.7c-.5.4-.8 1-.9 1.6l-.9 9.8c-.1 1.3.8 2.5 2.1 2.6l49.7 4.8h.2c.5 0 1.1-.2 1.5-.5.5-.4.8-1 .9-1.6l.9-9.8c.1-1.3-.8-2.5-2.1-2.6l-49.7-4.8c-.5-.1-1.2.1-1.7.5zm3.7 4.5l44.9 4.3-.5 5-44.9-4.3.5-5zM475.9 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c0 1.3 1.1 2.4 2.4 2.4zM487.3 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c0 1.3 1.1 2.4 2.4 2.4zM498.7 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c0 1.3 1.1 2.4 2.4 2.4zM510.1 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c0 1.3 1.1 2.4 2.4 2.4zM656 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c0 1.3 1.1 2.4 2.4 2.4zM667.4 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c0 1.3 1.1 2.4 2.4 2.4zM678.8 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c0 1.3 1.1 2.4 2.4 2.4zM690.2 335.6c1.3 0 2.4-1.1 2.4-2.4v-18.8c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v18.8c.1 1.3 1.1 2.4 2.4 2.4z"
        />
        <Path
          transform="rotate(-79.018 398.042 226.75)"
          fill={theme.colors.dark}
          d="M378.4 187h39.3v79.6h-39.3z"
        />
        <Path
          fill={theme.colors.dark}
          d="M304.1 196.2h.1l71.4-2.2c2.2-.1 4-1.9 3.9-4.2l-.3-10c-.1-2.2-1.9-3.9-4.1-3.9h-.1l-71.4 2.2c-2.2.1-4 1.9-3.9 4.2l.3 10c.1 2.2 1.9 3.9 4.1 3.9zm70.5-15.6l.3 8.6-70.1 2.2-.3-8.6 70.1-2.2zM555.8 437.2H497c-16.8 0-30.4 13.7-30.4 30.4S480.3 498 497 498h58.9c16.8 0 30.4-13.7 30.4-30.4s-13.7-30.4-30.5-30.4zm0 56.1H497c-14.2 0-25.7-11.5-25.7-25.7s11.5-25.7 25.7-25.7h58.9c14.2 0 25.7 11.5 25.7 25.7s-11.6 25.7-25.8 25.7z"
        />
        <Path
          fill={theme.colors.dark}
          d="M487.3 456.2h39.1c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4h-39.1c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4zM487.3 466.3h39.1c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4h-39.1c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4zM558.3 471.6h-70.9c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h70.9c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4zM526.4 480.8c-2.1 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7c2.1 0 3.7-1.7 3.7-3.7s-1.6-3.7-3.7-3.7zM778.2 239.2c1.3 0 2.4-1.1 2.4-2.4v-10c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v10c0 1.3 1.1 2.4 2.4 2.4zM769.4 239.2c1.3 0 2.4-1.1 2.4-2.4v-10c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v10c0 1.3 1 2.4 2.4 2.4z"
        />
        <Circle
          transform="rotate(-9.213 299.752 379.89)"
          fill={theme.colors.dark}
          cx={299.8}
          cy={380}
          r={71.6}
        />
        <Path
          fill={theme.colors.dark}
          d="M208.4 263.9c.5.6 1.2.9 1.9.9.5 0 1-.2 1.5-.5 1-.8 1.2-2.3.4-3.3l-19.5-25.2c-.8-1-2.3-1.2-3.3-.4-1 .8-1.2 2.3-.4 3.3l19.4 25.2zM228.8 247c.3 1 1.3 1.7 2.3 1.7.2 0 .5 0 .7-.1 1.3-.4 2-1.7 1.6-3l-6-19.5c-.4-1.3-1.7-2-3-1.6-1.3.4-2 1.7-1.6 3l6 19.5zM161.3 474.7c.3 1 1.3 1.6 2.3 1.6.2 0 .5 0 .8-.1l15.5-5.2c1.2-.4 1.9-1.8 1.5-3-.4-1.2-1.8-1.9-3-1.5l-15.5 5.2c-1.3.4-2 1.8-1.6 3zM171.5 515.1c.5.4 1 .6 1.6.6.7 0 1.3-.3 1.8-.8l21.5-24.1c.9-1 .8-2.5-.2-3.4-1-.9-2.5-.8-3.4.2l-21.5 24.1c-.8 1-.8 2.5.2 3.4zM144.1 373.2l15.1-.3c1.3 0 2.4-1.1 2.3-2.4 0-1.3-1.1-2.4-2.4-2.3l-15.1.3c-1.3 0-2.4 1.1-2.3 2.4 0 1.2 1.1 2.3 2.4 2.3zM148.2 347.7l9.1 2.4c.2.1.4.1.6.1 1.1 0 2-.7 2.3-1.8.3-1.3-.4-2.6-1.7-2.9l-9.1-2.4c-1.3-.3-2.6.4-2.9 1.7s.4 2.6 1.7 2.9zM624.6 380h88.7v21.2h-88.7zM749 565.7h116.9V597H749z"
        />
      </G>
    </Svg>
  );
}

export default BillingImage;

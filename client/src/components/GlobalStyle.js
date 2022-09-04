import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root{
--imperial-red: #e63946ff;
--honeydew: #f1faeeff;
--powder-blue: #a8dadcff;
--celadon-blue: #457b9dff;
--prussian-blue: #1d3557ff;
--hover-black: rgb(0, 0, 0, 0.3);
--border : #E6E6E6;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
    font-size: 14px;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
h1, h2, h3 {
  color: var(--primary-color);
  font-family: var(--font-family);
}


h1 {
    font-size: 18px;
}

h2 {
    font-size: 16px;
}

h3 {
    font-size: 14px;
}
`;

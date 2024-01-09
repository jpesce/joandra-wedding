<div align="center">
  <img width="120" style="margin-bottom: 0;" src="https://github.com/jpesce/great-latex-songbook/assets/1228352/8e1f0915-bba9-4606-b1a9-6b59c9bc5b05" alt="Chandra e João's wedding page"/>
  <h1 align="center" style="margin-top: 0"><b>Chandra & João's wedding page</b></h1>
  <p>
    A fun side project to design and develop a simple, yet fully-featured, single-page wedding website from scratch.<br/><br/>UPDATE (January, 2024): we stopped paying for a custom domain. However, the website is still accessible at<br/><a href="https://joandra-wedding.vercel.app/" target="_blank">https://joandra-wedding.vercel.app/</a>
  </p>
</div>

https://github.com/jpesce/joandra-wedding/assets/1228352/5ee76565-de4d-46c5-b26d-87459b38f908

## Features
- 📆 Event information with Google Calendar link to easily add to calendar and Google Maps link to easily locate the place
- 🗒 A small note from the bride and groom
- 🥃 Food and drink menu
- 🎁 Gift list with:
  - Pre-defined gifts or pay-what-you-want
  - Minicart to keep track of users' items and continue to checkout
  - Checkout modal with payment integration ([Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix) with native integration via [qrcode-pix](https://github.com/joseviniciusnunes/qrcode-pix) and credit card via [Mercado Pago](https://www.mercadopago.com.br/))
- 📩 RSVP with Google Sheets integration via [Zapier](https://zapier.com/)
- 🤔 FAQ

## Technical stuff used
- [Synthetic javascript events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) to make the heads in the logo wobble in reaction to user's actions
- [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) to make interface interactions smoother while keeping everything lightweight
- The site is [statically generated (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) at build time and integrates with the payment layer via [Next API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [Environment variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) to store secrets and create different behaviors in development and production
- React's basic concepts: [context](https://react.dev/learn/passing-data-deeply-with-context), [reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer), [memo](https://react.dev/reference/react/memo), [state](https://react.dev/learn/state-a-components-memory), [effect](https://react.dev/learn/synchronizing-with-effects) _etc_
- [Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for type checking, linting and formatting before every push

## Lighthouse score
<img width="471" alt="lighthouse-score-chandraejoao com" src="https://github.com/jpesce/joandra-wedding/assets/1228352/59568f10-a6c4-4aeb-91c2-18606594960b">

[🔗 Report from Sep 28, 2023, 6:50:41 PM](https://pagespeed.web.dev/analysis/https-chandraejoao-com/c3v86c099q?form_factor=desktop)

Note: accessibility is not at 100 because the colors don't have enough contrast (the constrast ratio is `2.5:1`, while the [requirement for level AA is `4.5:1`  and for AAA is `7:1`](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html). This could be remedied with a new color palette when the user has [`prefers-contrast`](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-contrast) set to `more`.

## How to start developing
```
yarn
yarn dev
```

Server will be running at `http://localhost:3000/`

## Made with

- Love ❤️
- [Figma](https://www.figma.com/)
- [T3 Stack](https://create.t3.gg/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- Deployed on [Vercel](https://vercel.com/)

## Contributors
📐 Design: João Pesce and Chandra Drummond<br/>
💻 Programming: João Pesce<br/>
📝 Copy: Chandra Drummond

<br/>

_June 2023_

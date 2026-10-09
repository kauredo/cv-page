# TODO

## Screenshots still worth replacing

| Project        | Problem                                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| Cadence Studio | Only the public landing and `/voice-check` pages. The app needs a login, so the review queue isn't shown. |
| AoC Ruby       | The only image is a GitHub repo page.                                                                     |
| MyAgentWebsite | From April. Still matches the live site, so refresh when its design changes.                              |
| ProTasca       | From April. Same as above.                                                                                |

## Project entries

- Dois Agentes has no `link`. Add one once there's a public URL.
- Entry 0 in `projects.json` is the homepage feature and entries 1 to 6 fill the homepage grid. Re-check the order when a project ships or stalls.

## Unused files

- `static/images/ines.jpg` and `static/images/bg.svg` aren't referenced anywhere.

## Refreshing screenshots

Most app repos keep PR screenshots on a `pr-assets` branch, one folder per PR. Take desktop "after" shots from the newest folders and skip crops, empty states and anything showing a cookie banner. Cut them to 16:10 from the top, since cards render `object-cover object-top`, cap them at 1600px wide, and save them as webp at quality 82.

`static/images/portfolio.webp` is the site-wide Open Graph image, not a project screenshot. Keep it at 1200x630, which is what `src/routes/+layout.ts` declares.

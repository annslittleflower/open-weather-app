# weather app

[Live link - https://annslittleflower.github.io/open-weather-app/](https://annslittleflower.github.io/open-weather-app/)

## installation

`nvm i`

`nvm use`

`npm run dev`

in root create `.env.local` file, paste `VITE_API_URL=your-api-key`

## features

- share by url
- openweather api with react-query
- search history
- move old history item up in queue if searched again
- mobile styles
- tailwind
- undo remove
- ctrl+z undo
- remove city from url if removed from history
- keyboard a11y works
- pretty cool lint

**beware**

- openweathermap api key activates 2 hours after registration

## problems & todos

- try to do undo with query cache client, not string city arrays
- ctrl+z for undo with query cache client
- read about barrel files

- two city state variables
- city partial search doesnot work, user needs to type city 100% correctly

```json

## for correct on save formatting

{
  "files.associations": {
    "*.tag": "htmltag"
  },
  "editor.tabSize": 2,
  "eslint.validate": ["typescript", "typescriptreact"],
  // "typescript.validate.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.unicodeHighlight.ambiguousCharacters": false,
  "json.schemas": [],
  "window.zoomLevel": 1,
  "prettier.embeddedLanguageFormatting": "off",
  "editor.formatOnSave": true
}



```

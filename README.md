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

- read about barrel files
- city partial search doesnot work, user needs to type city 100% correctly

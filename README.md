# weather app

`nvm i`

`nvm use`

`npm run dev`

## features

- share by url
- openweather api with react-query
- search history
- move old history item up in queue if searched again
- mobile styles
- tailwind
- undo remove
- remove city from url if removed from history

**beware**

- openweathermap api key activates 2 hours after registration

## problems & todos

- jumping search css
- decouple logic in Weather component
- city partial search doesnot work, user needs to type city 100% correctly
- a11y and semantics are currently sad
- tests timer popups
- try to do undo with query cache client, not string city arrays
- bad request value goes to history
- code cleanup
- eslint doublecheck
- pre-commit and pre-push hook

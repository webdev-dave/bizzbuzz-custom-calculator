# BizzBuzz Calculator WebApp

[view live version here](https://bizzbuzz-calculator.netlify.app)

## Todo

- Additional Data section should be collapsible ?
- add a clear-all-fields (reset) btn
- test for bugs and edge cases - and make sure all results add up correctly
- add styles to beautify and ease usability

### Notes

- there is a bug on all components that render html input elements. the bug is that when using tab to jump from element to element the element loses focus immediately after single number entry. This must be fixed!!!!!
- in order to clean up the results reducer all i have to do is update whatever component needs updating and leave the rest up to calling updateNetUnitCost
- as of now, the app is only built to handle one Box size

### potential add-on features

- fix profitMargin "focus" behavior

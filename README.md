# BizzBuzz Calculator WebApp

[view live version here](https://bizzbuzz-calculator.netlify.app)

## Todo

- extraData should be split into multiple components
- make sure all results add up correctly
- add Additional Data section (should be collapsible)
- get rid of multi unitCode columns (event with non EQP)
- block user from being able to edit netUnitCost
- make all results update based on netUnitCost (as opposed to unitCost)
- make netUnitCost update based on: Unit Code, Setup Fee, Setup Code, Box, Handling Fees (& EQP % calc)
- fix "0" unit cost behavior (bug)
- add a clear-all-fields (reset) btn
- disable mouse scroll from changing input values
- test for bugs and edge cases
- add styles to beautify and ease usability

### Notes

- in order to clean up the results reducer all i have to do is update whatever component needs updating and leave the rest up to calling updateNetUnitCost 
- as of now, the app is only built to handle one Box size

### potential add-on features

- display additional data
- fix profitMargin "focus" behavior
- add boxesRequired element in Results
- 
## Modules

```modules``` contains the indexing module and a utilities module.

The indexing module contains methods that both applications use to index the resume data (for more efficient searches)

The utilities module contains methods that both application use for validation, filtering and importing data.

## Style

```style``` contains shares scss constants and style.

Both apps consume those either through a component shadow dom on angular2 or app-wide style sheets in angular1

## Resume

```resume``` contains the rows of data of the resume.

It can be changed completely and both apps would work with the new data.


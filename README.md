## Getting Started

1. Copy the jquery.autocomplete.js file into your project's public
   javascripts folder.

2. Import the JavaScript file *after* jQuery UI autocomplete is loaded on the
   page where you intend to use it.

        <script type="text/javascript" src="/path/to/jquery.autocomplete.js"></script>

3. Add optional `data-hint` and `data-searching` attributes to your already
   working jQuery UI autocomplete field.

        <input type="text" data-autocomplete-source="/path/to/ajax/results"
                           data-hint="Type in a search term"
                           data-searching="Searching" />

That's it! Refresh your page in your web browser, and you should now see your
autocomplete field providing hints when you focus on the field or when it
beings searching for matching values.

## Contributing

I encourage you to contribute improvements! Fork a branch on github, and submit
a pull request to have your changes reviewed for inclusion.

## License

jQuery UI Autocomplete Hint extension is released under the MIT license.
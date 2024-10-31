
## Project Overview
### Tailwind
To style my project, i have used css framework - Tailwind that made my life much easier.
The benefit of using it - is that you do not have to name classes and style each separately. Basically, you can do everything in one line, saving a lot of time.
The same applies to responsiveness. Tailwind has super convenient naming for these purposes. 

## Additional Decision
### Svelte Store - filters and search
To implement this project, one of the main requirements was to create a filtering system based on at least three properties.
Given the structure of my project components, I decided to use a Svelte store for the filtering logic.
Without the store, I would have had to implement all the logic directly within the Home.svelte page, passing necessary functions and variables as props to various components. 
However, since the Home.svelte page isn't responsible for handling filtering logic, using a store allowed me to keep the filtering functionality separate and maintain code cleaner. The same applies to searching functionality, as the logic is written in filters.js file.


## Main Difficulties
### onMount() usage with fetch
One of the most challenging issues I faced during development was managing the rendering logic. 
When interacting with backend data, I initially had to refresh the page to see updates. 
Fortunately, I discovered Svelte’s dispatch event, which solved this problem effectively. 
However, due to the project structure, I couldn’t use dispatch in one situation.
On my ItemDetails page, I use two components: BidPopover (for creating a bid) and Bids (for displaying bids). 
Using dispatch here would have required extensive prop-passing, making the code harder to read and maintain. 
Instead, I decided to use onMount() to fetch and display bids directly in the ItemDetails page, which keeps the code cleaner and more straightforward.
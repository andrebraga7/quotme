# Table of Content

- [**Testing**](<#testing>)
    - [Testing User Stories](#testing-user-stories)
    - [Code Validation](#code-validation)
    - [Additional Testing](#additional-testing)
    - [Known Bugs](#known-bugs)

## Testing User Stories

### Access the website

- As a user I can view a navbar so that I can navigate between pages.
    - When the user first enters the page there is a navbar visible on the top.

- As a user I can navigate between pages so that I can view content without page refresh.
    - When clicking on different links the content is loaded without trigering a page reload.

- As a user I can create an account so that I can have my own profile page.
    - Clicking on the Sign Up link takes the user to the account creation form.

- As a user I can login to the website so I can have access to all features.
    - Clicking the Login link will take the user to the login form to enter credentials and login.

- As a user I can stay logged in until I decide to logout so that I can have a good user experience.
    - When a user logs in a jwt is stored in the local storage and until the user clicks on the logout button he stays signed in.

- As a logged out user I can view the signup and login options so that I can signup or login.
    - The menu links change depending if the user is logged in or logged out.

### Create a quote

- As a user I can add a quote so that I can share it with the community.
    - When the user clicks on the Add Quote button it takes him to the add quote form to add a quote.

- As a user I can start typing an author of a quote so that It automatically loads available authors.
    - When adding an author to the quote the author field autocompletes with available authors from the db.

### Interact with quotes

- As a user I can view the details of a single quote so that I can learn more about it.
    - Clicking on a quote takes the user to the quote page that displays information about it.

- As a user I can like a quote so that I can show my interest in a quote.
    - Clicking on the thumbs up icon of a quote add that user to the quotes likes list.

- As a user I can save a quote so that I can view it in my saved quotes.
    - Clicking on the save icon saves the quote to the users profile that can be viewd in the Saved page.

### Discover page

- As a user I can view the most recent quotes so that I am up to date with the latest content.
    - The Discover page shows the user all the quotes from the community, ordered by the most recent ones.

- As a user I can view quotes by categories so that I can view only what interests me.
    - Selecting a category on the dropdown menu filters all quotes by that specific category.

- As a user I can search for a quotes by keywords so that I can view what interest me.
    - Entering text in the search field searched all the quotes by username, author and content.

### Authors page

- As a user I can view the most popular authors so that I can view their quotes.
    - The authors page shows the most popupar authors by quote numbers.

- As a user I can view an authors page so that I can view all quotes related to that author.
    - Clicking on an authors opens the author page with details and all quotes for that given author.

### Quote page

- As a user I can view the quote page so that I can read the comments about it.
- As a user I can view a quote's comments so that I can read what users are saying.
    - The quote page displays information specific to the quote and shows all comments underneath.

- As a quote owner I can edit the quote title and content so that I can make corrections.
    - If the user is the quote owner he can view the edit button to edit a quote.

- As a quote owner I can delete a quote so that I can remove it from the website.
    - If the user is the quote owner he can view the delete button to delete a quote.

- As a logged in user I can create a comment in a quote so that I can share my thoughts.
    - Logged in users can view the comment create form component to create a comment.

- As a logged in user I can edit a comment so that I can update the content.
    - If the user is the comment owner the edit button is visisble.

- As a logged in user I can delete a comment so that I can remove it from a quote.
    - If the user is the comment owner the delete button is visisble.

- As a user I can view a reply to a comment so that I can read what user are saying.
    - If a comment has replies the user can click the View all replies to view replies.

- As a logged in user I can reply to a comment so that I can continue a conversations.
    - Logged in users can view the comment reply form to reply to a comment.

- As a logged in user I can edit a reply so that I can update the content.
    - If the user is the owner of a reply the edit button becomes visisble.

- As a logged in user I can delete a reply so that I can remove it from a comment.
    - If the user is the owner of a reply the delete button becomes visible.

### Profile page

- As a user I can view other users profiles so that I can see their quotes and learn more about them.
    - Clicking on a username takes the user to the user's profile page that displays all information rlevant to the profile and all quotes created by the user.

- As a user I can view the statistics of a profile: number of quotes, followers, following and bio so that I can learn more about them.
    - The user's profile page displays the users number of quotes, followers, following and bio information.

- As a user I can view all quotes by a specific user so that I can catch up on their content.
    - The user's profile page displays all quotes created by the user.

- As a logged in user I can follow or unfollow a user so that I can view or remove quotes created by them in my feed.
    - Logged in users can follow or unfollow a profile. The Home feed page displays all quotes from users that are followed.

- As a logged in user I can edit my profile so that I can update my bio or profile image.
    - If the user is the profile owner the edit button becomes visible and clicking it takes the user to the profile edit form.

- As a logged in user I can change my username and password so that I can change my display name and keep my account safe.
    - If the user is the profile owner the change username and password buttons becomes visible and clicking them takes the user to the respectfull forms.

[Back to top](#table-of-content)

## Code Validation
During the coding the Prettier and ESLint extensions were used throught which automaticaly checks the code for errors as it is typed. This helped debug any issues with the code earlier on during the development process.

### CSS Validaton
When using the W3C CSS validator all code passed with no known issues.

![W3C Validator](src/assets/readme/css_validation.png)

### JavaScript Validation
At the end of the project ESLint passed all the code with no known validation issues.

[Back to top](#table-of-content)

## Additional Testing

### Manual Testing

In adition to the validations and tests stated above, I have made several manual tests throught the development of the project, some of theses tests are listed bellow:

- Viewing all quotes logged out user;
- Viewing all quotes as logged in user;
- Searching for quotes throught the search input;
- Filtering quotes by category;
- Only viewing quotes by followed user in the home feed;
- Viewing quotes by specific author;
- Viewing other users profile page and quotes;
- Creating an account;
- Loggin in to the website;
- Following and unfollowing a user;
- Adding a quote;
- Editing a quote;
- Deleting a quote;
- Editing profile page;
- Liking and savind a quote;
- Commenting on a quote;
- Editing and deleting a comment;
- Replying to a comment;
- Editing and deleting a reply;
- Trying to access broken url and showing 404 page;

### Automated Testing
I have done some automated testing for the project, however due to time limitations and prioritization of other user features and tasks I have only manages to write a few tests. Automated tests can be run by typing the command - *npm test*

[Back to top](#table-of-content)

### Responsiveness Test
The responsive design tests were carried out manually with [Google Chrome DevTools](https://developer.chrome.com/docs/devtools/) and [Responsive Design Checker](https://www.responsivedesignchecker.com/).

| Desktop    | Display <1280px       | Display >1280px    |
|------------|-----------------------|--------------------|
| Render     | pass                  | pass               |
| Images     | pass                  | pass               |
| Links      | pass                  | pass               |

| Tablet     | Samsung Galaxy Tab 10 | Amazon Kindle Fire | iPad Mini | iPad Pro |
|------------|-----------------------|--------------------|-----------|----------|
| Render     | pass                  | pass               | pass      | pass     |
| Images     | pass                  | pass               | pass      | pass     |
| Links      | pass                  | pass               | pass      | pass     |

| Phone      | Galaxy S5/S6/S7       | iPhone 6/7/8       | iPhone 12pro         |
|------------|-----------------------|--------------------|----------------------|
| Render     | pass                  | pass               | pass      | pass     |
| Images     | pass                  | pass               | pass      | pass     |
| Links      | pass                  | pass               | pass      | pass     |

[Back to top](#table-of-content)

### Browser Compatibility
- Google Chrome Version (106.0.5249.119)
- Mozilla Firefox (version 105.0.3)
- Apple Safari (version 16.0) 
- Microsoft Edge (version 106.0.1370.47)

[Back to top](#table-of-content)

### Lighthouse
Google Lighthouse in Chrome Developer Tools was used to test the application within the areas of *Performance*, *Accessibility*, *Best Practices* and *SEO*. The testing showed the following:

 - Performance: 97;
 - Accessibility: 100;
 - Best Practises: 83;
 - SEO: 100;

 Best Practises had a lower score due to some API Failed Request 401 (Unauthorized) errors being logged to the console. This however, is a known issue with the site trying to make a request to check for logged in user on loading.

 ![Lighthouse](src/assets//readme/lighthouse.png)

### Peer Review
Additional testing of the application was made by users outside of the software development scope. Some small layout and styling errors were found and fixed. The feedback given was positive and relates to the project goals of a simple and good user experience.

## Known bugs
At the moment of writing this testing file the known bugs are:

- API Failed Request 401 (Unauthorized) errors being logged to the console on page load;
- Safari browser block API request because by default it prevents cross-site-tracking, due to the API being on a different url than this project. The work-around if turning this option off in the browser settings.

[Back to top](#table-of-content)

Back to [**README file.**](README.md)
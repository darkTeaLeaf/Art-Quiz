ArtQuiz
===

Link to **GitHub** repository: [🤟](https://github.com/darkTeaLeaf/Art-Quiz)
Link to **Trello**: [🤟](https://trello.com/b/HSjj7s9b/artquiz)

# Project description

**ArtQuiz®** is a Web-application for recognizing the pieces of art in a game manner.

There is a tremendous amount of paintings, tracks of art, and the user gets an opportunity to enrich knowledge about famous paintings of great masters of the brush by just using this service.

The centric element of a site is an unlimited carousel of paintings, additionally with several answer options containing the only correct one. The user may guess the name of the picture, the painter's name or the art movement.

Regardless the choice was successful or unsuccessful, the user will be provided with the correct answer and brief information about the piece of art the one was guessing about.

The user's account lets the one observe the progress and check some statistics, see the list of available and gained achievements. Also, the user can suggest the addition of  a new painting to  the system, which  is reviewed by  a site moderator.

As further development part, **Monetization through Gamification** add-on can be added to the service. It includes:

-   Art battles (guessing for a while);
-   Getting coins as a reward of accomplishing the achievements, competing in art battles and suggesting new paintings;
-   Thematic game modes (cost coins to unlock);
-   Top of best users;
-   Donation for coins and subscription unlocking all the content 💰.

# Project value

This project will be useful and valuable for people interested in art.
Regardless of the potential user is interested in art or just planning to broaden the horizons and enrich the knowledge of this theme, the application will be useful for both described types.

The service is:
* free;
* made of the game form;
* informative;
* encourages self-study and personal achievements.

# Goals

The main goal of completing this project is learning new technologies, practicing Agile in a real development process, creating something informative and useful - the product we would be happy to use by ourselves.

# Personal efforts

## Arina
In my humble opinion, the best way to learn something better is to practice. That's the main reason for this project - put into practice all concepts I've previously learned, and motivate myself to learn something new, the Django framework in my case. There's usually no time to spend on personal projects, and this is a great opportunity to create something that I dreamed about for a long time, as a part of the educational process, with supervisor and team.

## Irek

The frontend is my primary point of interest. I have experience in some frameworks, but React for now is the one I want to focus on. I plan to make it my main developing tool, on top of the others in my personal stack of technologies. Of course, there's no time to spend on practicing it during the semester, that's why I and Arina came up with the idea of ArtQuiz project - the field for our professional growth. Also, I'm interested in learning the art myself, so I'd be happy to use it.

# Backlog

<table>
<tr style="font-weight: bold;">
	<td>Epic </td>
	<td>Feature</td>
	<td>Functionality</td>
</tr>

<tr>
	<td rowspan="8">Service for paintings guessing</td>
	<td rowspan="3">Infinite stream of paintings</td>
	<td>Question page (painting and multiple choice)</td>
</tr>

<tr>
	<td>Answer page (answer correctness and painting info)</td>
</tr>

<tr>
	<td>Possibility to choose the aspect of guessing</td>
</tr>

<tr>
	<td rowspan="3">User account</td>
	<td>Log-in & Sign-up</td>
</tr>

<tr>
	<td>Page of a user's account</td>
</tr>

<tr>
	<td>Account management (add/edit account info)</td>
</tr>

<tr>
	<td rowspan="2">Game elements</td>
	<td>Achievements in user's account</td>
</tr>

<tr>
	<td>Statistics in user's account</td>
</tr>

<tr>
	<td rowspan="3">Database replenishment</td>
	<td>Possibility to add new painting by moderator</td>
    <td></td>
</tr>

<tr>
	<td>Request for addition a new painting by user</td>
	<td></td>
</tr>

<tr>
	<td>Moderator review of requests</td>
	<td></td>
</tr>

<tr>
	<td>Monetization through gamification</td>
    <td></td>
    <td></td>
</tr>

</table>

# User stories

| # | User story |
| - | ---------- |
| 1 | As a user <br> I want to see page with a question about painting <br> so that I can answer it  |
| 2 | As a user <br> I want to see the right answer and info about painting <br> so that I can check myself and learn something new |
| 3 | As a user <br> I want to choose the aspect of guessing <br> so that I can learn different things about paintings |
| 4 | As a user <br> I want to sign-up and log-in <br> so that I can have account with my personal data and statistics |
| 5 | As a user <br> I want to manage my personal information <br> so that I can keep the information up-to-date |
| 6 | As a user <br> I want to see my achievements and statistics in account <br> so that I can track my progress |
| 7 | As a moderator <br> I want to add new painting to database <br> so that database will be replenished |
| 8 | As a user <br> I want to add new painting to database <br> so that I can get service's extra offers |
| 9 | As a moderator <br> I want to review users' requests <br> so that I can control the consistency of the database |

# Minimal Viable Product

We define the MVP for the project as an implementation of the infinite stream of paintings which is the first feature in the backlog. It includes the following:
* main page with a question about painting;
* answer page which also contains information about painting;
* menu to choose the aspect of guessing.

MVP is planned to be done during the first iteration of the project development.

# Milestones

## Preparations (20/01-03/02)

## Iteration 1 (03/02-17/02)

Feature 1: Paintings carousel **(MVP)**

Requirements:
1.  Infinite carousel of paintings;
2.  Single-choice answer option;
3.  Ability to switch between different answer options:
    a.  painter's name;
    b.  painting's name;
    c.  movement of art.

## Iteration 2 (17/02-02/03)

Feature 2: User account

Requirements:
1.  Opportunity to create an account: Log-in & Sign-up options;
2.  Account management features: add/edit account data;
3.  Observation of user's statistics in an account.

## Iteration 3 (02/03-16/03)

Feature 3: Game elements

Requirements:
1.  Ability to earn achievements during the game process;
2.  Ability to check the list of achievements in an account page.

## Iteration 4 (16/03-30/04)

Feature 4: Paintings addition by moderators

Requirements:
1.  Admin interface panel in moderators' accounts allowing to add new paintings to the system;
2.  Besides, the panel provides functionality to search in and check a database for duplicates, sort paintings;
3.  Ability to edit any painting's information.

## Iteration 5 (30/04-13/05)

Features 5, 6: Requests for paintings addition by users, and their reviews by moderators

Requirements:
1.  A new section of user's account page consisting a form for the addition of a new painting;
2.  A new feature for moderator's admin panel: review users' requests for the addition of the new paintings;
3.  The ability for a moderator to reject, accept and edit & accept the request;

## Iteration 6 (13/05 - 27/05)

Preparations for the production build and deploy.
Internal and external system tests.
Presentation designing.

## Delivery (27/05)

# Architecture sketch

![t1ALT0W](https://i.imgur.com/oNI8z7p.png)

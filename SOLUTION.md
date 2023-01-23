# Research Bay

## DSC Solution Challenge Submission Questions and Answers

#### Please clearly describe the challenge you are looking to solve with technology and how this solution addresses the challenge at hand. 
(max 500 chars)

Our university offers thousands of research opportunities, however, many students are unaware that these opportunities exist. Currently, there is no standardized way of discovering and pursuing research with professors. Research Bay aims to provide a platform for UIUC students to discover research opportunities and for professors to discover talent. It offers a streamlined, one-stop-shop solution for students and professors through personalized profiles, research postings coupled with a search/recommendation system. 

---

#### Walk us through the steps you took to test your solution.

Unit Testing:

For our React.js frontend, we tested individual UI elements, actions, and styles according to the sketches and mockups we had created during our design period. With the mockups, we always kept a solid vision of what and how we wanted the UI to look and behave. Frontend mockups/notes:  https://bit.ly/2SfdDNV

For our backend API consisting of Cloud Functions, we implemented a straightforward testing process for each function according to the specific data formats and HTTP schemas we designed beforehand. We tested each function’s request, response, and internal Firebase actions (i.e. CRUD user data/actions) by using Postman and/or a Python script using Requests. Any calls to “Set” data functions were tested to work both via the Firebase console and corresponding “Get” calls.

Integration Testing:

After the initial unit testing, we moved onto connecting the frontend with the backend via HTTP. We tested various simple user actions such as authentication (sign in/up) and fetching and displaying the user’s profile data. During this stage, we thoroughly tested the correctness of our HTTP request/response formats and error handling code and continuously updated a large bulk of our documentation and code. The frontend was updated to better display and send user data, and bugs in the backend were patched to ensure all CRUD operations were working correctly. After the essential CRUD functionality, we moved onto testing the backend's integration with our recommendations/search systems, following a similar strategy of testing endpoints' responses and actions. 

End-to-end, Field Testing:

Once most core features were largely completed, we began end-to-end testing with a local instance of the React.js app and deployed Firebase backend. All members of the Research Bay teams thoroughly tested the website from the perspective of external users: creating accounts, customizing profiles, and creating/applying to research postings from sample professor accounts. Testing the website’s UI/UX, performance, and correctness (such as the quality of recommendations generated for the users) helped us to patch additional bugs, add minor quality-of-life improvements, and set our future roadmap. After this stage of testing, we plan to release Research Bay to a limited group of professors and students at UIUC.

---

#### Please share the outcome of your testing strategy. What specific feedback did you receive from users? What specifically did you maintain or iterate based on that feedback? 
(Think about the UI or the actual solution design or maybe did you have to go back to the idea and refine it further)

Our diverse and comprehensive methods of testing Research Bay have been highly useful and effective for establishing a consistent feedback loop between teams, fixing bugs, and planning new features. For example, the frontend team has regularly presented its working React app to the other teams, encouraged them to try out the website as users, and developed based on their feedback I. Some feedback received in the past include:

1. Website is unclear whether it’s still or finished fetching user data to load a full-page
2. Allocate entirely separate page for professors to create, edit, and view their open research positions instead of on their profile page
3. Users should have the ability to upload their resume and picture to their profiles
4. Be able to filter search and recommendation results locally by user profiles, research postings, or both

Since then, these key issues have all been fixed and helped the frontend get to the functional, more comprehensive UI it is now. Our team members have made contributions to the style and quality-of-life additions of Research Bay as well.

For the backend team, much of the feedback they have received has been about database optimizations and streamlining the REST API’s response formats to better integrate with the frontend. Some examples of past feedback that the backend team has iterated based on are below:

1. Standardized JSON response data format and handle CORS issues
2. Instead of returning only document IDs and making the frontend send multiple requests for profile or postings data, modify the endpoint to fetch and return user data by itself
3. Fix user deletion so that all DB documents (profile, postings, metadata, etc) are deleted along with the user in Authentication (deep deletion)

As we continue development with our future roadmap and hope to gather more feedback from a limited release in the fall, we will continue improving the backend according to the needs of other teams. Updates and additions to the REST API will be made, but no major structural fixes are likely as we have already finished and refined most core features with good end-to-end testing.

TODO data/ml team testing (with real profiles, recommendations and search) 

---

#### How will or has your solution improved the lives of people in your community? 
(Please include specific use cases of how users can use this solution. Do not worry about the technical components here)

Additional details are available here: https://github.com/DSC-UIUC/research-bay#about

---

#### Please walk us through the steps you took to build your solution. Include which products or platforms you used and why. Please include guidance on how to run your code.

There were 3 main overarching stages for building Research Bay: design, develop, and finalize, with testing and user feedback being significant in all stages.

After the basic idea for Research Bay was defined, each team (frontend, backend, data/ml) began brainstorming. The frontend team began sketching UI mockups, using JumpStart and LinkedIn as inspiration. The backend team identified the website’s required CRUD operations. The data/ml team researched how to implement a NLP-based system for matching users to research opportunities and what user data would be needed. Common ideas between the teams, such as profile personalization and matching professors’s research to students, were prioritized.

After identifying core features and functionalities, we determined the ideal tech stack to use for Research Bay for our needs. After much research, we selected the following:

- Frontend: We opted for a React/Redux app because of its widespread industry use, relatively straightforward learning curve (most team members were beginners), and a wide array of available styling libraries fit for our use, among other reasons. We selected Material UI as our main components library because it adapts Google’s Material Design style that we wanted to adopt for our website. 
- Backend: We chose to host our backend on the cloud and decided on Firebase for its built-in suite of easily integrable services that we needed for Research Bay: Authentication, Firestore DB, Cloud Functions, Hosting, etc. It would be automatically scalable for when we release Research Bay into the public, and all of the infrastructure is internally maintained by Firebase. Also, Firebase's extensive documentation and guides (ex. Firecast videos) greatly helped the team, many of whom were beginners and needed a technology without a steep learning curve.
- Data/ML: TODO

To keep our short and long-term goals in order, we maintained a list of concrete tasks for each team: bit.ly/2Sjt0oi, which roughly outlines the actual steps we took to build our solution. To accomplish these steps, we used the iteration design cycle during development.

Each team started development by building a basic prototype of its designated component of the project. The teams built a basic React app with only visual functionality, a Firebase backend API with simple CRUD operations, and a keyword extraction script using sample data. Once we evaluated and tested our prototypes, we identified and designed the next set of features to add. 

As the teams repeated this cycle, the prototypes started to integrate together: the React app fetched and sent user data to the backend, and the backend stored the results of the recommendation model. Because the work between teams became more fluid with each new feature, we had each team regularly demo its work and gather user feedback from other teams. As reflected in our testing, this process ensured all project developers were kept up-to-date and could effectively contribute to the same team vision and helped us rapidly connect all the components into a full website in the past few weeks.

Now, much of the core development of the solution has been finished and Research Bay is a full website deployed at: https://research-bay.web.app. However, we have future plans to take our solution to the next level, so all teams are currently in the process of working on documentation, tests, and bug fixes to prepare accordingly.

Details for running our code are found here: https://github.com/DSC-UIUC/research-bay#getting-started

---

#### What do you see as the future / next steps for your project? What will take your project to the next level?

With much of Research Bay's core features largely complete, the team has started planning for Research Bay's eventual public release to the University of Illinois population. Once all features and sufficiently tested and finalized, the team expects to begin a limited release of Research Bay to groups of selected students and professors at UIUC sometime in fall 2020 to gather more user feedback, make any necessary updates, and gradually prepare for a full release farther in the future. Ideally, Research Bay could expand to other universities to continue its mission in new regions.

The Research Bay team also plans to continue development and maintenance of this project. Current plans are briefly described below, listed in order of short-term to long-term goals. Future development will continue to emphasize scalability, clean design, and better user experience.

1. UI Additions / Improvements
    * Local filtering for search and recommendation results
    * View and edit requirements for postings
    * Faster loading times for actions
    * Style / theme changes
2. Backend Code Optimizations / Speedups
    * Improve function code to reduce latency between client and server
    * Remove redundant DB queries
3. Recommendation / Search System Improvements
    * Larger, more generalized training data
    * Test with more user profiles and postings
4. Mobile app 
    * Would be a new frontend interface to expand Research Bay's availability and reach
    * Easy integration with existing backend
    * Develop in Flutter

---

#### What specific support do you need to achieve that?
*What has to happen to implement this solution to new regions and new users?*

To complete Research Bay into a production-ready user-facing public platform, the Research bay team is not only concerned with adding/improving website performance and functionality. To ensure better security for its users and their personal data, Research Bay will need the support of the University of Illinois and its Technology Services department to be further examined to make sure it meets all University standards. It will also be helpful to integrate Research Bay's user authentication with UIUC's Shibboleth system to better connect online users to their real-life identity.

The Research Bay team would also need support from both UIUC and Google with advertising and providing legitimacy for the website before and during its limited and public release stages. The University's assistance would be valuable when reaching out to professors to join the platform, and Google's support for Research Bay could provide increased exposure, trust, and willingness to join the platform by potential students.

In terms of effectively continuing development with new and existing features, Google's wide array of available technical expertise would be immensely helpful to take Research Bay to the next level. For example, learning from subject matter experts in Firebase would be really useful to the team to improve our backend codebase. Additional training for GCP and/or Firebase would give us a better, more comprehensive understanding of the in-depth details of the services that make up our product.

---

#### Describe your favorite component (s) /feature (s) of your technical infrastructure and why you chose it/them for your solution.

My favorite part of our tech stack for Research Bay is the Serverless Firebase backend because it is modular, efficient, and responsible for seamlessly connecting all of the other components into Research Bay. For example, the React.js frontend communicates with the backend over HTTP using a REST API. When the Research Bay mobile app is being developed, it will be able to easily integrate with the current backend just like the website.

Compared to typical servers (ex. using Node.js or Apache), our Serverless backend also has the following advantages:

1. Lower costs: the pay-as-you-go (or use) model: For Research Bay, it is important to us as students to keep resource costs low and efficient. With Firebase, our costs are kept minimal because the backend runs Cloud Functions and Firestore and spends compute time only when invoked by the frontend web app. Additionally, thanks to Firebase's free usage limits, Research Bay's infrastructure costs will remain low even with many more users. 

2. Increased scalability: Given that our plan is to eventually release Research Bay to the UIUC population of students and professors, we emphasized futureproofing and scalability during development. All of the Firebase services we use for Research Bay (Authentication, Firestore, Storage, Hosting, Cloud Functions) are all automatically scalable to thousands of users with minimal changes. All infrastructure maintenance and scaling is handled by Firebase.

3. Easier development with multiple languages for different features: To develop Research Bay's recommendation system, which matches professors with students for research opportunities, we opted use Python for its extensive collection of NLP libraries. Because our backend is written in Cloud Functions, which can be used with multiple languages, it was very easy to integrate our Python code into the rest of our primarily JavaScript API.

More details are available here: https://github.com/DSC-UIUC/research-bay#structure

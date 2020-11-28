# Fintrack Application

## Content
1. [Project Information](#project-information)
2. [Project Introduction](#project-introduction)
3. [Demo](#demo)
4. [Prerequisite Software](#prerequisite-software)
5. [How to Run the Project Locally](#how-to-run-the-project-locally)
6. [Technologies Used](#technologies-used)

## Project Information
- University Name: [San Jose State University](http://www.sjsu.edu)
- Senior Project
- Senior Advisor: [Nima Karimian](https://cmpe.sjsu.edu/profile/nima-karimian)
- Project Members:
    - [Daniel Nomura](https://www.linkedin.com/in/daniel-danny-nomura-4031a6137/)
    - [Jefferson Ly](https://www.linkedin.com/in/jeffersonly/)
    - [Jessica Lam](https://www.linkedin.com/in/jessica-lam-9a896a195/)
    - [Sophie Chen](https://www.linkedin.com/in/sophie-chen-855071126/)

## Project Introduction
FinTrack is an expense tracking website application. Its main functionalities are to record inputted data regarding users’ spendings and savings and to calculate split shared expenses when needed. With an easy to use and simple user interface, FinTrack aims to encourage budgeting and to improve financial efficiency in society, especially for users who were originally discouraged to do so due to the complexity of current banking applications. By using FinTrack, they would find budgeting more appealing and less challenging. This would gradually lead to a decrease in the percentage of people in debt, as they spend more responsibly and save adequately. However, everyone has a unique budgeting plan that depends on their monthly expenses. Therefore, the objective of the project was to develop an application that catered to each individual user. FinTrack documents not only transactions in regards to spendings and savings, but also monthly expenses. Users could then utilize the visuals built by FinTrack not only to compare the value of transactions and expenses to their income, but also to remind themselves to allocate an adequate amount for savings instead of blindly spending money. FinTrack also has a split expense calculation function, where users would enter the requested information, such as the shared expense amount, the number of people to split with, and, if applicable, tip and tax, and the cost per person would automatically output the result to users.

## Prerequisite Software
- Node/NPM (Node Package Manager) - A package manager for JavaScript programming, commonly used to download/use libraries through the sharing/reuse of code. To get NPM, you need to install Node which can be found [here](https://nodejs.org/en/).
- Git - A distributed version control system to track changes in source code. It's a valuable tool and can be used to clone the project if you want to run it locally, otherwise you could simply download the zip file straight from the repository. In any case, it's a highly recommended tool that you can find [here](https://git-scm.com/downloads).
- Code Editor - A code editor is required, we used VSCode (Visual Studio Code) to develop the project and recommend it. It can support a variety of languages and provides a means for soruce control, you can find the editor [here](https://code.visualstudio.com/).

## Demo 

## How to Run the Project Locally
To run the front end of the application locally, follow these steps:
1. Go into your terminal and navigate to into a directory where you want to have the project
2. Type the following command into your terminal ```git clone https://github.com/jeffersonly/Fintrack.git``` 
3. Navigate into the file directory after the cloning is finished
4. Run ```npm install``` to install project dependencies
5. After installing the dependencies, an aws-exports.js file is needed, this file needs to be either requested from the developers -- or backend configurations need to be made by the user themself. To set up the backend resources, a guide can be found [here](https://docs.amplify.aws/lib/q/platform/js). The backend resources that need to be set up are as follows: Auth, Storage, API (GraphQL), and Predictions. 
6. Once the backend resources are set up, and a aws-exports.js file is within the project, run ```npm start``` and the project should run locally at localhost:3000.

## Technologies Used
1. AWS (Amplify, DynamoDB, Textract, S3)
2. Git
3. React
4. VSCode
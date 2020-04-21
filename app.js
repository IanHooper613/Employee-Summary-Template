const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let teamArray = []

function buildTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'teamMember',
            message: 'What type of team member are you adding?',
            choices: ['manager','engineer','intern',]
        }
    ]).then(function(answers) {
        if (answers.teamMember === 'manager') {
            manager()
        }else if (answers.teamMember === 'engineer') {
            engineer()
        }else if (answers.teamMember === 'intern') {
            intern()
        }
    })
}
buildTeam();

function manager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the manager?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the manager?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the manager?'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number of the manager?'
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'Would you like to add another Team Member?',
            choices: ['yes','no']
        }
    ]).then(function(answers) {
        const newMember = new Manager(anwers.name, answers.id, anwers.email, answers.officeNumber)
        teamArray.push(newMember)
        if (anwers.addMember === 'yes') {
            buildTeam()
        }else {
            renderTeam()
        }
    })
}

function engineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the engineer?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the engineer?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the engineer?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the GitHub user name of the Engineer?'
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'Would you like to add another Team Member?',
            choices: ['yes','no']
        }
    ]).then(answers => {
        const newMember = new Engineer(answers.name, answers.id, answers.email, answers.github)
        teamArray.push(newMember)
        if (answers.addMember === 'yes') {
            buildTeam()
        }else {
            renderTeam()
        }
    })
}

function intern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the intern?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the intern?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the intern?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the school name of the intern?'
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'Would you like to add another Team Member?',
            choices: ['yes','no']
        }
    ]).then(function(answers) {
        const newMember = new Intern(answers.name, answers.id, answers.email, answers.school)
        teamArray.push(newMember)
        if (answers.addMember === 'yes') {
            buildTeam()
        }else {
            renderTeam()
        }
    })
}

const renderTeam = () => {
    fs.writeFile(outputPath, render(teamArray), 'utf8', error => {
        if (error) {
            throw error
        }
    })
}

    
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.


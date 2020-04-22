const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");


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
        const newMember = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        teamArray.push(newMember)
        if (answers.addMember === 'yes') {
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

function renderTeam() {
    fs.writeFile(outputPath, render(teamArray), 'utf8', error => {
        if (error) {
            throw error
        }
    })
}

    

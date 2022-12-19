
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

const employees = []

function newEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'position',
            message: 'What position is this employee?',
            choices: [
                'Manager',
                'Intern',
                'Engineer'
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the employee?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is this employee's email?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is this employee's id?",
        },
    ]).then(({ position, email, id, name }) => {
        switch (position) {
            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is the office number for this manager?'
                    }
                ]).then(({ officeNumber }) => {
                    employees.push(new Manager(
                        name,
                        id,
                        email,
                        officeNumber
                    ))

                    another()
                })
                break;
            case 'Intern':
                //ask about school
                break;
            case 'Engineer':
                //ask about github
                break;
            default:
            //Woops
        }
    })
}

function another() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Create another entry?'
        }
    ]).then(({ more }) => {
        if (more) newEmployee()
        else renderHTMLFile()
    })
}

function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/ `
        <ul>
            ${employees.map(employee => /*html*/`
            <li>
                <div>
                    <h1>${employee.getName()}</h1>
                    <a href="mailto:${employee.getEmail()}">${employee.getEmail()}<a>
                </div>
            </li>
            `)}
        </ul>
    `)
}

//for github link down below:
//<a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}<a>

newEmployee()
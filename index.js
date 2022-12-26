
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
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'school',
                        message: 'What school does the intern attend?'
                    }
                ]).then(({ school }) => {
                    employees.push(new Intern(
                        name,
                        id,
                        email,
                        school
                    ))

                    another()
                })
                break;
            case 'Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'Github',
                        message: "What is the engineer's Github username?"
                    }
                ]).then(({ Github }) => {
                    employees.push(new Engineer(
                        name,
                        id,
                        email,
                        Github
                    ))

                    another()
                })
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

//function to create HTML file using collected user inputs
function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title>Team Profile</title>
        </head>
        <body>
            <div class="jumbotron text-center">
                <h1>My Team Profile</h1>
            </div>
            <div class= "container">
                <div class= "row col-12">
                ${employees.map(employee => /*html*/ {
        switch (employee.getRole()) {
            case "Manager":
                return managerCard(employee);
            case "Engineer":
                return engineerCard(employee);
            case "Intern":
                return internCard(employee);
            }
        }
    )}
                </div>
            </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>            
        </body>
    `)
}



//for github link down below:
//<a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}<a>


//Cards that return HTML content depending on what type of employee they are
function managerCard(manager) {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${manager.name} 💼</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
            <li class="list-group-item">employee ID: ${manager.id}</li>
            <li class="list-group-item">office number: ${manager.officeNumber}</li>
            <li class="list-group-item">email: ${manager.email}</li>
            </ul>
        </div>
      </div>
    `;
}

function engineerCard(engineer) {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${engineer.name} ⚙ </h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
            <li class="list-group-item">employee ID: ${engineer.id}</li>
            <li class="list-group-item">email: ${engineer.email}</li>
            <li class="list-group-item">Github: <a href="https://github.com/${engineer.getGithub()}">${engineer.getGithub()}<a></li>
            </ul>
        </div>
      </div>
    `;
}

function internCard(intern) {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${intern.name} 🎓</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
            <li class="list-group-item">employee ID: ${intern.id}</li>
            <li class="list-group-item">email: ${intern.email}</li>
            <li class="list-group-item">School: ${intern.school}</li>
            </ul>
        </div>
      </div>
    `;
}


newEmployee()
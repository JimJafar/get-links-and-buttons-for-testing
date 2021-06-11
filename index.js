const fetch = require('node-fetch');
const jsdom = require('jsdom');
const inquirer = require('inquirer')

const run = async () => {
    const questions = [
        {
          type: 'input',
          name: 'url',
          message: "What URL do you want to load?"
        }
      ]
      const answers = await inquirer.prompt(questions)
      const url = answers['url']
      const response = await fetch(url);
      const body = await response.text();
      
      // parse the page into a DOM object
      const dom = new jsdom.JSDOM(body);
      
      console.log('\n\n...\n\n')

      // buttons
      const buttons = dom.window.document.querySelectorAll('button')
      console.log(`Buttons found at ${url}:`, '\n- - - - - - - - - - - -\n')
      buttons.forEach(button => console.log(`Label: ${button.label || button.innerHTML}, ID: ${button.id}, class: ${button.className}\n`))
      
      console.log('\n\n...\n\n')
      
      // links
      const links = dom.window.document.querySelectorAll('a')
      console.log(`Links found at ${url}:`, '\n- - - - - - - - - - - -\n')
      links.forEach(link => console.log(`Label: ${link.innerHTML}, ID: ${link.id}, class: ${link.className}\n`))
}

run();

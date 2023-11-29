//A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.Next to each party in the list is a delete button. The user clicks the delete button for one of the parties. That party is then removed from the list. There is also a form that allows the user to enter information about a new party that they want to schedule. After filling out the form and submitting it, the user observes their party added to the list of parties.

const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events'
const state = {
   parties: [],
}

const partiesList = document.querySelector('#partiesList')

//get info from api to state - fetching the parties
async function getParties() {
    try {
        const response = await fetch(API_URL)
        const parties = await response.json()
        console.log(parties.data)
        return parties.data
    } catch (error) {
        console.log(error)
    }
}



//display api info
const renderParties = (parties) => {
    if (!parties || parties.length === 0) {
        partiesList.innerHTML = `<h4>No Party Planned</h4>`
       
    }
    partiesList.innerHTML = ``

    parties.forEach((party) => {
        console.log(party)
        const partyElement = document.createElement('div')
        partyElement.classList.add('individualParty')
        partyElement.innerHTML = `
        <h1>${party.name}</h1>
        <h2>${party.date}</h2>
        <h3>${party.location}</h3>
        <p>${party.description}</p>`
console.log(partyElement)
partiesList.appendChild(partyElement)
    })
    
}

//inital render function - runs functions to get and display apis


const init = async () => {
    const events = await getParties()
    renderParties(events)
}
init()

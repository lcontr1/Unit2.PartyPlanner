//A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.Next to each party in the list is a delete button. The user clicks the delete button for one of the parties. That party is then removed from the list. There is also a form that allows the user to enter information about a new party that they want to schedule. After filling out the form and submitting it, the user observes their party added to the list of parties.

const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events'
const state = {
   parties: [],
}

const partiesList = document.querySelector('#partiesList')
const partyForm = document.querySelector('form')

partyForm.addEventListener('submit', addParty)

//get info from api to state - fetching the parties
async function getParties() {
    try {
        const response = await fetch(API_URL)
        const parties = await response.json()
        console.log(parties.data)
        state.parties = parties.data
    } catch (error) {
        console.log(error)
    }
}

//display api info
const renderParties = (parties) => {
    if (!parties || parties.length === 0) {
        partiesList.innerHTML = `<h4>No Party Planned</h4>`
    }
    const showParties = state.parties.map((party) => {
        const date = party.date.split('T')[0]
        const time = party.date.split('T')[1].split(':')[0]+':'+party.date.split('T')[1].split(':')[0]
        const partyElement = document.createElement('div')
        partyElement.innerHTML = `
        <h2>${party.name}</h2>
        <h3>${date} at ${time}</h3>
        <h3>${party.location}</h3>
        <p>${party.description}</p>`

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete Event'
        partyElement.append(deleteButton)

        deleteButton.addEventListener('click', () => deleteEvent(party.id))

        return partyElement
    })
    partiesList.replaceChildren(...showParties)
    console.log(showParties)
}

async function addParty(e) {
    e.preventDefault()
    const dateControl = `${partyForm.partyDate.value}:00Z`;
    const addedParty = {
                name: partyForm.partyName.value,
                date: dateControl,
                location: partyForm.partyLocation.value,
                description: partyForm.partyDescription.value,
    }
    console.log(addedParty)
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: partyForm.partyName.value,
                date: dateControl,
                location: partyForm.partyLocation.value,
                description: partyForm.partyDescription.value,
        }),  
    }) 
    const newParty = await response.json()
    console.log(newParty)
    if(!response.ok) {
        throw new Error('Failed to create event')
    }
    init();
    } catch(error) {
    console.error(error)
    }
}

async function deleteEvent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`,{
            method: 'DELETE',
        })
        init()
    } catch (error) {
        console.error(error)
    }
}

//inital render function - runs functions to get and display apis
const init = async () => {
    const events = await getParties()
    renderParties(events)
}
init()

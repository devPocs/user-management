//helper functions
function displayGenderValue() {
  var ele = document.getElementsByName("gender")

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      const gender = ele[i].value
      return gender
    }
  }
  return
}

function displayStatusValue() {
  var ele = document.getElementsByName("status")

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      const userStatus = ele[i].value
      return userStatus
    }
  }
  return
}

//1. adding a new user
const newUser = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }
  const resource = await fetch("http://localhost:3000/users/new-user", options)
    .then((response) => {
      if (response.status == 400) {
        alert("Either you have not completed the form or email already exists!")
        location.reload()
      } else if (response.status == 200) {
        alert("User added successfully!")
        location.assign("/")
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

document.querySelector("#add-user").addEventListener("submit", (e) => {
  e.preventDefault()
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const gender = displayGenderValue()
  const status = displayStatusValue()
  const data = { name, email, gender, status }

  newUser(data)
})

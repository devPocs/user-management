const deleteUser = async (data) => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }
  await fetch(
    "http://localhost:3000/users/delete/?" + new URLSearchParams({ id: data }),
    options
  ).then((response) => {
    alert("User deleted successfully!")
    location.reload()
  })
}

const idList = document.querySelectorAll(".table tbody tr td a.delete")
for (var i = 0; i < idList.length; i++) {
  idList[i].addEventListener("click", function () {
    //get the delete button. done..
    //grab the particular id and save it in a variable
    //send it via an ajax request to delete it from the backend
    //reload the page
    var _id = this.dataset.id
    console.log(_id)

    let text
    if (confirm("Do you want to delete?") == true) {
      deleteUser(_id)
    } else {
      text = "You canceled!"
      alert(text)
    }
  })
}

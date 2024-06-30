function showAllStudent() {
    $.ajax({
        type: "GET",
        dataType:"json",
        Headers: { Accept: "application/json" },
        url: "http://localhost:8080/api/students",
        success: function (data) {
            console.log(data);

              let content = "";
              for (let index = 0; index < data.length; index++) {
                content += `<tr>
                  <td>${index}</td>
                  <td><img src="${data.imag}" alt="" width="100" height="100" /></td>
                  <td>${data.firstName}</td>
                  <td>${data.lastName}</td>
                  <td>${data.gender ? "Nam" : "Nu"}</td>
                  <td>${data.phoneNumber}</td>
                  <td>${data.birthday}</td>
                  <td>${data.address}</td>
                  <td>${data.mark}</td>
                  <td>${data.classes.className}</td>
                  <td><button>Edit</button></td>
                  <td><button>View</button></td>
                  <td><button>delete</button></td>
                </tr>`;
              }
              document.getElementById("content").innerHTML = content;
        },
    });
}
showAllStudent();

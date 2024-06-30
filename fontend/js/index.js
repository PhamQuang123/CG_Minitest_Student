function showAllStudent() {
  $.ajax({
    type: "GET",
    dataType: "json",
    headers: { Accept: "application/json" },
    url: "http://localhost:8080/api/students",
    success: function (data) {
      console.log(data);

      let content = "";
      for (let index = 0; index < data.length; index++) {
        content += `<tr>
            <td>${index + 1}</td>
            <td><img src="${
              data[index].imag
            }" alt="" width="100" height="100" /></td>
            <td>${data[index].firstName}</td>
            <td>${data[index].lastName}</td>
            <td>${data[index].gender ? "Nam" : "Nu"}</td>
            <td>${data[index].phoneNumber}</td>
            <td>${data[index].birthday}</td>
            <td>${data[index].address}</td>
            <td>${data[index].mark}</td>
            <td>${data[index].classes.className}</td>
            
            <td>
            <button>View</button>
            </td>

            <td>
            <button
            onclick="editForm(${data[index].studentId})">Edit</button>
            </td>

            <td>
            <button 
            onclick="deleteStudent(${data[index].studentId})">delete</button>
            </td>
          </tr>`;
      }
      document.getElementById("content").innerHTML = content;
    },
  });
}
showAllStudent();

function createStudent(event) {
  event.preventDefault();

  const firstName = $("#firstName");
  const lastName = $("#lastName");
  const image = $("#imagUrl");
  const phone = $("#phoneNumber");
  const birthday = $("#birthday");
  const gender = $("#gender");
  const address = $("#address");
  const mark = $("#mark");
  const classId = $("#classId");
  let studentForm = new FormData();

  studentForm.append("firstname", firstName.value);
  studentForm.append("lastName", lastName.value);
  studentForm.append("imagUrl", image[0].files[0]);
  studentForm.append("phoneNumber", phone.value);
  studentForm.append("birthday", birthday.value);
  studentForm.append("gender", gender.value);
  studentForm.append("address", address.value);
  studentForm.append("mark", mark.value);
  studentForm.append("classId", classId.value);
  // console.log(studentForm.get());

  $.ajax({
    headers: { contentType: "multipart/form-data" },
    type: "POST",
    url: "http://localhost:8080/api/students",
    data: studentForm,
    processData: false,
    success: console.log("success"),
  });
}

function deleteStudent(id) {
  let q = confirm("Bạn có chắc muốn xoá không?");

  if (q) {
    $.ajax({
      headers: { accept: "application/json", contentType: "application/json" },
      url: `http://localhost:8080/api/students/${id}`,

      type: "DELETE",
      dataType: "json",
      success: function (dulieu) {
        console.log(dulieu);
        showAllStudent();
        alert("Xoa thanh cong stdent co id la: " + dulieu.studentId);
      },
    });
  }
}

function editForm(id) {
  $.ajax({
    url: `http://localhost:8080/api/students/${id}`,
    type: "GET",
    // headers:{accept: "application/json", contentType: "application/json"},
    dataType: "json",
    success: function (dl) {
      console.log(dl);
      document.getElementById("editForm").innerHTML = `
      <div>
        <label for="">First Name</label>
        <input type="text" id="firstName" value=${dl.firstName}>
      </div>
      <div>
        <label for="">Last Name</label>
        <input type="text" id="lastName" value=${dl.lastName}>
      </div>
      <div>
        <label for="">Image</label>
        <input type="file" id="imagUrl"/>
        <img src="${dl.imag}" alt="" width="100" height="100" />
      </div>
      <div>
        <label for="">Phone Number</label>
        <input type="text" id="phoneNumber" value=${dl.phoneNumber}>
      </div>
      <div>
        <label for="">birthday</label>
        <input type="text" id="birthday" value=${dl.birthday}>
      </div>
      <div>
        <label for="">Gender</label>
        <input type="radio" id="gender" name="gender" value="true" checked = ${
          dl.gender == true ? "checked" : ""
        }/><label
          for=""
          >Nam</label
        >
        <input type="radio" id="gender" name="gender" value="false" checked = ${
          dl.gender == false ? "checked" : ""
        }/><label
          for=""
          >Nữ</label
        >
      </div>
      <div>
        <label for="">Address</label>
        <input type="text" id="address" value=${dl.address}>
      </div>
      <div>
        <label for="">Mark</label>
        <input type="text" id="mark" value=${dl.mark}>
      </div>
      <div>
        <label for="">Class</label>
        <input type="number" id="classId" value=${dl.classes.className}>
      </div>
      <button  onclick="updateStudent(${dl.studentId})">Update</button>
      <br>
      <br>
      <br>
            `;
      updateStudent(dl.studenntId);
    },
  });
}

function updateStudent(id) {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let image = document.getElementById("imagUrl").files[0];
  let phone = document.getElementById("phoneNumber").value;
  let birthday = document.getElementById("birthday").value;
  let gender = document.getElementById("gender").value;
  let address = document.getElementById("address").value;
  let mark = document.getElementById("mark").value;
  let classId = document.getElementById("classId").value;
  console.log(image);
  let studentForm = {
    firstName: firstName,
    lastName: lastName,
    imagUrl: image,
    phoneNumber: phone,
    birthday: birthday,
    gender: gender,
    address: address,
    mark: mark,
    classId: classId,
  };
  console.log(studentForm);

  $.ajax({
    url: `http://localhost:8080/api/students/${id}`,
    headers: { accept: "application/json", "content-type": "application/json" },
    type: "PUT",
    data: studentForm,
    dataType: "json",
    success: showAllStudent(),
  });
}

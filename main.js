var newsq = "";
var activePatientBtn, theSameBtn, currentPage;

function ClickedItem(patientBtn) {
  putIDToComponents(patientBtn.id);
  $("#searchResultsModal").modal("hide");
}

function putIDToComponents(patientid) {
  console.log("CURRENT PATIENT ID: "+patientid);
  document.getElementById("patientDemographicsComponentContainer").innerHTML =
  '<patient-demographics uuid="'+patientid+'" id="patientDemographicsComponent" />';
  document.getElementById("nextAppointmentsComponentContainer").innerHTML =
  '<next-appointments patientid="'+patientid+'" id="nextAppointmentsComponent" />';
  document.getElementById("patientMedicationsComponentContainer").innerHTML =
  '<patient-medications patientid="'+patientid+'" id="patientMedicationsComponent" />';
  document.getElementById("observationChartsComponentContainer").innerHTML =
  '<observation-charts patientid="'+patientid+'" id="observationChartsComponent" />';
  document.getElementById("lastVisitsComponentContainer").innerHTML =
  '<last-visits patientid="'+patientid+'" id="lastVisitsComponent" />';
  document.getElementById("problemsComponentContainer").innerHTML =
  '<conditions-problems patientid="'+patientid+'" id="problemsComponent" />';
}



function NewSearchQuery() {
  newsq = document.getElementById("searchBarInput").value;
  if (activePatientBtn) {
    activePatientBtn.classList.remove("active");
    activePatientBtn = null;
  }

  $("#searchResultsModal").modal();
  document.getElementById("searchResults").sq = newsq;
  document.getElementById("searchBarInputInModal").value = newsq;
}

function NewSearchQueryInModal() {
  console.log("asd");
  newsq = document.getElementById("searchBarInputInModal").value;
  if (activePatientBtn) {
    activePatientBtn.classList.remove("active");
    activePatientBtn = null;
  }
  document.getElementById("searchResults").sq = newsq;
}

var newsq = "";
var activePatientBtn, theSameBtn, currentPage;

function ClickedItem(patientBtn) {
  putIDToComponents(patientBtn.id);
  $("#searchResultsModal").modal("hide");
  document.getElementById('searchBarInput').value = document.getElementById('searchBarInputInModal').value;
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

$('document').ready(function(){
  $("#searchResultsModal").modal();
    RestoreSavedTabSizes();
    Tabs();
    SetRequiredCookies();
});



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
  newsq = document.getElementById("searchBarInputInModal").value;
  if (activePatientBtn) {
    activePatientBtn.classList.remove("active");
    activePatientBtn = null;
  }
  document.getElementById("searchResults").sq = newsq;
}


function Tabs(){

  //set resize actions for tabs(saving size to cookie)
  new ResizeSensor(jQuery('#activeLists'), function(){
      SaveSizeOfTabs();
  });

  new ResizeSensor(jQuery('#observationCharts'), function(){
      SaveSizeOfTabs();
  });

  new ResizeSensor(jQuery('#medications'), function(){
      SaveSizeOfTabs();
  });

  new ResizeSensor(jQuery('#nextAppointments'), function(){
      SaveSizeOfTabs();
  });
}

function SaveSizeOfTabs(){
  // ACTIVE LISTS
  Cookies.set('activeLists_width', $('#activeLists').width(), { expires: 7 });
  Cookies.set('activeLists_height', $('#activeLists').height(), { expires: 7 });

  // OBSERVATION
  Cookies.set('observationCharts_width', $('#observationCharts').width(), { expires: 7 });
  Cookies.set('observationCharts_height', $('#observationCharts').height(), { expires: 7 });

  // MEDICATIONS
  Cookies.set('medications_width', $('#medications').width(), { expires: 7 });
  Cookies.set('medications_height', $('#medications').height(), { expires: 7 });

  // NEXT APPOINTMENTS
  Cookies.set('nextAppointments_width', $('#nextAppointments').width(), { expires: 7 });
  Cookies.set('nextAppointments_height', $('#nextAppointments').height(), { expires: 7 });
}


function RestoreSavedTabSizes(){
  $("#activeLists").width(Cookies.get('activeLists_width')).height(Cookies.get('activeLists_height'));
  $("#observationCharts").width(Cookies.get('observationCharts_width')).height(Cookies.get('observationCharts_height'));
  $("#medications").width(Cookies.get('medications_width')).height(Cookies.get('medications_height'));
  $("#nextAppointments").width(Cookies.get('nextAppointments_width')).height(Cookies.get('nextAppointments_height'));
}


function ShowSettingsModal(){
  $("#settingsModal").modal();
  SetSettingsInModal();
}

function SetSettingsInModal(){
  if(Cookies.get('allowSavingResizing')){
    var fromStrToBool = (Cookies.get('allowSavingResizing').toLowerCase() === 'true');
    $("#allowResizingCheckbox").prop('checked', fromStrToBool);
  }else{
    $("#allowResizingCheckbox").prop('checked', true);
    Cookies.set('allowSavingResizing', true, { expires: 7 });
  }
}

function SaveSettings(){
  Cookies.set('allowSavingResizing', $('#allowResizingCheckbox').is(":checked"), { expires: 7 });
  $("#settingsModal").modal("hide");
}

function ClearSavedTabsSettings(){
  // ACTIVE LISTS
  Cookies.remove('activeLists_width');
  Cookies.remove('activeLists_height');

  // OBSERVATION
  Cookies.remove('observationCharts_width');
  Cookies.remove('observationCharts_height');

  // MEDICATIONS
  Cookies.remove('medications_width');
  Cookies.remove('medications_height');

  // NEXT APPOINTMENTS
  Cookies.remove('nextAppointments_width');
  Cookies.remove('nextAppointments_height');
}

function SetRequiredCookies (){
  if(!Cookies.get('allowSavingResizing')){
    Cookies.set('allowSavingResizing', true, { expires: 7 });
  }
}

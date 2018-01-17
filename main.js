var tabsDefaultSizes = {
  observationCharts: {
    width: 787,
    height: 400
  },
  activeLists: {
    width: 450,
    height: 715
  },
  medications: {
    width: 360,
    height: 300
  },
  nextAppointments: {
    width: 340,
    height: 300
  }
};

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
    SetRequiredCookies();
    if(Cookies.get('allowSavingLastPhrase').toLowerCase() == 'true'){
      RestoreLastPhrase();
    }
    if(Cookies.get('allowSavingResizing').toLowerCase() == 'true'){
      RestoreSavedTabSizes();
      Tabs();
    }
});



function NewSearchQuery() {
  newsq = document.getElementById("searchBarInput").value;
  document.getElementById("searchBarInputInModal").value = newsq;
  if (activePatientBtn) {
    activePatientBtn.classList.remove("active");
    activePatientBtn = null;
  }

  $("#searchResultsModal").modal();
  document.getElementById("searchResults").sq = newsq;
  SaveLastPhrase(newsq);
}

function NewSearchQueryInModal() {
  newsq = document.getElementById("searchBarInputInModal").value;
  document.getElementById("searchBarInput").value = newsq;
  if (activePatientBtn) {
    activePatientBtn.classList.remove("active");
    activePatientBtn = null;
  }
  document.getElementById("searchResults").sq = newsq;
  SaveLastPhrase(newsq);
}

function SaveLastPhrase(phrase){
  Cookies.set('lastPhrase', phrase, { expires: 7 });
}

function RestoreLastPhrase(){
  if(Cookies.get('lastPhrase')){
    document.getElementById("searchBarInputInModal").value = Cookies.get('lastPhrase');
    document.getElementById("searchBarInput").value = Cookies.get('lastPhrase');
  }
}

function ClearSavedPhrase(){
  Cookies.set('lastPhrase', "", { expires: 7 });
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
  console.log("SAVE");
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
    var fromStrToBool = (Cookies.get('allowSavingResizing').toLowerCase() == 'true');
    $("#allowResizingCheckbox").prop('checked', fromStrToBool);
  }else{
    $("#allowResizingCheckbox").prop('checked', true);
    Cookies.set('allowSavingResizing', true, { expires: 7 });
  }

  if(Cookies.get('allowSavingLastPhrase')){
    var fromStrToBool = (Cookies.get('allowSavingLastPhrase').toLowerCase() == 'true');
    $("#storeLastPhraseCheckbox").prop('checked', fromStrToBool);
  }else{
    $("#storeLastPhraseCheckbox").prop('checked', true);
    Cookies.set('allowSavingLastPhrase', true, { expires: 7 });
  }
}

function SaveSettings(){
  Cookies.set('allowSavingResizing', $('#allowResizingCheckbox').is(":checked"), { expires: 7 });
  Cookies.set('allowSavingLastPhrase', $('#storeLastPhraseCheckbox').is(":checked"), { expires: 7 });
  console.log(Cookies.get('allowSavingResizing'));
  if(!$('#allowResizingCheckbox').is(":checked")){
    ClearSavedTabsSettings();
  }else{
    Tabs();
  }
  $("#settingsModal").modal("hide");
  console.log("SAVED");
}

function ClearSavedTabsSettings(){
    // ACTIVE LISTS
    Cookies.set('activeLists_width',tabsDefaultSizes.activeLists.width, { expires: 7 });
    Cookies.set('activeLists_height', tabsDefaultSizes.activeLists.height, { expires: 7 });

    // OBSERVATION
    Cookies.set('observationCharts_width', tabsDefaultSizes.observationCharts.width, { expires: 7 });
    Cookies.set('observationCharts_height', tabsDefaultSizes.observationCharts.height, { expires: 7 });

    // MEDICATIONS
    Cookies.set('medications_width', tabsDefaultSizes.medications.width, { expires: 7 });
    Cookies.set('medications_height', tabsDefaultSizes.medications.height, { expires: 7 });

    // NEXT APPOINTMENTS
    Cookies.set('nextAppointments_width', tabsDefaultSizes.nextAppointments.width, { expires: 7 });
    Cookies.set('nextAppointments_height', tabsDefaultSizes.nextAppointments.height, { expires: 7 });
    RestoreSavedTabSizes();
    $("#settingsModal").modal("hide");
    console.log("DELETED");
}

function SetRequiredCookies (){
  if(!Cookies.get('allowSavingResizing')){
    Cookies.set('allowSavingResizing', true, { expires: 7 });
  }
  if(!Cookies.get('allowSavingLastPhrase')){
    Cookies.set('allowSavingLastPhrase', true, { expires: 7 });
  }
}

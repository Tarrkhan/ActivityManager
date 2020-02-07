$(document).ready(function() {
  $(".nav a").on("click", function() {
    $(".nav a").removeClass("active");
    $(this).addClass("active");
  });
  $("#planTab").click(function() {
   $("#divCalander").hide();
    $("#divAllTasks").hide();
   $("#divTaskForm").show();
   $("#divShowData").show();
  });
  $("#allTasksTab").click(function() {
    $("#divTaskForm").hide();
    $("#divShowData").hide();
    $("#divCalander").hide();
    $("#divAllTasks").show();
  });
  $("#calanderTab").click(function() {
    $("#divTaskForm").hide();
    $("#divShowData").hide();
    $("#divAllTasks").hide();
    $("#divCalander").show();
  });
});

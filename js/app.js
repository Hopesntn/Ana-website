function getId(id){
  return document.getElementById(id);
}


let dateElement = document.getElementById("date");

const CurrentDate = new Date();
const dateTimeformatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

const formattedDate = dateTimeformatter.format(CurrentDate);
dateElement.textContent = formattedDate;


